String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

String.prototype.color = function() {
  var colors = [
    "rosybrown",
    "tomato",
    "black",
    "orange",
    "cornflowerblue",
    "cadetblue",
    "goldenrod",
    "darkred",
    "crimson",
    "chocolate",
    "darkblue",
    "darkgoldenrod",
    "darkcyan",
    "orchid",
    "darkslategrey",
    "darkgreen",
    "darkorange",
    "blue",
    "blueviolet",
    "brown"
  ];
  return colors[Math.abs(this.hashCode()) % 20];
};

requirejs(["jquery","url-join"], function(jquery,urljoin) { 
  // message bus is not an AMD module and insists that jquery be loaded first
  requirejs(["message-bus"], function() {
    var badge = function(user) {
      return $('<span/>')
        .text(user.replace('.',' '))
        .addClass('user badge badge-dark')
        .css('background-color', user.color());
    };
    
    var addUser = function(message) {
      if ($("#users>span:contains('"+message.user+"')").length==0) {
        $('#users').append(badge(message.user));
        $('#users').append($('<br/>'));
      }
    };
    
    var addMessage = function(message) {
      $('#messages').append($('<div/>')
        .addClass('.message')
        .append(badge(message.user))
        .append($('<span/>')
          .addClass('text')
          .html(message.text)
        )
      );
      
      // auto-scroll
      $("#messages").stop().animate({ 
        scrollTop: $('#messages').prop("scrollHeight")
      }, 1000);
    };
    
    $(document).ready(function() {
      MessageBus.baseUrl = '/';
      var path = window.location.pathname;
      var room = path.substr(path.lastIndexOf('/') + 1);
      
      $('input').keypress(function(e) {
        if($(this).val().length > 0 && e.which == 13) {
          $.post(urljoin(path,"chat"), { text: $(this).val() });
          $(this).val('');
        }
      });
      
      MessageBus.subscribe(urljoin(room,"chat"), addMessage);
      MessageBus.subscribe(urljoin(room,"enter"), addUser);
      
      $.post(urljoin(path,"enter"), function(room) {      
        $(room.users).each(function(i,user) {
          addUser({user: user});
        });
        
        $(room.messages).each(function(i,message) {
          addMessage(message);
        });
      });
    });
  });
});
