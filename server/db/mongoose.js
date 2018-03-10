var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);

mongoose.connect('mongodb://localhost/cards');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {

});



module.exports = {mongoose};
