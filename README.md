# Canvas Gadgets

[Click here for a demo](https://usma-eecs.github.io/gadget/)

Gadgets let students create, run, and test Python programs in their browser. Gadgets run [Skulpt](https://skulpt.org/), a Javascript implementation of Python 3 and is specifically designed to run in the Canvas LMS. 

![](https://i.imgur.com/mL5pKlv.png)

## Configuring Canvas

The gadget renderer must be executed on every page containing a gadget. The easiest way to do this in Canvas is to add the renderer script to your school's theme. 

Go to *Admin* -> *Themes* and open your school's theme in the Theme Editor. Click the *Upload* tab. Create a new JavaScript file with the code below or add it to your existing JavaScript file: 

```javascript
$.getScript('https://usma-eecs.github.io/gadget/canvas/gadget.bundle.js');
```

Create a new CSS file with the code below or add it to your existing CSS file: 

```css
@import url("https://usma-eecs.github.io/gadget/canvas/gadget.css");
```

You will also need to copy the `templates` folder in this repo to your *Course Files* directory in Canvas. If you cloned the course from an old Gadget-enabled course, then it should already be there. **Note**: It is important that the folder is names `templates`. 

## Gadget serialization

Gadgets are serialized as an HTML `<div>` with the `gadget` class. Each file in the editor is saved in a `<pre>`. Here's an example: 

```html
<div class="personal gadget">
  <pre id="main.py"># every gadget must have a main.py</pre>
  <pre id="instructions.md">
    # Instructions
    An instructions tab will appear with HTML instructions rendered from markdown
  <pre id="tests.py">
    # put unit tests in tests.py
  </pre>
  <pre id="secret.py" class="hidden">
    # any file with the hidden class is only visible when editing the gadget
  </pre>
</div>
```

## Personal gadgets

Personal gadgets can be customized and saved on a per-user basis. Each user will get a copy of the personal gadget in their personal Canvas files area under the `gadget` folder. To make a gadget a personal gadget, add the `personal` class to the gadget `<div>` like so: 

```html
<div class="personal gadget">
  <pre id="main.py"># this is your personal gadget!</pre>
</div>
```

## Building the Canvas integration bundle

To update `gadget.bundle.js`, install Node 14.6.0 or greater and run the following: 

```bash
$ cd webpack
$ npm install
$ npx webpack 
```

This will pack everything in `webpack/src` and any dependecies in `webpack/package.json` into a bundle in the `canvas` directory in the project root. 

## How do gadgets work? 

When your school's theme is loaded, the gadget renderer is executed. It uses the [`monitoring`](https://www.npmjs.com/package/monitoring) library to monitor for `<div class="gadgets">` on the page. When it finds one, it instantiates a new `<iframe>` outside the `document.body`. The iframe is here so that it isn't saved into the TinyMCE editor and it is outside the area being monitored for new gadgets for performance.  

The iframe contains the actual gadget editor, which lives in this repository. Since the iframe needs to access Canvas (to read and write gadgets) we need a way to get around cross-origin restrictions. Previous iterations of the gadget used the [postMessage protocol](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), but that was complicated and couldn't reliably save. Instead, the iframe is created with no `src` and its contents are dynamically inserted from [a template](webpack/src/gadget.html) using JavaScript. The template has a `base_uri` that points to this repo where all of its dependent code is loaded from. If Canvas ever tightens up their [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), this could very well break. 

Once the iframe is loaded, it places itself over its respective gadget `<div>` and continually monitors the `<div>` so its size and location match the `<div>`'s. Note that the renderer only instantiates iframes for gadgets that are actually visible on the screen. This makes page loading much faster and is freindlier to LockDown browser, but does cause a noticeable delay in the rendering of gadgets. 

As edits are made to the code, changes are saved back to the original gadget `<div>` (with about a 1 second debounce). 
