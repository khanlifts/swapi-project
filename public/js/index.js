var socket = io();

socket.on('newMessage', function(message) {
  console.log(message);

  var li = jQuery('<li></li>');
  li.text(`${message}`);
  jQuery('#messages').append(li);
});

jQuery('#messages').on('submit', function(e) {
  e.preventDefault();

  var optionSelect = jQuery('[name=option]')
  var messageTextbox = jQuery('[name=number]');

  socket.emit('createMessage', {
    number: messageTextbox.val(),
    option: optionSelect.val()
  }, function () {
    messageTextbox.val('');
    optionSelect.val('');
  })

});
