import $ from 'jquery';
import files from './files';
import renderer from './renderer';
import monitoring from 'monitoring';
import insert_gadget_mods from './insert';
window.monitoring = monitoring; 
// it's expensive to watch for DOM changes, so limit the 
// elements we monitor to the greatest extent possible
monitoring(document).added('#content', content => {
  console.log("loading gadget support ...");

  // add the "Gadget Question" question type and the "Insert Gadget" editor button
  insert_gadget_mods(content);

  // the renderer yields gadgets here for configuration before 
  // call render() when the gadget is ready to render
  renderer(content, (gadget, render) => {

    if (gadget.classList.contains('personal')) {
      console.log("rendering personal gadget");

      if (!gadget.id) {
        console.log("can't render a personal gadget without an id!");
      } else {
        
        gadget.config.admin = true;
        const userContext = `/users/${ENV.current_user.id}`;
        const path = `gadgets/${gadget.id}.gadget`;

        gadget.config.save = app => {
          console.log('saving personal gadget ...');
          
          // we only save the innerHTML of personal gadgets
          const data = app.toElement().innerHTML;

          // must return a promise to the configure script 
          // so it can update interface elements accordingly
          return files.put(userContext, path, data);
        }

        files.get(userContext, path)
          .then(html => gadget.innerHTML = html, console.log)
          .finally(render);
      }

    } else if (gadget.matches('body#tinymce .gadget')) {
      console.log("rendering gadget within tinymce editor");

      gadget.config.admin = true;
      gadget.config.show = 'code';

      gadget.config.edit = app => {
        gadget.innerHTML = app.toElement().innerHTML;
      };

      render();
    
    } else if (gadget.matches('#questions.assessing .gadget')) {
      console.log("rendering gadget within a quiz");

      gadget.config.show = 'instructions';
      const question = $(gadget).closest('.question'); 

      // there are two gadgets, one for the answer one for the question
      // we'll save their changes to the answer textarea, they 
      // don't need to access it directly
      question.find('.answers').hide();
      const input = question.find('.question_input');

      gadget.config.edit = app => {
        // find the tinymce editor for this quesiton
        const editor = tinymce.get(input.attr('id'))
        
        // send the gadget code to the editor and tell it to save
        editor.setContent(app.toHTML());
        tinymce.triggerSave();
      }
            
      // they are continuing this question from a draft
      if (input.val()) {
        const draft = $(input.val()).get(0);
        gadget.innerHTML = draft.innerHTML;
      }

      render();

    } else if (gadget.matches('#questions.assessment_results .gadget')) {
      console.log("rendering gadget in a quiz submission");

      gadget.config.show = 'tests';
      const roles = ENV.current_user_roles;
        
      // instructor grading the quiz
      if (roles.includes("teacher") || roles.includes("admin")) {
        gadget.config.show_tabs = true;

      // student viewing their submission
      } else {
        gadget.config.readonly = true;
      }

      // there are two gadgets, one for the answer one for the question
      // hide the question gadget
      $(gadget).closest('.question').find('.question_text').hide();
      render();
    
    } else if (gadget.matches('#questions.question_editing .gadget')) {
      console.log("rendering gadget in the quiz editor");

      gadget.config.show = 'instructions';
      gadget.config.readonly = true;
      render();
    
    } else if (gadget.matches('#ic-QuizInspector__QuestionInspector .gadget')) {
      console.log("rendering gadget in the activity stream");

      gadget.config.show = 'tests';
      $("button:contains('View HTML')").click();
    
    // nothing special about this gadget
    // render with a default config
    } else {
      render();
    }
  });

  // this stops the document monitor
  return false;
});