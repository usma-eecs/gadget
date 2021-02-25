import files from './files';
import monitoring from 'monitoring';

// add the "Gadget Question" question type and the "Insert Gadget" editor button
export default target => {
  const monitor = monitoring(target);

  // add the "Gadget Question" type to the quiz editor
  monitor.added('.question_holder', holder => {
    monitoring(holder).added('select.question_type', select => {
      const question = $(select).closest('.question');
      const content = question.find('.question_content');
      const option = $("<option value='essay_question'>Gadget Question</option>");

      // the editor might not be instantiated yet, so we can't check its DOM 
      // for gadget object. Instead, we'll just scan the pre-exisiting content
      // for a div that the word gadget in its opening tag somewhere
      if (content.val().match('<div[^<]+gadget[^<]+>') != null) {
        option.attr('selected', true);
      }

      $(select).append(option).change(() => {
        if ($(select).find('option:selected').text() == 'Gadget Question') {
          files.get(`courses/${ENV.COURSE_ID}`, 'templates/quiz.gadget').then(gadget => {
            tinymce.get(content.attr('id')).rceWrapper.insert_code(gadget)
          });
        }
      });

      // stop monitoring this holder
      return false;
    });
  });

  // add the "Insert Gadget" editor button 
  monitor.added('.tox-tinymce', editor => {
    
    tinymce.get(0).ui.registry.addButton("additem", {
      text: "Add item",
      onAction: () => alert("clci")
    });    
    

    const button = $("<button>", { 
        type: "button",
        title: "Insert Gadget Editor",
        tabindex: "-1",
        class: 'tox-tbtn',
        "aria-label": "Insert Gadget Editor"
      }).append($("<img>", { 
        src: 'https://i.imgur.com/V88UPuK.png'
      })
    );

    button.on('click', () => {
      let template = 'templates/student.gadget';
      const roles = ENV.current_user_roles;

      // this is a quiz question
      if ($(editor).closest('.question').length) {
        template = 'templates/quiz.gadget';
      } else if (roles.includes("teacher") || roles.includes("admin")) {
        template = 'templates/teacher.gadget';
      }

      files.get(`courses/${ENV.COURSE_ID}`, template).then(gadget => 
        tinymce.activeEditor.rceWrapper.insert_code(gadget)
      );
    });

    // add the gadget button as the very last icon in the toolbar
    $(editor)
      .find('.tox-toolbar__primary > div:last-child')
      .prepend(button);
  });
}