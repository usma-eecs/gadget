$(document).ready(function() {
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

  var fileFor = function(name) {
    var files = GadgetApp.getEditor()._files;
    return files.find(file => file.name == name);
  };

  $("[data-action='code.debug']").click(function() {
    var fileName = GadgetApp.getEditor().activeTab().fileName;
    var code = encodeURIComponent(fileFor(fileName).editor.getValue());
    window.open("http://pythontutor.com/visualize.html#mode=edit&code="+code, 'debugger');
    return false;
  });

  var ua = window.navigator.userAgent;
  var is_ie = /MSIE|Trident/.test(ua);

  if ( is_ie ) {
      $('#badBrowser').foundation("reveal", "open");
  }

  // receive editor updates
  var messages = {};

  $(window).on('message', event => {
    var original = event.originalEvent;
    var message = original.data;
    
    original.source.postMessage({id: message.id, type: 'ack'}, original.origin);

    if (messages[message.id]) {
      console.log("gadget: received duplicate " + message.type + " message " + message.id);
    } else {
      messages[message.id] = true;
      console.log("gadget: received " + message.type + " message " + message.id);

      if (message.type == 'init') {
        var config = JSON.parse(atob(message.data))
        
        GadgetApp._gadget = config;
        GadgetApp._original = config;
        GadgetApp.reset(config);

        var admin = config.settings.role == 'owner';
        
        if (admin == false) {
          // the only time a gadget is read-only is when an admin 
          // is editing a quiz (but not this gadget). So they can 
          // see the hidden files even depite being in guest context 
          if (config.settings.readonly != true) {
            $('.hidden-file-indicator').closest('.tab').hide();
          }

          $('.tab-options-link').hide();
          $('.right-options').hide();
          $('#instructionsActions').hide();
        }

        if (config.settings.readonly) {
          $('#instructionsActions').hide();
          $('.ace_text-input').attr('readonly', true)
        } else {
          // reveal the reset button
          $('.reset-it').removeClass('hide');
        }

        // hide instructions tab if there aren't any
        if (config.description == '' && !(admin  && !config.settings.readonly)) {
          $('#codeOutputTab').css('width', '100%');
        } else { 
          GadgetApp.showInstructions();
        }

        if (fileFor("tests.py")) {
          GadgetApp.toggleCheckButton();

          if (config.description == '') {
            $('#editor').trigger("gadget.code.check");
          }
        }
        
        if (config.settings.activeTab) {
          GadgetApp.getEditor().selectFile(config.settings.activeTab);
        }

        // send updates on change
        if (config.settings.send_updates) {
          if (config.settings.send_updates == 'on_change') {
            var changed = false;
            
            $('#save-instructions').click(() => changed = true);
            $(document).on("gadget.resetted", () => changed = true);
            $(document).on("gadget.code.change", () => changed = true);
            
            setInterval(() => {
              if (changed) { 
                changed = false;
                var data = GadgetApp.getAsDataURL();
                var update = {id: message.id, type: 'update', data: data};
                
                console.log("gadget: change detected, sending update ...");
                original.source.postMessage(update, original.origin);
              }
            }, 1000);
          } 

          else if (config.settings.send_updates == 'on_save') {
            $('.save-it').removeClass('hide');

            // add save keyboard shortcut
            GadgetApp.getEditor().addCommand("save", {
              win: "Ctrl-s",
              mac: "Command-s"
            }, () => $('.save-it').click());

            var changed = function() { 
              $('.save-it > label').text("Save");
              $('.save-it').removeClass('disabled');
            };

            $('#save-instructions').click(changed);
            $(document).on("gadget.resetted", changed);
            $(document).on("gadget.code.change", changed);
            
            $('.save-it').click(() => {
              $('.save-it')
                .addClass('disabled blue-highlight')
                .css('background-color', '')
                .children('label').text("Saving...")
              
              var tab = GadgetApp.getEditor().activeTab().fileName;
              GadgetApp._gadget.settings.activeTab = tab;
              
              var data = GadgetApp.getAsDataURL();
              var update = {id: message.id, type: 'update', data: data};
              
              console.log("gadget: save requested, sending update ...");
              original.source.postMessage(update, original.origin);
              
              $('.save-it > label').text("Saved");
            });
          }

          else {
            console.log("gadget: unknown value for config.settings.send_updates: ", config.settings.send_updates);
          }
        }
      }
    }
  });
});