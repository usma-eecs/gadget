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
          .text(file.editor.getValue());

        if (file.hidden) {
          pre.addClass("hidden");
        }

        if (!file.hidden && file.name == active) {
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

      return gadget.get(0).outerHTML;
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

  // render options are data tags on the iframe
  // the "!= undefined" is so we can check admin == false
  // when it's undefined and get the expected result
  var url = $(window.frameElement).data('url');
  var save = $(window.frameElement).data('save') != undefined;
  var admin = $(window.frameElement).data('admin') != undefined;
  var autosave = $(window.frameElement).data('autosave') != undefined;
  var readonly = $(window.frameElement).data('readonly') != undefined; 

  $.get(url)
    .fail(error => {
      alert('Error: ' + error.statusText + '. See console for details.');
    })
    .done(html => {
      var gadget = $(html);
      var activeTab = false;;
      
      var config = {
        code: [],
        description: '',
        settings: { role: admin ? 'owner' : 'guest' }
      };

      gadget.children('pre').each((i,pre) => {
        if (pre.id == 'instructions.md') {
          config.description = pre.textContent;
        } else {
          config.code.push({
            name: pre.id,
            content: pre.textContent,
            hidden: pre.classList.contains('hidden')
          });
        }
        if (pre.classList.contains('active')) {
          // don't reveal a hidden active tab unless they're admin
          if (!admin && pre.classList.contains('hidden')) {
            activeTab = pre.id;
          }
        }
      });

      config.code = JSON.stringify(config.code);

      GadgetApp._gadget = config;
      GadgetApp._original = config;
      GadgetApp.reset(config);

      if (activeTab) {
        GadgetApp.getEditor().selectFile(activeTab)
      }
      
      if (admin == false) {
        // the only time a gadget is read-only is when an admin
        // is editing a quiz, so they can see hidden files despite 
        // not being in an owner context 
        if (readonly == false) {
          $('.hidden-file-indicator').closest('.tab').hide();
        }

        $('.tab-options-link').hide();
        $('.right-options').hide();
        $('#instructionsActions').hide();
      }

      if (readonly) {
        $('#instructionsActions').hide();
        $('.ace_text-input').attr('disabled', true)
      } else {
        // reveal the reset button
        $('.reset-it').removeClass('hide');
      }

      // hide instructions tab if there aren't any
      if (GadgetApp.getInstructions() || (admin && !readonly)) {
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

      function saveChanges() {
        $.post(
          window.parent.location.pathname, 
          GadgetApp.toHTML()
        ).done(
          () => $('.save-it > label').text("Saved")
        ).fail(error => {
            console.log(error.responseText);
            $('.save-it').removeClass('disabled');
            $('.save-it > label').text("Error");
            $('.save-it').removeClass('blue-highlight');
            $('.save-it').css('background-color', 'red')
          });
      }

      if (autosave == true) {
        var editted = false;
        GadgetApp.onEdit(() => editted = true);
        
        setInterval(() => {
          if (editted) { 
            editted = false;
            saveChanges();
          }
        }, 1000);
      } else if (save == true) {
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

          saveChanges();
        });
      }
    });
});