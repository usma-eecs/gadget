require 'roda'
require 'roda/session_middleware'

require_relative 'lti'
# require_relative 'o365'
require_relative 'templates'

class Gadget < Roda
  plugin :halt
  plugin :pass
  plugin :caching
  plugin :streaming
  plugin :common_logger
  plugin :status_handler
  plugin :param_matchers
  plugin :header_matchers
  plugin :slash_path_empty
  plugin :render, engine: 'slim'

  # don't cache non-asset pages ever
  plugin :default_headers, 
    'Cache-Control' => 'no-cache, no-store, must-revalidate'

  # print nice exceptions if we're in development mode
  plugin :exception_page if ENV['RACK_ENV'] == 'development'

  use RodaSessionMiddleware, 
    secret: ENV['SESSION_SECRET'], 
    cookie_options: { same_site: 'None' }

  # authentication middlewares
  use LTI
  # use O365

  status_handler(404) do    
    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: "Whoops! There's nothing here. My fault? Yours? Who can say?!"
    }
  end

  route do |r|
    # TODO: remove this
    r.is('session') { session.to_hash.inspect }

    r.get 'favicon.ico' do 
      r.redirect '/images/gadget-favicon.ico'
    end

    # new gadgets can only be created with LTI requests from Canvas
    # LTI middleware authenticates the request before passing it here
    r.on 'lti/new' do
      r.post do
        course_id = r.POST['custom_canvas_course_id']
        ends = session.to_hash.dig('courses',course_id,'ends')
        
        if ends and DateTime.parse(ends) < DateTime.now
          r.halt 403, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: "Sorry, #{session['courses'][course_id]['name']} has ended. You can't create new gadgets."
          })
        end

        session['token'] = { 
          time: DateTime.now,
          course_id: course_id, 
          return: r.POST['ext_content_return_url']
        }

        # ask them which type of gadget they would like to create
        render :choose, cache: false
      end

      # instantiate the gadget return the gadget path
      r.get ['assessment', 'personal', 'teacher', 'student'] do |type|
        token = session.delete('token')
        course_id = token['course_id']

        if token.nil? or DateTime.parse(token['time']) < 1.minute.ago
          r.halt 403, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: "LTI authorization is missing, invalid, or expired."
          })
        end

        gadget_name = Templates.generate_unique_gadget_name course_id
        role = session.to_hash.dig('courses', course_id, 'role')

        # teacher or student types
        if (type == 'teacher' or type == 'student')
          if role != type
            r.halt 403, render(:card, locals: {
              title: '¯\_(ツ)_/¯', 
              text: "#{role.capitalize} cannot create #{type} gadgets."
            })
          end

          gadget_path = "gadgets/#{type}/#{gadget_name}.gadget"
          
        # assessment or personal types
        else 
          if role != 'teacher'
            r.halt 403, render(:card, locals: {
              title: '¯\_(ツ)_/¯', 
              text: "Only teachers can create #{type} gadgets."
            })
          end

          gadget_path = "gadgets/#{type}/#{gadget_name}/#{gadget_name}.gadget"
        end

        # personal gadgets don't actually have a template instance, just a folder
        # they're templates are instantiated when a user requests it the first time
        if type == 'personal'
          API.mkdir File.dirname(gadget_path)
        else
          API.upload course_id, gadget_path, Templates.get_template_io(type)
        end

        # the gadget now exists, send them to the redirect URL 
        gadget_url = URI::HTTPS.build(
          host: env['HTTP_HOST'],
          path: "/#{type}/#{gadget_name}"
        )

        return_url = URI(token['return'])

        return_url.query = Rack::Utils.build_query(
          height: 350, 
          width: '100%',
          url: gadget_url,
          return_type: 'iframe'
        )

        return_url.to_s
      end
    end

    # the course id isn't included in a gadget URL since we don't want 
    # to have to update every gadget URL every time we copy a course
    # downside: we now have to figure out what course the gadget is in
    r.is String, String do |gadget_type, gadget_name|

      # you can provide the course id explicitly as a GET parameter
      r.on param: 'course' do |course_id|
        r.redirect "/#{course_id}/#{gadget_type}/#{gadget_name}"
      end

      # we can get the course id from the Referer header 
      r.on header: 'Referer' do |referer|
        uri = URI(referer) rescue nil

        if uri and uri.host == 'canvas.instructure.com'          
          match = uri.path.match(/\/courses\/(?<course_id>\d+)\/?/io)
          
          if match and match[:course_id]
            r.redirect "/#{match[:course_id]}/#{gadget_type}/#{gadget_name}"
          end
        end

        r.pass
      end

      if session['email'].nil?
        r.redirect "/o365/login?return=#{env['PATH_INFO']}"
      end

      if session['courses'].nil? or session['courses'].empty?
        render :card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>#{session['email']}</b> isn't enrolled in any gadget-enabled courses. If you aren't logged in as the right user, then <a href='/logout'>log out and back in</a>."
        }

      # as a last ditch effort, if the user is only enrolled in one
      # gadget-enabled course, we'll assume the gadget is in that course
      elsif session['courses'].one?
        course_id = session['courses'].keys.first
        r.redirect "#{course_id}/#{gadget_type}/#{gadget_name}"
      
      # whelp, that didn't work. Let the user know the situation ...
      else
        course_links = session['courses'].map do |course_id, course_info|
          gadget_path = "/#{course_id}/#{gadget_type}/#{gadget_name}"
          course_link = "<a href='#{gadget_path}'>#{course_info['name']}</a>"
          "<br>&nbsp;&nbsp;&nbsp;&nbsp;&bull; #{course_link}"
        end.join
        
        r.halt 404, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>#{session['email']}</b> is enrolled in multiple courses that support gadgets. How great! Click the course that you would like to request the gadget from: <br> #{course_links}"
        })
      end
    end

    r.on Integer do |course_id|
      # this may be a bug in Roda: sub-hashes in the session hash (e.g. courses)
      # can't have integer keys. They are getting converted to strings
      course_id = course_id.to_s

      if session['email'].nil?
        r.redirect "/o365/login?return=#{env['PATH_INFO']}"
      end

      if session.to_hash.dig('courses', course_id).nil?
        r.halt 403, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>#{session['email']}</b> is not enrolled in a course with an ID of <b>#{course_id}</b> or that course doesn't exist. If the course was created <i>after</i> you logged into the gadget server, then you might just need to <a href='/logout'>log out and back in</a> to see it."
        })
      end

      # instead of proxying downloads/uploads, I could give the JS client the url and
      # token and they could upload/download directly (for an hour, at least)
      r.on ['assessment', 'personal', 'teacher', 'student'], String do |type, name|
        r.get do
          if type == 'teacher' or type == 'student'
            path = "gadgets/#{type}/#{name}.gadget"
          end

          if API.file_id(course_id, path).nil?
            r.halt 404 
          else
            stream do |out| 
              API.download(course_id, path).each {|chunk| out << chunk}
            end
          end
        end

        r.post do 
          ends = session.to_hash.dig('courses',course_id,'ends')
        
          # don't accept edits for gadgets in concluded courses
          # TODO: don't even show the 'Save' button
          if ends and DateTime.parse(ends) < DateTime.now
            r.halt 403, "course ended - gadgets locked"
          end

          # r.params['file'][:tempfile]
          # make sure to lock the file after creating it!
          "#{course_id}/#{type}/#{name}"
        end
      end
    end    
  end
end
