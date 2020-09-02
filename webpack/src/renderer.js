import $ from 'jquery';
import monitoring from './monitoring';
import gadget_html from 'raw-loader!./gadget.html';

// TODO: remove jseval when eval'ing main
export default (target, configure) => {
  const monitor = monitoring(target, {iframes: true});

  // this resize observer monitors gadget divs and resizes 
  // their respective iframes to be the same size 
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const gadget = entry.target;

      if (gadget.config && gadget.config.iframeElement) {
        const offsets = $(gadget).offset();

        $(gadget.config.iframeElement).css({
          'z-index': 10,
          top: offsets.top, 
          left: offsets.left,
          width: entry.contentRect.width, 
          height: entry.contentRect.height
        });
      }
    });
  });

  console.log("renderer loaded");

  monitor.appeared("div.gadget", gadget => {
    // the gadget has already been rendered, so just show it
    if (gadget.config) {
      $(gadget.config.iframeElement).show();
      $(gadget.config.iframeElement).css({'z-index': 10});
    } else {
      gadget.config = {};
    
      const iframe = $('<iframe>', {
        frameborder: 0,
        marginwidth: 0,
        marginheight: 0,
        class: 'gadget',
        allowfullscreen: true
      })

      // make the gadget the same size as the iframe
      $(gadget).children().hide();
      $(gadget).css({ height: 350, width: '100%', margin: 0 }).show();

      // place the iframe over the gadget div
      const offsets = $(gadget).offset();

      iframe.css({ 
        'z-index': 10,
        top: offsets.top, 
        left: offsets.left,
        position: 'absolute'
      });

      // make sure the gadgets and its iframe can find each other
      const iframeElement = iframe[0];
      iframeElement.gadget = gadget;

      // pass the gadget to the user for configuration
      gadget.config.iframeElement = iframeElement;
      
      // keep gadget rendering as synchronous as possible to prevent 
      // rendering the same gadget twice, hence the callback
      configure(gadget, () => {

        // the iframe has to live somewhere in the DOM, so we just 
        // append it to the owning document. We don't append it to 
        // the body of the document because we don't want it to appear
        // in the HTML source of the tinymce editor
        gadget.ownerDocument.documentElement.appendChild(iframeElement);

        // the iframe floats atop the gadget div, the resize observer
        // keeps it there
        resizeObserver.observe(gadget)

        // the iframe contents are inserted dynamically so we don't trigger
        // any cross-domain protections and this iframe can access canvas
        iframeElement.contentDocument.open('text/htmlreplace');
        iframeElement.contentDocument.write(gadget_html);
        iframeElement.contentDocument.close();
      });
    }
  });

  // when a gadget is removed, remove its respective iframe
  monitor.removed("div.gadget", gadget => {      
    if(gadget.config) {
      $(gadget.config.iframeElement).remove();
      gadget.config = null;
    }
  });

  // when a gadget is hidden, hide its respective iframe
  monitor.disappeared("div.gadget", gadget => {
    if(gadget.config) {
      $(gadget.config.iframeElement).hide();
    }
  });
}