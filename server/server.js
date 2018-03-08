const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const swapi = require('swapi-node');

// const YodaSpeak = require('yoda-speak');
// const mashapeAPIKEY = "aw73BlKg3YmshyHqptFJ2su25cIep1lfywbjsnvQsknxXB6lMJ";
// var yoda = new YodaSpeak(mashapeAPIKEY);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);

    swapi.get('http://swapi.co/api/people/?page=2').then((result) => {
    console.log(result.results[0].name);
    socket.emit('newMessage', result.results[0].name);

  }).catch((err) => {
    console.log(err);
  });


    // yoda.convert(message.text,
    // (err, result) => {
    //     if (!err) {
    //         socket.emit('newMessage', generateMessage(result.toString()))
    //         callback();
    //         console.log(result.toString());
    //     } else {
    //         console.log('This is the error: ', err);
    //     }
    // })

  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
