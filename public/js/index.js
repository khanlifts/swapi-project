var socket = io();

var maxAppend = 0;
// on message reception
socket.on('newMessage', function(message) {
  console.log(message);
  if (maxAppend >= 12) {
    return;
  } else if (maxAppend >= 8) {
    var liRow = jQuery('<div class="row"></div>');
    var liCol = jQuery('<div class="col-1-of-4"></div>');
    liCol.text(`${message}`);
    jQuery('#returnInfo2').append(liCol);
    maxAppend++;
    return;
  } else if (maxAppend >= 4) {
    var liRow = jQuery('<div class="row"></div>');
    var liCol = jQuery('<div class="col-1-of-4"></div>');
    liCol.text(`${message}`);
    jQuery('#returnInfo1').append(liCol);
    maxAppend++;
    return;
  } else {
    var liRow = jQuery('<div class="row"></div>');
    var liCol = jQuery('<div class="col-1-of-4"></div>');
    liCol.text(`${message}`);
    jQuery('#returnInfo').append(liCol);
    maxAppend++;
  }

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
