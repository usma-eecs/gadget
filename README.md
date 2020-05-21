# IT105 

This web application is for the Introduction to Computing & Information Technology (IT105) course at West Point.

## Gadgets

Gadgets are python editors that can be embedded on a webpage. West Point cadets can access a personal editor at https://code.it105.army. You must be logged into Canvas first to access your editor. Log in by clicking the **Gadget Editor** link in the course's navigation menu. 

## Configuring Canvas

To add gadgets to your course, go to `Settings -> Apps -> View App Configurations -> Add App` and enter the following: 

* **Configuration Type**: Paste XML
* **Name**: Gadget Editor
* **Consumer Key**: *Copy `LTI_KEY` from `/root/it105/data/.env.production` on the server*
* **Shared Secret**: *Copy `LTI_SECRET` from `/root/it105/data/.env.production` on the server*
* **XML Configuration**: *Copy XML from [https://code.it105.army/config.xml](https://code.it105.army/config.xml)*

Follow the same steps to add a development server, but use *Gadget Editor (development)* as the name and copy XML from [https://dev.it105.army/config.xml](https://dev.it105.army/config.xml).

## Creating Gadgets

IT105 uses gadgets in [Canvas](https://canvas.instructure.com) for coding assessments. To create a new gadget, click the red "New Gadget Editor" button in any TinyMCE context. Note that only admins can create new gadgets. 

## Gadget Storage

Gadgets are serialized and stored on code.it105.army `/root/it105/data/`. That path can be changed by editing the `DATA_DIR` variable in the configuration file at `/root/it105/data/.env.production`. Personal gadgets are saved as the Canvas user ID. All other gadgets are identified by a random UUID.

## Development server

For testing, there is a second server at `dev.it105.army`. To start the dev server, run the following command: 

```bash
RACK_ENV=development bundle exec rerun -c "rackup -p 9393"
```

The development server uses the configuration at `/root/it105/data/.env.development`. Development gadgets can be created using the gray gadget icon in in the TinyMCE editor. Note that any gadgets created in development will not be accessible when the development server is not running.  

## DNS 

The it105.army domain is owned by Kyle King until we get up and running under Azure. Note that the army domain has nothing to do with the US Army. The DNS is managed on Cloudflare under the eecsit105@westpoint.edu account.  

## Certificates

We are using *Let's Encrypt!* for certificates. To get certs, running the following command on the gadget server: 

```bash
certbot --nginx -d dev.it105.army -d code.it105.army
``` 

There is a cronjob that tries to renew the certs every night. 

## Nginx

Right now everything is running on a DigitalOcean Ubuntu instance. `nginx` receives all requests, SSL-enables connections, and forwards requests to the appropriate web server. There are two back-end servers: The production server running on port `9292` and the development server on `9393`. 

* Install `nginx`
* Copy `config/nginx.conf` to `/etc/nginx/sites-available/it105.army`
* Configure `nginx` to start automatically: 

```bash
$ systemctl enable nginx
$ service nginx start
```

# IT105 service

There is a service script to simplify managing the production server. To install and start the service, do the following: 

```bash
cp config/it105.service /etc/systemd/system/
systemctl enable it105.service
service it105 start
```

## Scripting

Canvas has an excellent REST API. If you aren't allergic to Ruby, you can use the `CanvasAPI` class in `app/canvas_api` to automate a great deal. Here is an example of a script that converted all of the blackboard gadgets to Canvas:

```ruby
require 'http'
require 'dotenv'
require 'nokogiri'
require 'securerandom'

Dotenv.load '.env.production'
require_relative '/root/it105/app/canvas_api'

quiz_url = "/api/v1/courses/1748311/quizzes"

CanvasAPI.get(quiz_url, paginate: true).each do |quiz|
    questions_url = "#{quiz_url}/#{quiz['id']}/questions"

    CanvasAPI.get(questions_url, paginate: true).each do |question|
        print '.'
        body = question['question_text']

        if body['iframe']
            html = Nokogiri::HTML(body)
    
            # grab every iframe
            (html / 'iframe').each do |iframe|
                if gadget = iframe.attr('data-gadget')
                    tainted = true
                    uuid = SecureRandom.uuid
                    File.write File.join("#{ENV['GADGET_DATA']}-questions", uuid), gadget
                    warn "\n#{uuid}: #{gadget}"
    
                    iframe.replace "<iframe style=\"width: 100%; height: 350px;\" src=\"https://#{ENV['GADGET_DOMAIN']}/#{uuid}\" width=\"100%\" height=\"350\" allowfullscreen=\"allowfullscreen\" webkitallowfullscreen=\"webkitallowfullscreen\" mozallowfullscreen=\"mozallowfullscreen\" allow=\"autoplay *\"></iframe>"
                end
            end
            
            question_url = "#{questions_url}/#{question['id']}"
            warn "Saving changes to #{question_url} ..."
            
            CanvasAPI.put question_url, form: { 
                "question[question_text]" => html.css('body').inner_html 
            }
        end
    end
end
```