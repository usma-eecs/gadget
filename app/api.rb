require 'http'
require 'stringio'
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

  # returns everything we need to know about a user
  # this is what populates into the gadget servers session hash
  def self.userinfo email
    user_id = nil

    # create a mapping of courses with gadgets enabled to dates that those 
    # courses end since we don't allow editing after course end
    gadget_courses = API.get('/api/v1/courses').each_with_object({}) do |course, hash|
      tools = API.get "/api/v1/courses/#{course['id']}/external_tools"
      
      if tools.any? {|tool| tool['consumer_key'] == ENV['LTI_KEY']}
        hash[course['id'].to_s] = { 
          'end' => course['end_at'], 'name' => course['name']
        }
      end
    end
    
    # find which gadget courses this user is registered in and return
    # a mapping from course ids to booleans indicating if they have
    # elevated privileges in that course (teacher or course designer)
    courses = gadget_courses.each_with_object({}) do |(course_id,course), hash|
      users = API.get("/api/v1/courses/#{course_id}/search_users", params: { 
        search_term: email,
        'include[]' => 'enrollments'
      })
        
      if user = users.find {|user_info| user_info['email'] == email}
        user_id ||= user['id'].to_s

        teacher = user['enrollments'].any? do |enrollment|
          ['DesignerEnrollment', 'TeacherEnrollment'].include? enrollment['type']
        end

        hash[course_id] = course.merge('role' => teacher ? 'teacher' : 'student')
      end
    end

    { 'id' => user_id, 'email' => email, 'courses' => courses }
  end

  # this upload the given contents to the course files at the 
  # given path. Make sure the upload is authorized. 
  def self.upload course_id, path, io
    filename = File.basename(path)

    token = API.post("/api/v1/courses/#{course_id}/files", params: {
      content_type: 'text/plain',
      on_duplicate: 'overwrite',
      name: filename, 
      parent_folder_path: File.dirname(path)
    })

    upload_url = token['upload_url']
    upload_params = token['upload_params'] 
    upload_params['file'] = HTTP::FormData::File.new(io)

    # You can't use API pool because those are connected to canvas.instructure.com
    # and we are uploading to some content distribution network node
    HTTP.post(upload_url, form: upload_params)
  end
end