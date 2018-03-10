var socket = io();

// particles.js
window.onload = function() {
  Particles.init({
    selector: '.background',
    maxParticles: 10,
    speed: 0.4,
    color: '#fff',
    minDistance: 120
  });
};

// counters
var maxAppend = 0;
var round = 1;
// on message reception
socket.on('newMessage', function(message) {
  console.log(message);
  if (maxAppend >= 12) {
    round =+ 1;
    alert(`Here comes round ${round}`);
    jQuery(".col-1-of-4").remove()
    maxAppend = 0;
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
  var messageNumberbox = jQuery('[name=number]');

  socket.emit('createMessage', {
    option: optionSelect.val(),
    number: messageNumberbox.val()
  }, function () {
    optionSelect.val();
    messageNumberbox.val();
  })

});
