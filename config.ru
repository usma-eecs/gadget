# encoding: UTF-8

require 'roda'
require 'slim'
require 'dotenv/load'
require 'roda/session_middleware'

require_relative 'app/lti'
require_relative 'app/chat'
require_relative 'app/o365'
require_relative 'app/gadget'

Slim::Engine.set_options pretty: true

class IT105 < Roda
  plugin :header_matchers
  plugin :render, engine: 'slim'
	plugin :public, headers: {'Last-Modified' => DateTime.now.httpdate}

  use LTI
  use Rack::CommonLogger
  use Rack::ShowExceptions if ENV['RACK_ENV'] == 'development'
  
  route do |r|
		r.public

    r.on host: 'chat.it105.army' do
      r.run Chat
    end

    r.on host: 'gadget.it105.army' do
      r.run Gadget
    end
    
    r.on host: 'squabble.it105.army' do
      r.run Squabble
    end
    
    r.root do
      view :index
    end
  end
end

run IT105.freeze.app
