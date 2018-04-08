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

// on Intro reception
socket.on('createIntro', function(body){
  const intro = JSON.parse(body);
  jQuery('#api_name').text(intro.credentials[0].name);
  jQuery('#api_email').text(intro.credentials[0].email);
  jQuery('#api_text').text(intro.credentials[0].text);
});

// counters & buttonId
var maxAppend = 0;
var submitButton = jQuery('#yodaBtn');
var messageNumberbox = jQuery('[name=number]');
var optionSelect = jQuery('[name=option]')
// on message reception
socket.on('newMessage', function(message) {
  console.log(message);
  submitButton.removeAttr('disabled').text('Get Data');
  messageNumberbox.val('');
  // set jQuery elements
  var liCol = jQuery('<div class="cards"></div>');
  var li = jQuery('<li></li>');
  liCol.text(`${message}`);
  li.text(`${message}`);
  // append in cards
  if (maxAppend >= 12) {
    jQuery('.cards').remove();
    maxAppend = 0;
    return;
  } else if (maxAppend >= 8) {
    jQuery('#returnInfo2').append(liCol);
    jQuery('#card__figure3').append(li);
    maxAppend++;
    return;
  } else if (maxAppend >= 4) {
    jQuery('#returnInfo1').append(liCol);
    jQuery('#card__figure2').append(li);
    maxAppend++;
    return;
  } else {
    jQuery('#returnInfo').append(liCol);
    jQuery('#card__figure1').append(li);
    maxAppend++;
  }
});

// on form submit
jQuery('#messages').on('submit', function(e) {
  e.preventDefault();

  submitButton.attr('disabled', 'disabled').text('Loading...');

  socket.emit('createMessage', {
    option: optionSelect.val(),
    number: messageNumberbox.val()
  })

});

// on form button reset
jQuery('#resetBtn').on('click', function() {
  // remove cards in the DOM
  jQuery('.cards').remove();
});

// on card click to flip
jQuery('#card1').on('click', function() {
  jQuery('#card1').toggleClass('flipped');
});

jQuery('#card2').on('click', function() {
  jQuery('#card2').toggleClass('flipped');
});

jQuery('#card3').on('click', function() {
  jQuery('#card3').toggleClass('flipped');
});
