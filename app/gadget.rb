require 'roda'
require 'roda/session_middleware'

class Gadget < Roda
  plugin :halt
  plugin :pass
  plugin :caching
  plugin :status_handler
  plugin :param_matchers
  plugin :header_matchers
  plugin :slash_path_empty
  plugin :render, engine: 'slim'
  plugin :default_headers, 
    'Cache-Control' => 'no-cache, no-store, must-revalidate'

  use RodaSessionMiddleware, 
    secret: ENV['SESSION_SECRET'], 
    cookie_options: { same_site: 'None' }

  # authentication middlewares
  use LTI
  use O365

  status_handler(404) do    
    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: "Whoops! There's nothing here. My fault? Yours? Who can say?!"
    }
  end

  status_handler(500) do
    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: "Something bad happened on the server. This is not your fault, but you should definitely let someone know anyway."
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
    r.post 'lti/new' do
      course_id = r.POST['custom_canvas_course_id']
      "Creating a new gadget for course #{course_id}."
    end

    # the course id isn't included in a gadget URL since we don't want 
    # to have to update every gadget URL every time we copy a course
    # downside: we now have to figure out what course the gadget is in
    r.is String, String do |type, name|
      
      # you can provide the course id explicitly as a GET parameter
      r.on param: 'course' do |course_id|
        r.redirect "/#{course_id}/#{type}/#{name}"
      end

      # we can get the course id from the Referer header 
      r.on header: 'Referer' do |referer|
        uri = URI(referer) rescue nil

        if uri and uri.host == 'canvas.instructure.com'          
          match = uri.path.match(/\/courses\/(?<course_id>\d+)\/?/io)
          
          if match and match[:course_id]
            r.redirect "/#{match[:course_id]}/#{type}/#{name}"
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
          text: "<b>#{session['email']}</b> isn't enrolled in any gadget-enabled courses. If you are logged in as the wrong user, "
        }

      # as a last ditch effort, if the user is only enrolled in one
      # gadget-enabled course, we'll assume the gadget is in that course
      elsif session['courses'].one?
        course_id = session['courses'].keys.first
        r.redirect "#{course_id}/#{type}/#{name}"
      
      # whelp, that didn't work. Let the user know the situation ...
      else
        render :card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "You are enrolled in multiple courses that support gadgets. Good for you! Normally, the gadget server can infer which course a gadget request if for. Unfortunately, it wasn't able to this time. Try passing the course ID in a <b>course</b> GET parameter. That usually works."
        }
      end
    end

    r.on Integer do |course_id|
      course_id = course_id.to_s

      if session['email'].nil?
        r.redirect "/o365/login?return=#{env['PATH_INFO']}"
      end

      unless course = session.to_hash.dig('courses', course_id)
        r.halt 403, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "You've requested a gadget from a course you are not enrolled in. If the course was created <i>after</i> you logged in, you might just need to <a href='/logout'>logout</a> and back in to see it."
        })
      end

      r.get String, String do |type, name|
        "#{course_id}/#{type}/#{name}"
      end

      r.post String, String do |type, name|
        # no editing after course conclusion date
        "#{course_id}/#{type}/#{name}"
      end      
    end    
  end
end
