require 'roda'
require 'awesome_print'

# let's you view and edit your session hash
class SessionDebugger < Roda
  plugin :middleware
  plugin :render, engine: 'slim'

  route do |r|
    unless ENV['RACK_ENV'] == 'development'
      raise 'Session debugger is for development only!' 
    end

    r.on 'debug' do
      r.post do
        session.replace eval(r.POST['session'])
        "<p>Updated!</p><form method=post><textarea name=session rows=20 cols=75>#{session.to_hash.ai(plain: true)}</textarea><br><input type=submit></form>"
      end

      r.get do
        "<form method=post><textarea name=session rows=20 cols=75>#{session.to_hash.ai(plain: true)}</textarea><br><input type=submit></form>" 
      end
    end
  end
end