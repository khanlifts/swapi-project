var socket = io();

socket.on('newMessage', function(message) {
  console.log(message);

  var li = jQuery('<li></li>');
  li.text(`${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#messages').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  })

});
