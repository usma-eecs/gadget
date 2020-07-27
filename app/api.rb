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

  # returns a hash of enrollments for the user
  def self.userinfo email
    id = nil

    # create a mapping of courses with gadgets enabled to dates that those 
    # courses end since we don't allow editing after course end
    gadget_courses = API.get('/api/v1/courses').each_with_object({}) do |course, hash|
      tools = API.get "/api/v1/courses/#{course['id']}/external_tools"
      
      if tools.any? {|tool| tool['consumer_key'] == ENV['LTI_KEY']}
        hash[course['id'].to_s] = course['end_at']
      end
    end
    
    # find which gadget courses this user is registered in and return
    # a mapping from course ids to booleans indicating if they have
    # elevated privileges in that course (teacher or course designer)
    courses = gadget_courses.each_with_object({}) do |(cid,ends), hash|
      users = API.get("/api/v1/courses/#{cid}/search_users", params: { 
        search_term: email,
        'include[]' => 'enrollments'
      })
        
      if user = users.find {|info| info['email'] == email}
        id ||= user['id'].to_s

        teacher = user['enrollments'].any? do |enrollment|
          ['DesignerEnrollment', 'TeacherEnrollment'].include? enrollment['type']
        end

        hash[cid] = {
          'ends' => ends,
          'role' => teacher ? 'teacher' : 'student',
        }
      end
    end

    { 'id' => id, 'email' => email, 'courses' => courses }
  end
end