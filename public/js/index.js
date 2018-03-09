var socket = io();

var maxAppend = 0;
// on message reception
socket.on('newMessage', function(message) {
  console.log(message);

  var li = jQuery('<div class="col-1-of-3"><li></li></div>');
  li.text(`${message}`);
  if (maxAppend % 3 == 0) return;
  jQuery('#returnInfo').append(li);
  maxAppend++;
});

// on form submit
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
