require 'http'
require 'dotenv'
require 'nokogiri'
require 'securerandom'
require_relative 'canvas-api'

Dotenv.load '.env'

quiz_url = "/api/v1/courses/36/quizzes"

CanvasAPI.get(quiz_url, paginate: true).each do |quiz|
    questions_url = "#{quiz_url}/#{quiz['id']}/questions"

    CanvasAPI.get(questions_url, paginate: true).each do |question|
        question_url = "#{questions_url}/#{question['id']}"
        warn "#{questions_url} ..."
        body = question['question_text']
        html = Nokogiri::HTML(body)
        
        # grab every iframe
        (html / 'iframe').each do |iframe|
          if gadget = iframe.attr('data-gadget')
            uuid = SecureRandom.uuid
            $stderr.print uuid
            File.write File.join(ENV['GADGET_DATA'], uuid), gadget
      
            iframe.replace "<iframe style=\"width: 100%; height: 350px;\" src=\"https://#{ENV['GADGET_DOMAIN']}/#{uuid}\" width=\"100%\" height=\"350\" allowfullscreen=\"allowfullscreen\" webkitallowfullscreen=\"webkitallowfullscreen\" mozallowfullscreen=\"mozallowfullscreen\" allow=\"autoplay *\"></iframe>"
          end
        end
      
        # post changes if we've made any
        new_body = html.css('body').inner_html
        unless new_body == body
            CanvasAPI.put question_url, form: { 
                "question[question_type]" => 'essay',
                "question[question_text]" => new_body 
            }
        end
      
        print "\n"
    end
end