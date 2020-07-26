require 'roda'
require 'seconds'
require 'concurrent'
require 'message_bus'
require 'securerandom'

MessageBus.configure(:backend=>:memory)

class Chat < Roda
  use MessageBus::Rack::Middleware

  plugin :json
  plugin :halt
  plugin :status_handler
  plugin :slash_path_empty
  plugin :render, engine: 'slim', cache: false

  # these are the insecure cookies for cadets to hack
  plugin :cookies, domain: 'chat.it105.army', path: '/'

  rooms = Concurrent::Map.new
  
  # cleans up inactive rooms
  Concurrent::TimerTask.new do 
    rooms.each do |name,map|
      rooms.delete name if map.fetch(:active, Time.now) < 1.hour.ago
    end
  end.execute
  
  status_handler(401) do
    render :card, locals: {
      title: 'Unauthorized', 
      text: "This site can only be accessed by authorized Canvas users. Please use the link in your course page."
    }
  end

  status_handler(404) do
    render :card, locals: {
      title: 'No Chat Room', 
      text: "The instructor has not instantiated a chat room for this section."
    }
  end

  route do |r|
    r.post 'lti' do
      lti_roles = r.POST['roles']
      lti_name = r.POST['lis_person_name_full']
      lti_sections = r.POST['custom_sections']

      unless lti_name and lti_roles and lti_sections
        r.halt 401, "LTI message is missing a required parameter" 
      end
      
      roles = lti_roles.split(',')
      sections = lti_sections.split(',')
      name = lti_name.split(/[\s,\.]/).map(&:capitalize).join('.')

      # create or reset the instructor's room 
      if roles.include? 'Instructor'
        rooms.compute_if_absent name do 
          room = Concurrent::Map.new
          room.put_if_absent :active, Time.now
          room.put_if_absent :sections, sections
          room.put_if_absent :messages, Concurrent::Array.new
          room.put_if_absent :users, Concurrent::Array.new([name])
          room
        end

        rooms[name][:messages].clear
        response.set_cookie 'user', value: 0
        r.redirect name
      else
        # students should only have one section ...
        rooms.each do |instructor,info| 
          if info[:sections].include? sections.first
            unless user = info[:users].index(name)
              user = info[:users].size
              info[:users].append(name)
            end

            response.set_cookie 'user', value: user, expires: 30.minutes.from_now
            r.redirect instructor
          end
        end
      end

      r.halt 404
    end

    r.get 'favicon.ico' do
      r.redirect 'images/chat-favicon.ico'
    end

    r.get 'config.xml' do
      response['Content-Type'] = 'text/xml'
      render :config, engine: 'erb', locals: { 
        title: 'Insecure Chat',
        host: env['HTTP_HOST'],
        open_in_new_window: true,
        description: 'An insecure chat room for hacking', 
        menu: { title: 'Insecure Chat', path: 'lti' },
        custom: { 
          sections: '$Canvas.course.sectionIds'
        }
      }
    end

    r.halt 401 unless r.cookies['user']

    r.is do 
      response['Cache-Control'] = 'must-revalidate, no-store, no-cache, private'
      view :chat, locals: { rooms: rooms.keys }
    end
    
    r.on rooms.keys do |room|

      # get the username
      users = rooms[room][:users]
      index = r.cookies['user'].to_i
      r.halt 401 if index < 0 or index >= users.size

      @user = users[index]

      r.get do 
        view :room, locals: { owner: index.zero? }
      end
      
      r.post 'chat' do
        r.params[:user] = @user
        MessageBus.publish "#{room}/chat", r.params
        rooms[room][:messages] << r.params
        'done'
      end

      r.post 'enter' do
        MessageBus.publish "#{room}/enter", user: @user
        { users: rooms[room][:users], messages: rooms[room][:messages]  }
      end
    end
  end
end
