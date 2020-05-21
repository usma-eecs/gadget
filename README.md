# Gadgets

The Gadget Editor is accessible at https://usma-eecs.github.io/gadget/. 

Gadgets are python editors that can be embedded on a webpage. You must be logged into Canvas first to access your editor. Log in by clicking the **Gadget Editor** link in the course's navigation menu. 

## Configuring Canvas

To render gadgets you must upload `canvas-integration.js` and `canvas-integration.css` to the courses theme. 

## Creating Gadgets

To create a new gadget, click the red "New Gadget Editor" button in any TinyMCE context.

## Gadget Serialization

Gadgets are saved as `div`s with a `pre` for each file in the gadget. Since gadgets are saved in HTML, make sure to [escape HTML characters](https://developer.mozilla.org/en-US/docs/Glossary/Entity), like `<` Here is an example: 

```html
<div class="gadget">
    <pre id="main.py">print(hello world)</pre>
    <pre id="tests.py" class="hidden">import gadget.tests as tests
tests.assertNoErrors()
tests.run()</pre>
    <pre id="instructions.md">Fix the error `main.py`</pre>
</div>
```