require 'http'
require 'concode'
require 'stringio'
require 'securerandom'
require_relative 'api'

class Templates
  # returns an IO containing the gadget template for the given type
  def self.get_template_io type
    uri = URI.join(ENV['TEMPLATE_URI'], "type.gadget")
    response = HTTP.get(uri)

    if response.status == 200
      response.body
    
    # looks like the TEMPLATE_URI broke :(
    else
      warn "WARNING: missing #{type}.gadget template at #{uri}"
      template = File.join(__dir__, '../templates', "#{type}.gadget")
      StringIO.new template
    end
  end

  def self.generate_unique_gadget_name course_id
    root_id = API.mkdir course_id, 'gadgets'
    generator = Concode::Generator.new words: 2, glue: '-'
    gadget_name = generator.generate SecureRandom.uuid

    files = API.get("/api/v1/folders/#{root_id}/files", params: {
      search_term: gadget_name
    })

    files.empty? ? gadget_name : generate_unique_gadget_name
  end
end
