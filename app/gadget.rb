require 'roda'
require 'seconds'
require 'concurrent'
require 'securerandom'
require 'openid_connect'

class Gadget < Roda
  plugin :halt
  plugin :status_handler
  plugin :slash_path_empty
  plugin :render, engine: 'slim', cache: false
  plugin :sessions, secret: ENV['SESSION_SECRET'], same_site: 'None'
  
  status_handler(401) do
    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: "Sorry, only admins are allowed here."
    }
  end

  status_handler(404) do    
    render :card, locals: {
      title: '¯\_(ツ)_/¯', 
      text: "Sorry, that link is broken. My fault? Yours? Who can say?"
    }
  end

  route do |r|
    r.post do
      roles = roles.split(',')
      admin = ['Instructor', 'ContentDeveloper'].any? {|role| roles.include? role}
      email = r.POST['lis_person_contact_email_primary']

      if email.nil? or not email.ends_with? 'westpoint.edu'
        r.halt 401, 'Your <a href="https://canvas.instructure.com/profile/settings"/>primary email address</a> in Canvas must be a <b><tt>westpoint.edu</tt></b> address to create gadgets.'
      end

      session[:email] = email
      session[:admin] = admin
      session[:id] = r.POST['custom_canvas_user_id']

      r.POST.map {|k,v| "#{k}: #{v}<br>"}.join
    end

    r.get 'o365/callback' do

    end
  end
end
