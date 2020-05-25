require 'http'
require 'dotenv'
require 'connection_pool'

Dotenv.load

class CanvasAPI
  include Singleton
  class Error < StandardError; end

  # a thread safe pool of persistent canvas connection
  POOL = ConnectionPool.new(size: 5, timeout: 5) do
    host = URI::HTTPS.build(host: ENV['CANVAS_DOMAIN'])
    http = HTTP.persistent(host.to_s)
    http.auth("Bearer #{ENV['CANVAS_TOKEN']}")
  end

  def self.request method, *args
    response = POOL.with {|http| http.request(method, *args)}

    if response.status.success?
      body = response.body.to_s
      response.flush

      if response.content_type.mime_type['json']
        JSON.parse body rescue body
      else
        body
      end
    else
      response.flush
      raise Error, "Canvas API returned a (#{response.status}) error for #{args}"
    end
  end

  def self.get *args, paginate: false, **params
    if paginate
      params[:params] ||= {}
      params[:params][:page] = 1

      Enumerator.new do |y|
        until (json = self.request :get, *args, **params).empty?
          json.each {|j| y << j}
          params[:params][:page] += 1
        end
      end
    else
      self.request :get, *args, **params
    end
  end

  def self.post *args 
    self.request :post, *args
  end

  def self.put *args 
    self.request :put, *args
  end
end