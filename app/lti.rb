require 'roda'
require 'ims/lti'
require 'seconds'
require 'concurrent'

class LTI < Roda
  plugin :halt
  plugin :middleware

  # track oauth nonce to prevent replay attacks
  nonces = Concurrent::Map.new

  Concurrent::TimerTask.new(execution_interval: 1.minutes) do 
    nonces.each_pair do |nonce,time|
      nonces.delete nonce if time < 2.minutes.ago
    end
  end.execute

  route do |r|
    # user is authenticating using an LTI launch request
    r.on 'lti', method: 'post' do      
      unless r.POST['lti_message_type'] == 'basic-lti-launch-request'
        r.halt 400, 'Bad lti_message_type.' 
      end

      launch_url = URI::HTTPS.build(host: env['HTTP_HOST'], path: r.path)
      
      launch_auth = IMS::LTI::Services::MessageAuthenticator.new(
        launch_url, r.POST, ENV['LTI_SECRET']
      )

      unless launch_auth.valid_signature?
        r.halt 401, "Invalid LTI credentials"
      end

      if Time.now.getutc.to_i - r.POST['oauth_timestamp'].to_i > 1.minute
        r.halt 401, "LTI signature is too old to verify."
      end

      if nonces[r.POST['oauth_nonce']]
        r.halt 401, "Cannot reuse nonce in LTI signature."
      else 
        nonces.put_if_absent r.POST['oauth_nonce'], Time.now
      end

      unless r.POST['roles'] and r.POST['custom_canvas_user_id']
        r.halt 401, "LTI message is missing a custom_canvas_user_id or roles" 
      end

      # this hackery tell Roda to call the next app in 
      # the middleware stack, which is either gadget or chat 
      throw :next, true
    end    
  end
end