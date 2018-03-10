var mongoose = require('mongoose');

var Card = mongoose.model('Card', {
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  }
});

module.exports = {Card}; 
