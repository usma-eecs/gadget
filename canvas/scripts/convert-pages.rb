require 'http'
require 'dotenv'
require 'nokogiri'
require 'securerandom'
require_relative 'canvas-api'

Dotenv.load '.env'

URL = "/api/v1/courses/36/pages"

CanvasAPI.get(URL, paginate: true).each do |page|
  url = "#{URL}/#{page['url']}"
  content = CanvasAPI.get(url)
  body = content['body']
  html = Nokogiri::HTML(body)

  # grab every iframe
  (html / 'iframe').each do |iframe|
    if gadget = iframe.attr('data-gadget')
      uuid = SecureRandom.uuid
      File.write File.join(ENV['GADGET_DATA'], uuid), gadget
      print "#{uuid} "

      iframe.replace "<iframe style=\"width: 100%; height: 350px;\" src=\"https://#{ENV['GADGET_DOMAIN']}/#{uuid}\" width=\"100%\" height=\"350\" allowfullscreen=\"allowfullscreen\" webkitallowfullscreen=\"webkitallowfullscreen\" mozallowfullscreen=\"mozallowfullscreen\" allow=\"autoplay *\"></iframe>"
    end
  end

  # post changes if we've made any
  new_body = html.css('body').inner_html
  unless new_body == body
    # CanvasAPI.put url, form: { "wiki_page[body]" => new_body }
  end

  print "\n"
end