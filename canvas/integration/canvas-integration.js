$(() => {
  // sends a message to a gadget iframe and processes responses. we 
  // only use this to init, but you could send other types of messages
  function send(gadget, message, callback) {
    message.id = Math.random().toString(36).substring(2, 15);
    
    // continue sending the message until we get an ack
    var sender = setInterval(() => {
      if (gadget.contentWindow) {
        gadget.contentWindow.postMessage(message,'*');
      } else {
        clearInterval(sender);
        console.log("master: failed to send " + message.type + " message - gadget doesn't exist!");
      }
    }, 500);

    $(window).on('message', event => {
      var response = event.originalEvent.data;

      if (response.id == message.id) {
        if (response.type == 'ack') {
          clearInterval(sender);
        } else if (callback) {
          callback(response.data);
        }
      }
    });
  }

  function render(gadget, {admin=false, onSave=null, onEdit=null, readonly=false}={}) {
    if (gadget.rendered) {
      console.log("master: render called twice on", gadget);
    } else {
      gadget.rendered = true
      var html = gadget.innerHTML;

      var initialize = { 
        type: 'init',
        data: html,
        admin: admin, 
        save: !!onSave,
        edit: !!onEdit,
        readonly: readonly
      }
      
      var iframe = $('<iframe>', {
        height: 350,
        width: '100%',
        frameborder: 0,
        marginwidth: 0,
        marginheight: 0,
        class: 'gadget',
        allowfullscreen: true,
        src: 'https://usma-eecs.github.io/gadget/'
      });

      // the gadget source lives inside the iframe
      iframe.attr('data-gadget', html);
      
      // pass the new iframe its gadget code
      $(gadget).empty().append(iframe);
      send(iframe.get(0), initialize, onSave || onEdit);
    }
  }

  // this grabs the default gadget and caches it
  const templateGadget = (callback) => {
    templateGadget.template = templateGadget.template || $.get(
      'https://usma-eecs.github.io/gadget/canvas/template.gadget'
    )
    templateGadget.template.then((html) => {
      // insert a blank paragraph after the gadget or following
      // elements will inherit the 'gadget' class
      callback(html + "<p>&nbsp;</p>");
    });
  }

  // we only render gadgets within the context of a course
  var match = document.location.pathname.match(/^\/courses\/(\d+)/);

  if (match && !document.location.search.match('badgadget')) {
    $('div.gadget').each((i, gadget) => {
      var answer = $('<div class="gadget">');
      var question = $(gadget).closest('.question'); 
      var question_input = question.find('.question_input');

      if (question_input.length) {
        console.log("master: taking a quiz");
        $('.answers', question).hide();

        // load a previous answer if there is one
        if (question_input.val()) {
          $(gadget).html(question_input.val());
          gadget = $(gadget).children().get(0);
        }

        render(gadget, { 
          onEdit: update => {
            answer.html(update);
            var editor = tinymce.get(question_input.attr('id'));
            editor.setContent(answer.get(0).outerHTML);
            tinymce.triggerSave();
          }
        });   
      }
      
      else if (question.length) {
        console.log("master: editing a quiz", question);
        // you have to click the pencil to edit
        render(gadget, { readonly: true });
      }  
      
      else if ($(gadget).hasClass('personal')) {
        var id = gadget.id; 
        var user_id = ENV.current_user.id;

        if (!id) {
          console.log("master: can't render a personal gadget without an id!");
          render(gadget);
        } else {
          console.log("master: personal gadget", id);
          
          var config = { 
            role: 'owner', 
            onSave: html => {
              console.log('master: personal gadget save requested');
              
              var path = '/api/v1/users/' + user_id + '/files';

              var params = { 
                name: `${id}.gadget`, 
                content_type: 'text/plain',
                on_duplicate: 'overwrite'
              }

              $.post(path, params).done(data => {
                var form = new FormData();

                for (param in data.upload_params) {
                  form.append(param, data.upload_params[param]);
                }

                form.append("file", new Blob([html], {type: "text/plain"}));
                
                $.ajax({
                  type: 'POST',
                  data: form,
                  processData: false,
                  contentType: false,
                  url: data.upload_url,
                  success: data => console.log(`gadget: gadget ${id} saved`),
                  failure: error => console.log("gadget: upload failed", error)
                });
              });
            }
          }

          var path = `/api/v1/users/${user_id}/files`;

          $.get(path, { search_term: `${id}.gadget` }).done(files => {
            if (files.length) {
              console.log("master: personal gadget found");
              $.get(`/api/v1/files/${files[0].id}/public_url`, data => {
                $.get(data.public_url, html => {
                  gadget.innerHTML = html;
                  render(gadget, config);
                });
              })
            } else {
              console.log("master: user doesn't have a personal gadget");
              render(gadget, config);
            }
          });
        }
      } else {
        render(gadget);
      }
    });

    // find gadgets in editors as they appear
    var editors = setInterval(() => {
      if (typeof tinymce !== 'undefined') {
        clearInterval(editors);

        function hook(editor) {
          console.log('master: hooking editor ' + editor.id);

          var editorRender = event => {
            $('div.gadget', editor.getDoc()).each((i, gadget) => {
              // if we're editing a quiz question, select the gadget question option
              var question = $(editor.getElement()).closest('.question');
              $(question).find('.gadget_question').attr('selected', true);              

              render(gadget, {
                admin: true, 
                onEdit: html => $('iframe.gadget', gadget).attr('data-gadget', html)
              });
            });
          }
      
          var insertGadget = () => {
            console.log("insert");
            templateGadget(gadget => editor.rceWrapper.insert_code(gadget));
            setTimeout(editorRender, 500);
          };

          var addButton = () => {
            var button = $("<div>", { 
                role: 'button',
                class: 'mce-widget mce-btn',
              }).append($("<button>", { 
                role: 'presentation',
                type:'button'
              }).append($("<i>")
                .addClass("mce-ico mce-i-none")
                .css("background-image", "url('https://usma-eecs.github.io/gadget/img/editor-icon.png')")
              )
            ).click(insertGadget);
      
            var container = $(editor.getElement()).siblings('.mce-container');

            // we remove the left-to-right and right-to-left buttons
            // hopefully no one needed those ....
            $('.mce-btn:has(.mce-i-rtl)', container).remove();
            $('.mce-btn:has(.mce-i-ltr)', container).replaceWith(button);
          }

          var addGadgetQuestionType = () => {            
            // add a gadget question type
            var question = $(editor.getElement()).closest('.question');
            question.find(".question_type:not(:has('.gadget_question'))").append(
              $("<option value='essay_question'>Gadget Question</option>")
                .addClass('gadget_question')
            );

            question.find(".question_type").change(()=> {
              if ($(editor.getDoc()).find('div.gadget').length == 0) {
                insertGadget();
              }
            });
          }

          editor.on('init', (e) => {
            addButton();
            addGadgetQuestionType();
            editorRender();
          });
        
          // render gadgets after loading content
          editor.on('LoadContent', (e) => {
            if (e.initial != true) {
              editorRender();
            }
          });

          editor.on('SaveContent', (e) => {
            // when you save a quiz question, the gadget is inserted 
            // outside the editor, so go find the un-rendered gadget
            setTimeout(() => {
              $("div.gadget:not(:has('iframe.gadget'))").each(
                (i,unRenderedGadget) => render(unRenderedGadget)
              )
            }, 500);
          });          
          
          // remove the rendered gadget iframe when saving
          editor.on('PreProcess', e => {
            $('div.gadget', e.node).each((i, gadget) => {
              var html = $('iframe.gadget', gadget).attr('data-gadget');

              if (html) {
                gadget.innerHTML = html;
              } else {
                console.log("master: warning - found unrendered gadget", gadget);
              }
            });
          });
        }

        tinymce.get().forEach(hook);
        tinymce.on('AddEditor', instance => hook(instance.editor));
      }
    }, 100);
  }
});