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
      text: 'Something went wrong on the server. This is not your fault. You should let your instructor know.'
    }
  end

  use RodaSessionMiddleware, 
    secret: ENV['SESSION_SECRET'], 
    cookie_options: { same_site: 'None' }

  use LTI
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
      r.get ['quiz', 'personal', 'teacher', 'student'] do |type|
        token = session.delete('token')
        course_id = token['course_id']

        if token.nil? or DateTime.parse(token['time']) < 1.minute.ago
          r.halt 401, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: "LTI authorization is missing, invalid, or expired."
          })
        end

        # much easier to do this recursively
        unique_gadget_name = proc do
          root_id = Canvas.mkdir course_id, 'gadgets'
          generator = Concode::Generator.new words: 2, glue: '-'
          gadget_name = generator.generate SecureRandom.uuid
      
          files = Canvas.get("/api/v1/folders/#{root_id}/files", 
            search_term: gadget_name
          )
      
          files.empty? ? gadget_name : unique_gadget_name.call()
        end

        gadget_name = unique_gadget_name.call
        role = session.to_hash.dig('courses', course_id, 'role')

        if (type == 'teacher' or type == 'student')
          if role != type
            r.halt 403, render(:card, locals: {
              title: '¯\_(ツ)_/¯', 
              text: "#{role.capitalize} cannot create #{type} gadgets."
            })
          end

          path = "gadgets/#{type}/#{gadget_name}.gadget"
          
        # everyone get their own copy of personal gadgets and question responses
        # so these gadgets need their own folder
        else 
          # quiz and personal gadget creation require the teacher role
          if role != 'teacher'
            r.halt 403, render(:card, locals: {
              title: '¯\_(ツ)_/¯', 
              text: "Only teachers can instantiate new #{type} gadgets."
            })
          end

          path = "gadgets/#{type}/#{gadget_name}/#{gadget_name}.gadget"
        end

        # instantiate the gadget by copying the respective template 
        Canvas.copy_file course_id, "gadgets/templates/#{type}.gadget", path

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
          regex = /\/courses\/(?<course_id>\d+)(\/quizzes\/(?<quiz_id>\d+)\/take)?/io
          
          if match = uri.path.match(regex)
            course_id = match[:course_id]

            if quiz_id = match[:quiz_id]
              r.redirect "/#{course_id}/#{gadget_type}/#{gadget_name}/#{quiz_id}"
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
      r.on ['teacher', 'student'], String do |type, name|
        path = "gadgets/#{type}/#{name}.gadget"      
        r.halt 404 if Canvas.file_id(course_id, path).nil?

        can_save = role == type && !course_ended
        
        r.get do
          render :gadget, locals: {
            save: can_save,
            admin: role == 'teacher',
            url: Canvas.download_url(course_id, path) 
          }
        end

        r.post do
          r.halt 403, "this gadget is locked for editing" unless can_save
          response = Canvas.upload course_id, path, r.body
          r.halt response.status, response.reason
        end
      end

      r.on 'personal', String do |name|
        gadget_path = "gadgets/personal/#{name}/#{session['email']}"
        template_path = "gadgets/personal/#{name}/#{name}.gadget"
        r.halt 404 if Canvas.file_id(course_id, template_path).nil?
        
        if Canvas.file_id(course_id, gadget_path).nil?
          Canvas.copy_file course_id, template_path, gadget_path
        end

        r.get do
          render :gadget, locals: {
            admin: true,
            save: !course_ended,
            url: Canvas.download_url(course_id, gadget_path)
          }
        end

        r.post do 
          r.halt 403, "course ended" if course_ended
          response = Canvas.upload course_id, gadget_path, r.body
          r.halt response.status, response.reason
        end
      end

      r.on 'quiz', String do |name|
        template_path = "gadgets/quiz/#{name}/#{name}.gadget"
        r.halt 404 if Canvas.file_id(course_id, template_path).nil?
        
        r.is do
          r.halt(403, gadget_locked) unless role == 'teacher'

          # viewing the quiz question template
          r.get do
            render :gadget, locals: { 
              save: true, 
              admin: true, 
              url: Canvas.download_url(course_id, template_path)
            }
          end

          # updating the quiz question template
          r.post do 
            response = Canvas.upload course_id, template_path, r.body
            r.halt response.status, response.reason
          end
        end

        # they are taking quiz quiz_id
        r.on Integer do |quiz_id|
          quiz_api = course_api.quiz(quiz_id)
          submission = quiz_api.quiz_submission(session['id'])
        
          # make sure they taking the quiz now
          if submission.nil? or submission['workflow_state'] != 'untaken'
            r.halt 403, gadget_locked 
          end
          
          # make sure this gadget is included in this quiz
          unless quiz_api.quiz_gadgets.include? name
            r.halt 403, gadget_locked 
          end

          attempt = submission['attempt']
          submission_path = "gadgets/quiz/#{name}/#{session['email']}/attempt-#{attempt}.gadget"
          
          if Canvas.file_id(course_id, submission_path).nil?
            url = Canvas.download_url(course_id, template_path)
          else
            url = Canvas.download_url(course_id, submission_path)
          end

          r.get do
            render :gadget, locals: { url: url, save: true, admin: false }
          end

          r.post do 
            response = Canvas.upload course_id, submission_path, r.body
            r.halt response.status, response.reason
          end
        end
      end
    end    
  end
end
