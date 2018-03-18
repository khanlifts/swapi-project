const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const swapi = require('swapi-node');

// const {ObjectID} = require('mongodb');
// const {mongoose} = require('./db/mongoose');
// const {Card} = require('./models/card');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // on createMessage
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message.option, message.number);

    swapi.get(`http://swapi.co/api/${message.option}/${message.number}/`).then((result) => {
    console.log('result: ', result.name);

    // save card
    // var card = new Card({
    //   name: result.name
    // });
    //
    // card.save((err, card) => {
    //   if (err) return console.log(err);
    //   console.log(`Saved Card: ${card.name}`);;
    // });

    socket.emit('newMessage', result.name);

  }).catch((err) => {
    console.log(err);
    socket.emit('newMessage', 'Sorry, no info');
  });

  });

  // on resetBtn
  socket.on('resetMessage', () => {
    // Card.remove({}, (err) => {
    //   if (err) return handleError(err);
    // })
    // console.log('Removed all Cards');
  })
});


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
