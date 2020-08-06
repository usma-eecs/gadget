require 'http'
require 'concode'
require 'stringio'
require 'securerandom'
require_relative 'canvas'

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
      path = File.join(__dir__, '../templates', "#{type}.gadget")
      File.open(path)
    end
  end

  def self.generate_unique_gadget_name course_id
    root_id = Canvas.mkdir course_id, 'gadgets'
    generator = Concode::Generator.new words: 2, glue: '-'
    gadget_name = generator.generate SecureRandom.uuid

    files = Canvas.get("/api/v1/folders/#{root_id}/files", params: {
      search_term: gadget_name
    })

    files.empty? ? gadget_name : generate_unique_gadget_name
  end
end
