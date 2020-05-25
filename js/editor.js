Sk.externalLibraries = {
  "gadget.checks": {
    path: "imports/checks.js"
  },
  "gadget.tester": {
    path: "imports/tester/__init__.py"
  },
  "gadget.ast": {
    path: "imports/ast/__init__.py"
  },
  _ast: {
    path: "imports/ast/_ast.js"
  },
  gadget: {
    path: "imports/gadget/__init__.js"
  },
  "gadget.tests": {
    path: "imports/gadget/tests.py"
  },
  "src/lib/turtle.js": {
    path: "imports/turtle.js"
  },
  "turtle": {
    path: "imports/turtle.js"
  }
};

$(() => {
  // add methods to convert to/from HTML
  $.extend(GadgetApp.__proto__, {
    toHTML: function() {
      var gadget = $("<div class='gadget'>");
      var active = this.getEditor().activeTab().fileName;

      this.getEditor()._files.forEach(file => {
        var pre = $('<pre/>')
          .attr('id', file.name)
          .html(file.editor.getValue());

        if (file.hidden) {
          pre.addClass("hidden");
        }

        if (file.name == active) {
          pre.addClass("active");
        }
        
        $(gadget).append(pre);
      });
      
      if (this.getInstructions()) {
        $(gadget).append(
          $('<pre/>')
            .text(this.getInstructions())
            .attr('id', 'instructions.md')
        );
      }

      return gadget.html();
    },
    getInstructions: function() {
      return this._gadget.description
    },
    onEdit: (callback) => {
      $('#save-instructions').click(callback);
      $(document).on("gadget.resetted", callback);
      $(document).on("gadget.code.change",callback);
    }
  });

  $("[data-action='code.debug']").click(() => {
    var fileName = GadgetApp.getEditor().activeTab().fileName;
    var code = encodeURIComponent(GadgetApp.getEditor().getFile(fileName));
    window.open("http://pythontutor.com/visualize.html#mode=edit&code="+code, 'debugger');
    return false;
  });

  var messages = {};

  // receive editor updates
  $(window).on('message', event => {
    var original = event.originalEvent;
    var message = original.data;
    
    // acknowledge this message
    original.source.postMessage({id: message.id, type: 'ack'}, original.origin);

    if (messages[message.id]) {
      console.log("gadget: ignoring duplicate " + message.type + " message " + message.id);
    } else {
      messages[message.id] = true;
      console.log("gadget: received " + message.type + " message " + message.id);

      if (message.type == 'init') {
        // an initialization message contains the gadget HTML
        var gadget = $('<div>').html(message.data);
        
        var activeTab = false;
        var admin = message.admin;
        var readonly = message.readonly;
        
        var config = {
          code: [],
          description: '',
          settings: { role: admin ? 'owner' : 'guest' }
        };
  
        gadget.children('pre').each((i,pre) => {
          if (pre.id == 'instructions.md') {
            config.description = this.textContent;
          } else {
            config.code.push({
              name: pre.id,
              content: pre.textContent,
              hidden: pre.classList.contains('hidden')
            });
          }
          if (pre.classList.contains('active')) {
            // don't reveal the active tab unless they're admin
            if (!admin && pre.classList.contains('hidden')) {
              activeTab = pre.id;
            }
          }
        });
  
        config.code = JSON.stringify(config.code);
        GadgetApp.initialize(config);

        if (activeTab) {
          GadgetApp.getEditor().selectFile(activeTab)
        }
        
        if (admin != true) {
          // the only time a gadget is read-only is when an admin
          // is editing a quiz, so they can see hidden files depite 
          // not being in an owner context 
          if (readonly != true) {
            $('.hidden-file-indicator').closest('.tab').hide();
          }

          $('.tab-options-link').hide();
          $('.right-options').hide();
          $('#instructionsActions').hide();
        }

        if (readonly) {
          $('#instructionsActions').hide();
          $('.ace_text-input').attr('readonly', true)
        } else {
          // reveal the reset button
          $('.reset-it').removeClass('hide');
        }

        // hide instructions tab if there aren't any
        if (GadgetApp.getInstructions() || (admin  && !readonly)) {
          GadgetApp.showInstructions();
        } else { 
          $('#codeOutputTab').css('width', '100%');
        }

        if (GadgetApp.getEditor().hasFile('tests.py')) {
          GadgetApp.toggleCheckButton();

          if (!GadgetApp.getInstructions()) {
            GadgetApp.showTestResult();
          }
        }

        // sends an updated gadget
        function sendEdits() {
          var save = {
            id: message.id, 
            type: 'update', 
            data: GadgetApp.toHTML()
          };
          
          console.log("gadget: sending gadget update");
          original.source.postMessage(save, original.origin);
        }

        if (message.edit) {
          var editted = false;
          GadgetApp.onEdit(() => editted = true);
          
          setInterval(() => {
            if (editted) { 
              editted = false;
              sendEdits()
            }
          }, 1000);
        } else if (message.save) {
          $('.save-it').removeClass('hide');

          // add save keyboard shortcut
          GadgetApp.getEditor().addCommand("save", {
            win: "Ctrl-s",
            mac: "Command-s"
          }, () => $('.save-it').click());

          GadgetApp.onEdit(() => { 
            $('.save-it > label').text("Save");
            $('.save-it').removeClass('disabled');
          });
          
          $('.save-it').click(() => {
            $('.save-it')
              .addClass('disabled blue-highlight')
              .css('background-color', '')
              .children('label').text("Saving...");

            sendEdits();
            $('.save-it > label').text("Saved");
          });
        }
      }
    }
  });
});