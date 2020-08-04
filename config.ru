# encoding: UTF-8

require 'roda'
require 'slim'
require 'dotenv/load'

require_relative 'app/chat'
require_relative 'app/gadget'

Slim::Engine.set_options pretty: true

class CY105 < Roda
  plugin :header_matchers
  plugin :render, engine: 'slim'
  plugin :public, headers: {'Last-Modified' => DateTime.now.httpdate}

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

run CY105.freeze.app
