# Gadget Server

Hosts
* Gadget renderer for Canvas
* Insecure Chat
* Security Squabble

Branches
gh-pages is the paid canvas branch
master is the free canvas branch

Create a `.env` with: 
* LTI_KEY
* LTI_SECRET
* CANVAS_API_TOKEN
* Lot of other variables


    # all gadgets have a type: personal, student, teacher, assessment
    # gadgets are organized in the course files under type folders
    
    # the course id isn't included in a gadget URL since we don't want 
    # to have to update every gadget URL every time we copy a course

    template gadget