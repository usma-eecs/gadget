require 'roda'
require 'ims/lti'
require 'seconds'
require 'concurrent'
require_relative 'canvas'

class LTI < Roda
  plugin :halt
  plugin :middleware
  plugin :render, engine: 'slim'

  # track oauth nonce to prevent replay attacks
  nonces = Concurrent::Map.new

  Concurrent::TimerTask.new(execution_interval: 1.minutes) do 
    nonces.each_pair do |nonce,time|
      nonces.delete nonce if time < 2.minutes.ago
    end
  end.execute

  route do |r|
    r.on 'lti', method: 'post' do
      unless r.POST['lti_message_type'] == 'basic-lti-launch-request'
        r.halt 400, 'Bad lti_message_type.' 
      end

      launch_url = URI::HTTPS.build(host: env['HTTP_HOST'], path: r.path)
      
      launch_auth = IMS::LTI::Services::MessageAuthenticator.new(
        launch_url, r.POST, ENV['LTI_SECRET']
      )

      unless launch_auth.valid_signature?
        r.halt 401, "Invalid LTI signature"
      end

      if Time.now.getutc.to_i - r.POST['oauth_timestamp'].to_i > 1.minute
        r.halt 401, "LTI signature is too old to verify."
      end

      if nonces[r.POST['oauth_nonce']]
        r.halt 401, "Cannot reuse nonce in LTI signature."
      else 
        nonces.put_if_absent r.POST['oauth_nonce'], Time.now
      end

      email = r.POST['lis_person_contact_email_primary']

      # their primary email address *must* be a westpoint.edu or we 
      # can't correlate between O365 logins and LTI logins      
      if email.nil? or not email.ends_with? '@westpoint.edu'
        # roda bug? - sending an empty session hash has no effect
        session.replace(logout: true)

        r.halt 401, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "Your primary email address in Canvas must be a <b>westpoint.edu</b> address to create gadgets. To fix this, head to <a href='https://canvas.instructure.com/profile/settings'/>https://canvas.instructure.com/profile/settings</a> and update your primary email address."
        })
      end

      # we don't want to re-authenticate the user every time they 
      # create a gadget, but we should make sure ids and emails match      
      if session['email'] and email != session['email']
        r.halt 401, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>#{email}</b> is logged into Canvas, but <b>#{session['email']}</b> is currently logged into the gadget server.<br><br>You can fix this by <a href='/logout'>logging out of the gadget server</a>."
        }) 
      end
 
      # verify their teacher/student status for the course matches what we've got
      roles = r.POST['custom_canvas_membership_roles']
      teacher = roles['TeacherEnrollment'] || roles['DesignerEnrollment']
      
      course_id = r.POST['custom_canvas_course_id']
      lti_enrollment = teacher ? 'teacher' : 'student'
      session_enrollment = session.to_hash.dig('courses', course_id, 'role')
      
      if lti_enrollment != session_enrollment
        session.replace Canvas.userinfo(email)
      end

      # this hackery tell Roda to call the next app in the middleware stack
      throw :next, true
    end    
  end
end