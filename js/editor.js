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

  $('#edit-instructions-link').click(() => taint = true);
  $('#save-instructions').click(() => taint = true);

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
        if (config.description == '') {
          $('#codeOutputTab').css('width', '100%');
        } else { 
          GadgetApp.showInstructions();
        }

        if (fileFor("tests.py")) {
          GadgetApp.toggleCheckButton();
          // $('#editor').trigger("gadget.code.check");
        }
        
        if (config.settings.activeTab) {
          GadgetApp.getEditor().selectFile(config.settings.activeTab);
        }

        if (message.send_updates) {
          var tainted = false;
          GadgetApp.onChange(() => tainted = true);

          setInterval(() => {
            if (tainted) { 
              console.log("gadget: gadget changing, sending update ...");
              tainted = false;
              var data = GadgetApp.getAsDataURL();
              var update = {id: message.id, type: 'update', data: data};
              original.source.postMessage(update, original.origin);
            }
          }, 1000);
        }
      }
    }
  });
});
