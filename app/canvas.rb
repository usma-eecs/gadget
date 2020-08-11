require 'http'
require 'stringio'
require 'connection_pool'

# used by Canvas::API to pluralize
require 'dry/inflector' 

# TODO: cache path ids
class Canvas
  include Singleton

  # a thread safe pool of persistent canvas connection
  POOL = ConnectionPool.new(size: 5, timeout: 5) do
    host = URI::HTTPS.build(host: 'canvas.instructure.com')
    http = HTTP.persistent(host.to_s)
    http.auth("Bearer #{ENV['CANVAS_API_TOKEN']}")
  end

  class UpstreamError < StandardError
    attr_reader :status

    def initialize(message, status)
      @status = status
      super(message)
    end
  end

  class NotFound < UpstreamError
    def initialize(message) 
      super(message, 404)
    end
  end

# I couldn't resist putting some totally unnecessary ruby magic 
  # in here so this builds the api path in a chainable way: 
  # Canvas.api.course(cid).user(uid).get
  class API
    def initialize parts=['/api', 'v1']
      @parts = parts
    end
  
    def method_missing method, *args, **params, &block
      # pass a url and params to HTTP methods
      if [:get, :post, :put].include? method
        url = @parts.compact.join('/')
        Canvas.send method, *args.prepend(url), **params
        
      # other methods take at least a course_id, so extract it 
      # from parts and prepend the args with it 
      elsif Canvas.singleton_methods.include? method
        ints = @parts.select{|p| p.to_s[/^\d+$/]}
        Canvas.send method, *ints.concat(args)
      
      # keep chaining
      else
        if args.empty? or method.to_s.end_with? '!'
          part = method.to_s.chomp '!'
        else
          inflector = Dry::Inflector.new
          part = inflector.pluralize(method)
        end
        
        API.new(@parts + [part, *args])
      end
    end
  end

  def self.api
    API.new
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
      
      case status = response.status
      when 404
        raise NotFound, "#{args} not found"
      else
        raise UpstreamError.new("Canvas returned a #{status} error for #{args}", status)
      end
    end
  end

  def self.get *args, paginate: false, **params
    if paginate
      params[:params] ||= {}
      params[:params][:page] = 1

      Enumerator.new do |y|
        loop do 
          json = self.request :get, *args, **params

          if paginate == true
            break if json.empty?
            json.each {|j| y << j}
          else
            break if json[paginate].empty?
            json[paginate].each {|j| y << j}
          end

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

  def self.email course_id, user_id
    user_id = user_id.to_i
    course_api = api.course(course_id)
    
    # so this is a weird endpoint: It returns a page of users
    # in the course, but only the page that contains user_id, so 
    # you don't have to worry about pagination
    users = course_api.search_users.get(params: {user_id: user_id})
    
    if user = users.find {|user| user['id'] == user_id}
      user['email']
    end
  end

  # returns everything we need to know about a user
  # this is what populates into the gadget servers session hash
  def self.userinfo email
    user_id = nil
    
    # create a mapping of courses with gadgets enabled to dates that those 
    # courses end since we don't allow editing after course end
    gadget_courses = api.courses.get.each_with_object({}) do |course, hash|
      tools = api.course(course['id']).external_tools.get rescue next
      
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
      users = api.course(course_id).search_users.get(params: { 
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

    { 
      'id' => user_id, 
      'email' => email, 
      'courses' => courses, 
      'username' => email.split('@').first
    }
  end

  # returns a download url for the given file if it exists
  def self.download_url course_id, path_or_id
    if path_or_id.is_a? Integer
      file_id = path_or_id
    else
      course_api = api.course(course_id)
      file_id = course_api.file_id(path_or_id)
    end

    unless file_id.nil?
      response = api.file(file_id).public_url.get
      response['public_url']
    end
  rescue NotFound
    nil
  end

  # this upload the given contents to the course files at the 
  # given path. Make sure the upload is authorized. 
  def self.upload course_id, path, content
    dirname = File.dirname path
    filename = File.basename path

    course_api = api.course(course_id)
    parent_id = course_api.mkdir dirname

    token = course_api.files.post(params: {
      content_type: 'text/plain',
      on_duplicate: 'overwrite',
      name: filename, 
      parent_folder_id: parent_id
    })
    
    io = case content
    when StringIO, IO
      content
    when Rack::Lint::InputWrapper
      # Inputs *wrap* a StringIO called @input
      content.instance_variable_get :@input
    when String
      StringIO.new(content)
    else
      raise "unknown upload type: #{content.class}"
    end

    upload_url = token['upload_url']
    upload_params = token['upload_params']
    upload_params['file'] = HTTP::FormData::File.new(io)

    # You can't use Canvas pool because those are connected to canvas.instructure.com
    # and we are uploading to some content distribution network node
    HTTP.post(upload_url, form: upload_params)
  end

  # recursively creates the given path if it doesn't already exist
  # returns the target folder id
  def self.mkdir course_id, path
    course_api = api.course(course_id)
    path = path.squeeze('/').delete_prefix('/').delete_suffix('/')
    
    # folder exists
    if id = course_api.folder_id(path)
      return id

    # create the folder
    else
      dirname = File.dirname path
      parent_id = course_api.mkdir dirname

      folder = course_api.folders.post(params: {
        hidden: true, 
        locked: true,
        name: File.basename(path),
        parent_folder_id: parent_id
      })

      return folder['id']
    end
  end

  # this returns the folder id for the given path or nil if not found
  # I'm thinking we should have an id cache. That would improve response time 
  def self.folder_id course_id, path
    path = path.squeeze('/').delete_prefix('/').delete_suffix('/')

    # the ! tell API not to pluralize
    files = api.course(course_id).folders.by_path!(path).get
    files.last['id']
  rescue NotFound
    nil
  end

  # returns the file id or nil if it is not found
  # I'm thinking we should have an id cache. That would improve response time 
  def self.file_id course_id, path
    path = path.squeeze('/').delete_prefix('/').delete_suffix('/')
    filename = File.basename path

    course_api = api.course(course_id)
    parent_id = course_api.folder_id File.dirname(path)

    files = api.folder(parent_id).files.get(params: {
      search_term: filename
    })
    
    file = files.find {|f| f['display_name'] == filename}
    file ? file['id'] : nil

  rescue NotFound
    nil
  end

  def self.copy course_id, src, dst
    course_api = api.course(course_id)
    folder_id = course_api.mkdir(File.dirname(dst))

    file = api.folder(folder_id).copy_file.post(params: {
      on_duplicate: 'overwrite',
      source_file_id: course_api.file_id(src)
    })

    # rename the file to match dst
    api.file(file['id']).put(params: { name: File.basename(dst) })

    # TODO: cache this
    file['id']
  end

  # returns the quiz_submission for the given user or nil if there 
  # isn't one
  #
  # once a student starts interacting with a quiz, 
  # canvas creates a quiz_submission object for that user. it reuses 
  # that object for each attempt, so we can cache it
  #
  # bad news: you can't pull a quiz_submission for a particular user, 
  # you have to pull all quiz_submissions for that quiz for the entire 
  # course. So it is important to cache the associations between user_ids  
  # and quiz_submission ids so that we're not hammering the server
  #
  # note: there is a JS endpoint that the speedgrader uses to get 
  # around this issue, but it's protected by CSRF and not exposed in 
  # the rest API :( 
  def self.quiz_submission course_id, quiz_id, user_id
    submissions_api = api.course(course_id).quiz(quiz_id).submissions
    submissions = submissions_api.get(paginate: 'quiz_submissions')
    submissions.find {|submission| submission['user_id'] == user_id.to_i}
  rescue NotFound 
    nil
  end

  # returns a list of gadgets embeded in quiz_id
  def self.quiz_gadgets course_id, quiz_id
    regex = /https:\/\/[^\/\s]+\/quiz\/(?<name>[\w\-]+)/io
    questions = api.course(course_id).quiz(quiz_id).questions.get

    # TODO: cache this
    questions.filter_map do |question|
      if match = regex.match(question['question_text'])
        match['name']
      end
    end
  end
end