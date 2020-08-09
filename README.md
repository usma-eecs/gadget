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
  * This token must belong to someone with the teacher role in *all* courses you want to render gadgets in. 
  * If you have paid canvas, then you can issue a token with the appropriate privileges
* Lot of other variables

renaming gadgets: I don't recommends it, but here's how

# all gadgets have a type: personal, student, teacher, assessment
# gadgets are organized in the course files under type folders

# the course id isn't included in a gadget URL since we don't want 
# to have to update every gadget URL every time we copy a course

# You will want to delete the personal gadgets when you copy a course ...

template gadget