# LTI Gadget Implementation

This branch contains an implementation for a server that will server gadgets to a free Canvas instance using their LTI and REST interfaces. 

This server also hosts an Insecure Chat server for teaching web vulnerabilities and Security Squabble server for teaching personal cyber hygiene. 

## IMPORTANT: Caching

This server uses the Canvas REST API to store gadgets, validate quiz access, and much more. It is probably a good idea to add some aggressive caching to `app/canvas.rb` before using this server in production. 

Pro tip: The easiest way to implement caching is probably to add a `cache` method to the `Canvas::API` class in `app/canvas.rb`. For example

```ruby 
# bypass the cache
file_id = Canvas.api.course(12345).file_id('gadgets/templates/personal.gadget')

# return cached value if exists, store in cache otherwise
file_id = Canvas.api.course(12345).cache.file_id('gadgets/templates/personal.gadget')
```

## Server configuration

Before you can run the server, you must create a `.env` file that has the following: 

```bash
# the secret and key to authenticates LTI requests from canvas
LTI_KEY=
LTI_SECRET=

# this is the provider Microsoft offers for mult-tenant applications
OPENID_COMMON_PROVIDER=https://login.microsoftonline.com/common/v2.0

# this is the westpoint.edu's tenant id that will actually respond with authentication information 
# we need this for validation purposes
OPENID_TENANT_PROVIDER=https://login.microsoftonline.com/99ff8811-3517-40a9-bf10-45ea0a321f0b/v2.0

# this is the tenant client id and secret an Azure AD app for O365 authentication
OPENID_CLIENT_ID=
OPENID_CLIENT_SECRET=

# an API token for a canvas user that must be have a teacher role in every course 
# containing gadgets 
CANVAS_API_TOKEN=

# this is used to encrypt session cookies
SESSION_SECRET=
```

## Canvas configuration

Go to Settings -> Apps in your canvas course and add a new app. Select `Paste XML` with the contents from here: 

> https://gadget.it105.army/lti/gadget.xml

## Gadget types

There are four types of gadgets: 

* **Quiz gadgets** can only be edited by students during a quiz.
* **Teacher gadgets** are available to everyone, but can only be edited by teachers.
* **Student gadgets** are available to everyone, but can only be edited by the student that created them. Student can only create student gadgets. 
* **Personal gadgets** are a private place for individuals to test and save their code. 

To embed a gadget, you only need its type and name: 

```
<iframe src="http://gadget.it105.army/<gadget_type>/<gadget_name>" ...>
```

## Gadget templates

New gadgets are based on their respective gadget type template. Teachers can edit the templates on the gadget server. For example, to edit the quiz gadget template, you would visit: 

```
https://gadget.it105.army/template/quiz
```

Every personal gadget has its own template that is based, initially, on the `personal.gadget` template. To edit a particular personal gadget template, visit the `edit` endpoint for that gadget on the server. For example:

```
https://gadget.it105.army/personal/<gadget-name>/edit
```

## Gadget storage

Gadgets are stored in the course files of the course they are created in. That means when you clone a course, you get a fresh copy of all the gadgets in it. Here is how they are stored:

```text
course_files
└── gadgets
    ├── template
    │   ├── quiz.gadget
    │   ├── teacher.gadget
    │   ├── student.gadget
    │   └── personal.gadget
    ├── teacher
    │   └── <gadget_name>.gadget
    ├── student
    │   └── <user_id>
    │       └── <username>-<gadget_name>.gadget
    └── personal
    │   └── <course_id>
    │       └── <gadget_name>
    │           └── <username>.gadget
    ├── quiz
    │   └── questions
    │       └── <gadget_name>.gadget  
    └────── <course_id>
            └── <quiz_id>
                └── <username>
                    └── <quiz_id>-<user_id>-<gadget_name>-<attempt>.gadget
   
```

Gadget names are randomly generated using the [concode gem](https://github.com/DannyBen/concode). I don't recommend renaming them since you would have to go and update every link pointing to that gadget. 