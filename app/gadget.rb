require 'roda'
require 'tilt'
require 'concode'
require 'securerandom'
require 'roda/session_middleware'

require_relative 'lti'
require_relative 'o365'
require_relative 'canvas'
require_relative 'samesite'
require_relative 'session_debugger'

class Gadget < Roda
  plugin :halt
  plugin :pass
  plugin :common_logger
  plugin :exception_page
  plugin :status_handler
  plugin :param_matchers
  plugin :header_matchers
  plugin :slash_path_empty
  plugin :render, engine: 'slim'

  # don't cache non-asset pages ever
  plugin :default_headers, 
    'Cache-Control' => 'no-cache, no-store, must-revalidate'

  plugin :error_handler do |e|
    # print nice exceptions if we're in development mode
    next exception_page(e) if ENV['RACK_ENV'] == 'development'

    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: 'Something went wrong on the server. This is not your fault, but you should let your instructor know anyway.'
    }
  end

  use RodaSessionMiddleware, 
    secret: ENV['SESSION_SECRET'], 
    cookie_options: { same_site: 'None' }

  # TODO: undo this! 
  # use LTI
  use O365
  use SameSite
  use SessionDebugger if ENV['RACK_ENV'] == 'development'

  # r.halt(401) will render this login page
  status_handler 401 do    
    render :card, locals: {
      title: 'Gadget Login',
      text: "<script>setTimeout(()=>window.location.href='#{env['PATH_INFO']}',5000)</script>Click the button below to log into your westpoint.edu. The gadget will automatically load once you've logged in.",
      button: { 'Log in with Office 365' => 'javascript:window.open("/o365/login")' }
    }
  end

  # r.halt(404) will render this not found page
  status_handler 404 do
    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: "Whoops! There's nothing here. My fault? Yours? Who can say?!"
    }
  end
  
  # Roda bug?
  # I really wanted to use the named_templates for this, 
  # but it kept trying to render locals as html tags producing
  # <gadget>Locked</gadget> and <this>gadget is only ...
  gadget_locked = Tilt.new('views/card.slim').render(nil,
    title: 'Gadget Locked', 
    text: 'This gadget is only available during a quiz. There is no quiz in progress or the requested gadget is not included in your quiz.'
  )

  route do |r|
    r.get 'favicon.ico' do 
      r.redirect '/images/gadget-favicon.ico', 301
    end

    # new gadgets can only be created with LTI requests from Canvas
    # LTI middleware authenticates the request before passing it here
    r.on 'lti/new' do
      r.post do
        course_id = r.POST['custom_canvas_course_id']
        ends = session.to_hash.dig('courses',course_id,'ends')
        role = session.to_hash.dig('courses', course_id, 'role')

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
        if role == 'teacher'
          render :choose
        
        # students can only make student gadgets, so skip the chooser
        else
          r.redirect '/lti/new/student'
        end
      end

      # instantiate the gadget return the gadget path
      r.get ['quiz', 'personal', 'teacher', 'student'] do |type|
        token = session.delete('token')

        if token.nil? or DateTime.parse(token['time']) < 1.minute.ago
          r.halt 401, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: "LTI authorization is missing, invalid, or expired."
          })
        end

        course_id = token['course_id']
        course_api = Canvas.api.course(course_id)
        role = session.to_hash.dig('courses', course_id, 'role')

        if role == 'teacher' and type == 'student'
          r.halt 403, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: "Teachers cannot create student gadgets."
          })
        end

        if role == 'student' and type != 'student'
          r.halt 403, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: "Students cannot create #{type} gadgets."
          })
        end

        # much easier to do this recursively
        unique_gadget_name = proc do
          root_id = course_api.mkdir 'gadgets'
          generator = Concode::Generator.new words: 2, glue: '-'
          gadget_name = generator.generate SecureRandom.uuid
      
          # make sure this gadget name isn't in use in anywhere else
          files = course_api.files.get(params: { 
            search_term: "#{gadget_name}.gadget"
          })
      
          files.empty? ? gadget_name : unique_gadget_name.call()
        end

        gadget_name = unique_gadget_name.call

        path = case type
        when 'teacher'
          path = "gadgets/teacher/#{gadget_name}.gadget"
        when 'student'
          path = "gadgets/student/#{gadget_name}-#{session['username']}.gadget"
        when 'personal', 'quiz'
          path = "gadgets/personal/#{gadget_name}/#{gadget_name}.gadget"
        end

        # instantiate the gadget by copying the respective template 
        course_api.copy("gadgets/templates/#{type}.gadget", path)

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
        
        # the chooser redirects to the new gadget itself, but 
        # students don't use the chooser since they don't choose
        if type == 'student'
          r.redirect return_url.to_s
        else
          return_url.to_s
        end
      end
    end

    # the course id isn't included in a gadget URL since we don't want 
    # to have to update every gadget URL every time we copy a course
    # downside: we now have to figure out what course the gadget is in
    r.is String, String do |gadget_type, gadget_name|

      # we can get the course id from the Referer header 
      r.on header: 'Referer' do |referer|
        uri = URI(referer) rescue nil
        
        if uri and uri.host == 'canvas.instructure.com'          
          regex = /\/courses\/(?<course_id>\d+)(\/quizzes\/(?<quiz_id>\d+)(\/(?<endpoint>\w+))?)?/io
                  
          if match = uri.path.match(regex)
            course_id = match[:course_id]
            
            # the quiz api mirrors canvas as closely as possible
            if quiz_id = match[:quiz_id]
              if endpoint = match[:endpoint]
                path = "/#{course_id}/quiz/#{gadget_name}/#{quiz_id}/#{endpoint}"
              else
                path = "/#{course_id}/quiz/#{gadget_name}/#{quiz_id}"
              end

              redirect = URI.parse(path)
              redirect.query = uri.query
              
              r.redirect redirect.to_s
            else 
              r.redirect "/#{course_id}/#{gadget_type}/#{gadget_name}"
            end
          end
        end

        r.pass
      end

      r.halt 401 if session['email'].nil?

      if session['courses'].nil? or session['courses'].empty?
        render :card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>#{session['email']}</b> isn't enrolled in any gadget-enabled courses. If you aren't logged in as the right user, then <a href='/o365/logout'>log out and back in</a>."
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
      r.halt 401 if session['email'].nil?
      course_api = Canvas.api.course(course_id)

      # TODO: this may be a bug in Roda: sub-hashes in the session hash (e.g. 
      # courses) can't have integer keys. They are getting converted to strings
      course_id = course_id.to_s
      role = session.to_hash.dig('courses', course_id, 'role')

      if role.nil?
        r.halt 403, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>#{session['email']}</b> is not enrolled in a course with an ID of <b>#{course_id}</b> or that course doesn't exist. If the course was created <i>after</i> you logged into the gadget server, then you might just need to <a target='close' href='/o365/logout'>log out and back in</a> to see it."
        })
      end
      
      ends = session.to_hash.dig('courses',course_id,'ends')
      course_ended = ends && DateTime.parse(ends) < DateTime.now

      # these are the public gadgets anyone in the class can see
      r.on ['student', 'teacher'], String do |type, name|
        path = "gadgets/#{type}/#{name}.gadget"      
        r.halt 404 if course_api.file_id(path).nil?

        if type == 'teacher'
          can_save = role == 'teacher' && !course_ended
        else
          can_edit = name.split('-').last == session['id']
        end
        
        r.get do
          render :gadget, locals: {
            save: can_save,
            admin: can_save,
            url: course_api.download_url(path) 
          }
        end

        r.post do
          unless can_save
            r.halt 403, "this gadget is locked for editing" 
          end

          response = course_api.upload(path, r.body)
          r.halt response.status, response.reason
        end
      end

      r.on 'personal', String do |name|
        gadget_path = "gadgets/personal/#{name}/#{session['username']}.gadget"
        template_path = "gadgets/personal/#{name}/#{name}.gadget"
        r.halt 404 if course_api.file_id(template_path).nil?

        r.get do
          if course_api.file_id(gadget_path)
            url = course_api.download_url(gadget_path)
          else
            url = course_api.download_url(template_path)
          end

          render :gadget, locals: {
            url: url,
            admin: true,
            save: !course_ended
          }
        end

        r.post do 
          r.halt 403, "course ended" if course_ended
          response = course_api.upload(gadget_path, r.body)
          r.halt response.status, response.reason
        end
      end

      r.on 'quiz', String do |name|
        template_path = "gadgets/quiz/#{name}/#{name}.gadget"
        r.halt 404 if course_api.file_id(template_path).nil?

        r.is do
          r.redirect File.join(env['PATH_INFO'], 'edit')
        end

        # interacting with the quiz question template
        r.is 'edit' do |name|
          r.halt(403, gadget_locked) unless role == 'teacher'
          
          r.get do
            render :gadget, locals: { 
              save: true, 
              admin: true, 
              url: course_api.download_url(template_path)
            }
          end

          # updating the quiz question template
          r.post do 
            response = course_api.upload(template_path, r.body)
            r.halt response.status, response.reason
          end
        end
        
        # interacting with a particular quiz
        r.on Integer do |quiz_id|
          # make sure this quiz actually exists ...   
          begin
            quiz_api = course_api.quiz(quiz_id)
            quiz_info = quiz_api.get
          rescue Canvas::NotFound
            r.halt 404
          end

          r.is do 
            r.redirect File.join(env['PATH_INFO'], 'history')
          end

          # unlike canvas, you edit gadgets outside the context
          # of a particular quiz. This means that you could embed 
          # the same gadget in multiple quizzes, but when you edit
          # one - you edit both! 
          r.on 'edit' do 
            r.redirect "/#{course_id}/quiz/#{
              name}/edit"
          end

          # teacher is previewing a quiz  
          r.on param: 'preview' do 
            r.is 'take' do 
              r.redirect 'preview'
            end
            
            # viewing results
            r.get do
              render :gadget, locals: { 
                save: false,
                admin: false,
                readonly: true,
                url: course_api.download_url(
                  "gadgets/quiz/#{name}/#{session['username']}/preview.gadget"
                )
              }
            end
          end

          r.on 'preview' do 
            r.halt 403 unless role == 'teacher'

            r.get do
              render :gadget, locals: { 
                save: true,
                admin: false,
                url: course_api.download_url(template_path)
              }
            end

            r.post do 
              path = "gadgets/quiz/#{name}/#{session['username']}/preview.gadget"
              response = course_api.upload(path, r.body)
              r.halt response.status, response.reason
            end
          end

          # student is taking a quiz
          r.is 'take' do
            submission = quiz_api.quiz_submission(session['id'])
          
            # make sure this gadget is included in this quiz
            unless quiz_api.quiz_gadgets.include? name
              r.halt 403, gadget_locked
            end

            # make sure that they are currently taking the quiz
            if submission.nil? or submission['workflow_state'] != 'untaken'
              r.halt 403, gadget_locked 
            end
            
            attempt = submission['attempt']
            
            # encode the quiz_id in the filename in case this gadget is included in 
            # multiple quizzes - remember that changes to one will change both!
            # also encode the canvas id so we can search for quiz attempts easily
            filename = "#{session['id']}-#{quiz_id}-#{attempt}.gadget"
            submission_path = "gadgets/quiz/#{name}/#{session['username']}/#{filename}"

            if course_api.file_id(submission_path).nil?
              url = course_api.download_url(template_path)
            else
              url = course_api.download_url(submission_path)
            end

            r.get do
              render :gadget, locals: { 
                url: url, 
                save: true,
                admin: false
              }
            end

            r.post do 
              response = course_api.upload(submission_path, r.body)
              r.halt response.status, response.reason
            end
          end

          # teaching viewing a submission - user_id can be a user_id or username
          r.get 'history', params: [:user_id, :version] do |user_id, version|
            r.halt 403 unless role == 'teacher'
            
            # a canvas user_id
            if user_id[/^\d+$/]
              filename = "#{user_id}-#{quiz_id}-#{version}.gadget"
              files = course_api.files.get(params: { search_term: filename })
            
            # a username
            else
              folder = course_api.folder_kd "gadgets/quiz/#{name}/#{username}"
              files = api.folder(folder).files.get params: { 
                search_term: "#{quiz_id}-#{version}.gadget"
              }
            end

            file = files.first
            r.halt 404 if file.nil?

            render :gadget, locals: {  
              save: false,
              admin: true,
              url: course_api.download_url(file['id'])
            }
          end

          # student is viewing their submission
          r.get 'history' do
            # make sure they actually have a submission for this quiz
            submission = quiz_api.quiz_submission(session['id'])
            r.halt 404 if submission.nil?

            # make sure they're allowed to view results 
            r.halt 403, gadget_locked if quiz_info['hide_results']

            if quiz_info['one_time_results']
              # they can view their latest attempt if they just finished
              attempt = submission['attempt']
              finished = DateTime.parse submission['fininshed_at']
              r.halt 403, gadget_locked if finished > 5.minutes.ago
            else
              attempt = r.GET['attempt'] || submission['attempt']
            end

            filename = "#{session['id']}-#{quiz_id}-#{attempt}.gadget"
            submission_path = "gadgets/quiz/#{name}/#{session['username']}/#{filename}"

            url = course_api.download_url(submission_path)
            r.halt 404 if url.nil?

            render :gadget, locals: { 
              url: url,
              save: false,
              admin: false,
              readonly: true
            }
          end
        end
      end
    end    
  end
end
