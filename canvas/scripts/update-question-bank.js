var unpackUpdate = (update, div) => { 
  
  $('pre', div).remove();
  var config = JSON.parse(atob(update));

  JSON.parse(config.code).forEach(file => {
    var pre = $('<pre/>')
      .html(file.content)
      .attr('id', file.name)
      .hide();

    if (file.hidden) {
      pre.addClass("hidden");
    }

    $(div).append(pre);
  });

  if (config.description) {
    $(div).append(
      $('<pre/>')
        .text(config.description)
        .attr('id', 'instructions.md')
    );
  }
}

var data = "a abse64 encoded gadget string goes here"
var div = $('<div class="gadget"></div>').get(0);

unpackUpdate(data, div);

console.log("===================================");
console.log(div);
console.log("===================================");