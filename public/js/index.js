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

// counters & buttonId
var maxAppend = 0;
var round = 1;
var submitButton = jQuery('#yodaBtn');
var messageNumberbox = jQuery('[name=number]');
// on message reception
socket.on('newMessage', function(message) {
  console.log(message);
  submitButton.removeAttr('disabled').text('Get Data');
  messageNumberbox.val('');

  // append in deck
  if (maxAppend < 4) {
    var li = jQuery('<li></li>');
    li.text(`${message}`);
    jQuery('#deck1').css('visibility', 'visible');
    jQuery('#deck1').append(li);
  } else if (maxAppend < 8) {
    var li = jQuery('<li></li>');
    li.text(`${message}`);
    jQuery('#deck2').css('visibility', 'visible');
    jQuery('#deck2').append(li);
  } else if (maxAppend < 12) {
    var li = jQuery('<li></li>');
    li.text(`${message}`);
    jQuery('#deck3').css('visibility', 'visible');
    jQuery('#deck3').append(li);
  }

  // append in cards
  if (maxAppend >= 12) {
    round =+ 1;
    alert(`Here comes round ${round}`);
    jQuery('.cards').remove();
    maxAppend = 0;
    return;
  } else if (maxAppend >= 8) {
    var liCol = jQuery('<div class="cards"></div>');
    liCol.text(`${message}`);
    jQuery('#returnInfo2').append(liCol);
    maxAppend++;
    return;
  } else if (maxAppend >= 4) {
    var liCol = jQuery('<div class="cards"></div>');
    liCol.text(`${message}`);
    jQuery('#returnInfo1').append(liCol);
    maxAppend++;
    return;
  } else {
    var liCol = jQuery('<div class="cards"></div>');
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

  submitButton.attr('disabled', 'disabled').text('Loading...');

  socket.emit('createMessage', {
    option: optionSelect.val(),
    number: messageNumberbox.val()
  })

});

// on form button reset
jQuery('#resetBtn').on('click', function() {
  console.log('resetBtn fired on click');

  // remove cards in the DOM
  jQuery('.cards').remove();
  maxAppend = 0;

  // temporarily commenting out the delete process of db
  // socket.emit('resetMessage', {});
});

// on deck button reset
jQuery('#deckBtn1').on('click', function() {
  console.log('deckBtn1 fired');
  jQuery('#deck1').css('visibility', 'hidden').text('');
});

jQuery('#deckBtn2').on('click', function() {
  console.log('deckBtn2 fired');
  jQuery('#deck2').css('visibility', 'hidden').text('');
});

jQuery('#deckBtn3').on('click', function() {
  console.log('deckBtn3 fired');
  jQuery('#deck3').css('visibility', 'hidden').text('');
});

// on card click to flip
jQuery('#card').on('click', function() {
  console.log('flipped card');
  jQuery('#card').toggleClass('flipped');
});