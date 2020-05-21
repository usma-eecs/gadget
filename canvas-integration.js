// we only render gadgets within the context of a course
var match = document.location.pathname.match(/^\/courses\/(\d+)/);

if (match && !document.location.search.match('badgadget')) {
  window.CONTEXT = {}
  var course = match[1];  

  // capture the context that impact how we render gadgets
  if (ENV.QUIZ) {
    if (ENV.IS_PREVIEW || ENV.QUIZ.locked_for_user == false) {
      if (location.pathname.endsWith('/take')) {
        CONTEXT.TAKING_QUIZ = true;
      } 
    } else if (location.pathname.endsWith('/edit')) {
      CONTEXT.EDITING_QUIZ = true;
    }
  } else if (location.pathname.match(/^\/courses\/(\d+)\/question_banks\/(\d+)/)) {
    CONTEXT.EDITING_QUIZ = true;
  }

  console.log("master: ", CONTEXT);

  // sends a message to an gadget and processes responses
  var send = function(gadget, message, callback) {
    message.id = Math.random().toString(36).substring(2, 15);

    var sender = setInterval(() => {
      if (gadget.contentWindow) {
        // continue sending until we get an ack
        gadget.contentWindow.postMessage(message,'*');
      } else {
        // the gadget has been removed
        clearInterval(sender);
        console.log("master: failed to send " + message.type + " message - gadget doesn't exist!");
      }
    }, 500)

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

  // upacks a gadget update to the given div
  var unpackUpdate = (update, div) => { 
    console.log("master: upacking gadget update");

    $('pre', div).remove();
    var config = JSON.parse(atob(update));

    JSON.parse(config.code).forEach(file => {
      var pre = $('<pre/>')
        .html(file.content)
        .attr('id', file.name)
        .hide();

      if (file.hidden) {
        pre.addClass("hidden");
      }

      $(div).append(pre);
    });

    if (config.description) {
      $(div).append(
        $('<pre/>')
          .text(config.description)
          .attr('id', 'instructions.md')
          .hide()
      );
    }
  }

  // converts a <div class='gadget'>...</div> to an iframe
  var render = function(div, readonly, role, callback) {
    if ($('iframe.gadget',div).length > 0) {
      console.log("master: gadgetfy called twice on", div);
    } else { 
      var files = [];

      var config = {
        settings: {
          role: role,
          readonly: readonly, 
          activeTab: 'main.py'
        },
        description: ''
      };

      $('pre', div).each(function() {
        if (this.id == 'instructions.md') {
          config.description = this.textContent;
        } else {
          files.push({
            name: this.id,
            content: this.textContent,
            hidden: this.classList.contains('hidden')
          });
        }
      });

      // serialize
      config.code = JSON.stringify(files);
      var data = btoa(JSON.stringify(config));

      // replace the div contents with an iframe
      $('pre', div).hide();
      
      var gadget = $('<iframe>', {
        height: 350,
        width: '100%',
        frameborder: 0,
        marginwidth: 0,
        marginheight: 0,
        class: 'gadget',
        allowfullscreen: true,
        src: 'https://usma-eecs.github.io/gadget/'
      });

      $(div).append(gadget);
      
      var message = { 
        type: 'init', 
        data: data,
        send_updates: !!callback
      };

      // pass the new iframe its gadget code
      // if a callback was given, updates will be sent 
      // to it whenever the gadget changes
      send(gadget.get(0), message, callback);
    }
  }

  // this grabs the default gadget and caches it
  const defaultGadget = (callback) => {
    defaultGadget.template = defaultGadget.template || $.get(
      'https://usma-eecs.github.io/gadget/template.html'
    )
    defaultGadget.template.then((html) => {
      // insert a blank paragraph after the gadget or following
      // elements will inherit the 'gadget' class
      callback(html + "<p>&nbsp;</p>");
    });
  }

  var hookTinyMCE = editor => {
    console.log('master: hooking editor ' + editor.id);
  
    var renderGadgets = event => {
      var doc = editor.getDoc();
      var gadgets = $('div.gadget', doc).not(":has(iframe.gadget)");
      
      gadgets.each(function() {
        render(this, false, "owner", update => { 
          unpackUpdate(update, this);
        });
      });
    }

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
      );
  
      button.click(() => {
        defaultGadget(gadget => editor.insertContent(gadget));
        setTimeout(renderGadgets, 500);
      });

      var container = $(editor.getElement()).siblings('.mce-container');
      
      $('.mce-btn:has(.mce-i-rtl)', container).remove();
      $('.mce-btn:has(.mce-i-ltr)', container).replaceWith(button);
    }
  
    if (editor.initialized) {
      addButton()
      renderGadgets()
    }
  
    editor.on('init', () => { 
      addButton();
      renderGadgets(); 
    });
  
    // render gadgets after loading content
    editor.on('LoadContent', renderGadgets);
  
    // remove the rendered gadget iframe when saving
    editor.on('PreProcess', e => {
      $('div.gadget > iframe', e.node).remove();
      $('div.gadget > #instructions\\.md', e.node).show();
    });
  }

  // we are taking or previewing a quiz
  if (ENV.QUIZ && (ENV.IS_PREVIEW || ENV.QUIZ.locked_for_user == false)) {
    console.log("master: ignoring gadgets in tinymce editors");
  } else {
    var watchForTinyMCE = setInterval(function() {
      if (typeof tinymce !== 'undefined') {
        clearInterval(watchForTinyMCE);
        tinymce.get().forEach(hookTinyMCE);
  
        tinymce.on('AddEditor', instance => { 
          hookTinyMCE(instance.editor) 
        });
      }
    }, 100);
  }

  // this is our main gadget-fication routine
  $(function() {
    if (CONTEXT.TAKING_QUIZ) {
      $('div.gadget').each(function() {
        var question = $(this).closest('.question');
        $('.answers', question).hide();

        var question_input = question.find('.question_input').get(0);
        var div = $('<div class="gadget">').get(0);
        
        // find the editor for this question
        render(this, false, 'guest', update => {
          unpackUpdate(update, div);
          tinymce.get(question_input.id).setContent(div.outerHTML);
        });
      });
    } else {
      $('div.gadget').not(":has(iframe.gadget)").each(function() { 
        render(this, CONTEXT.EDITING_QUIZ, 'guest');
      });

      // the quiz editor injects gadgets in such a way that we can't
      // detect them through events
      if (CONTEXT.EDITING_QUIZ) {
        console.log("checking for gadgets");
        setInterval(() => {
          $('div.gadget').not(":has(iframe.gadget)").each(function() { 
            render(this, CONTEXT.EDITING_QUIZ, 'guest');
          });
        }, 1000);
      }
    }
  });
}