require 'http'
require 'connection_pool'

class API
  include Singleton
  class Error < StandardError; end

  # a thread safe pool of persistent canvas connection
  POOL = ConnectionPool.new(size: 5, timeout: 5) do
    host = URI::HTTPS.build(host: 'canvas.instructure.com')
    http = HTTP.persistent(host.to_s)
    http.auth("Bearer #{ENV['CANVAS_API_TOKEN']}")
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
      raise Error, "Canvas returned a (#{response.status}) error for #{args}"
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

  # 
  def self.get_courses_for email
    # get all courses this API token can access and filter out any that 
    # aren't configured for gadgets
    gadget_courses = API.get('/api/v1/courses').filter_map do |course|
      tools = API.get "/api/v1/courses/#{course['id']}/external_tools"
      course['id'] if tools.any? {|tool| tool['consumer_key'] == ENV['LTI_KEY']}
    end
    
    # find which gadget courses this user is registered in and return
    # a mapping from course ids to booleans indicating if they have
    # elevated privileges in that course (teacher or course designer)
    gadget_courses.each_with_object(Hash.new) do |course_id, hash|
      users = API.get("/api/v1/courses/#{course_id}/search_users", params: { 
        search_term: email,
        'include[]' => 'enrollments'
      })
        
      if user = users.find {|info| info['email'] == email}
        hash[course_id] = user['enrollments'].any? do |enrollment|
          ['DesignerEnrollment', 'TeacherEnrollment'].include? enrollment['type']
        end
      end
    end
  end
end