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
      return GadgetApp.toElement().outerHTML;
    },

    // returns a detached element representing the gadget
    toElement: function() {
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

      $(gadget).children().hide();
      return gadget.get(0);
    },
    getInstructions: function() {
      return this._gadget.description
    },

    onEdit: function(callback, wait=250) {
      if (wait) {
        // wait for a quarter-second pause to send edits
        var edited = false;
        var lastEdit = null;

        var editMade = () => {
          edited = true;
          lastEdit = Date.now();
        }
        
        setInterval(() => {
          if (edited && (Date.now() - lastEdit) > wait) {
            edited = false;
            lastEdit = Date.now();
            callback(GadgetApp);
          }
        }, 500);
      } else {
        var editMade = callback;
      }

      $('#save-instructions').click(editMade);
      $(document).on("gadget.resetted", editMade);
      $(document).on("gadget.code.change", editMade);
    }
  });

  $("[data-action='code.debug']").click(() => {
    var fileName = GadgetApp.getEditor().activeTab().fileName;
    var code = encodeURIComponent(GadgetApp.getEditor().getFile(fileName));
    window.open("http://pythontutor.com/visualize.html#mode=edit&code="+code, 'debugger');
    return false;
  });

  var activeTab = false;
  var gadget = window.frameElement.gadget;

  // the config is what we expose to the canvas integration script
  // that controls high-level configuration parameters, like admin
  var config = gadget.config;
  
  GadgetApp._gadget = {
    code: [],
    description: '',
    settings: { role: config.admin ? 'owner' : 'guest' }
  };

  $(gadget).children('pre').each((i,pre) => {
    if (pre.id == 'instructions.md') {
      GadgetApp._gadget.description = pre.textContent;
    } else {
      GadgetApp._gadget.code.push({
        name: pre.id,
        content: pre.textContent,
        hidden: pre.classList.contains('hidden')
      });
    }
    if (pre.classList.contains('active')) {
      // don't reveal a hidden active tab unless they're admin
      if (!config.admin && pre.classList.contains('hidden')) {
        activeTab = pre.id;
      }
    }
  });

  GadgetApp._gadget.code = JSON.stringify(GadgetApp._gadget.code);
  GadgetApp._original = GadgetApp._gadget;
  GadgetApp.reset(GadgetApp._gadget);

  if (activeTab) {
    GadgetApp.getEditor().selectFile(activeTab)
  }
  
  if (!config.admin) {
    $('.tab-options-link').hide();
    $('.right-options').hide();
    $('#instructionsActions').hide();

    if (!config.show_tabs) {
      $('.hidden-file-indicator').closest('.tab').hide();
    }
  }

  if (config.readonly) {
    $('#instructionsActions').hide();
    $('.ace_text-input').attr('disabled', true)
  } else {
    // reveal the reset button
    $('.reset-it').removeClass('hide');
  }

  // hide instructions tab if there aren't any
  if (GadgetApp.getInstructions() || (config.admin && !config.readonly)) {
    GadgetApp.showInstructions();
  } else { 
    $('#codeOutputTab').css('width', '100%');
  }

  if (config.edit) {
    GadgetApp.onEdit(config.edit);
  }

  // config.save MUST return a Promise so that we can
  // update the interface
  if (config.save) {
    $('.save-it').removeClass('hide');

    // add save keyboard shortcut
    GadgetApp.getEditor().addCommand("save", {
      win: "Ctrl-s",
      mac: "Command-s"
    }, () => $('.save-it').click());

    var onEdit = () => { 
      $('.save-it > label').text("Save");
      $('.save-it').removeClass('disabled');
    }

    GadgetApp.onEdit(onEdit, 0);
    
    $('.save-it').click(() => {
      $('.save-it')
        .addClass('disabled blue-highlight')
        .css('background-color', '')
        .children('label').text("Saving...");

      var success = () => {
        $('.save-it > label').text("Saved");
      };

      var failure = () => {
        $('.save-it').removeClass('disabled');
        $('.save-it > label').text("Error");
        $('.save-it').removeClass('blue-highlight');
        $('.save-it').css('background-color', 'red')
      };

      config.save(GadgetApp).then(success, failure);
    });
  }

  if (GadgetApp.getEditor().hasFile('tests.py')) {
    GadgetApp.toggleCheckButton();
  }

  if (config.show) {
    if (config.show  == "code") {
      GadgetApp.showCode();
    } else if (config.show == "tests" && GadgetApp.getEditor().hasFile('tests.py')) {
      $('#editor').trigger("gadget.code.check");
    } else if (config.show == "instructions" && GadgetApp.getInstructions()) {
      GadgetApp.showInstructions();
    } else {
      console.log("unknown value for gadget.config.show: '" + config.show + "'");
    }
  } else if (GadgetApp.getInstructions()) {
    GadgetApp.showInstructions();
  } else {
    GadgetApp.showCode();
  }
});