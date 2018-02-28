const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const YodaSpeak = require('yoda-speak');
const mashapeAPIKEY = "aw73BlKg3YmshyHqptFJ2su25cIep1lfywbjsnvQsknxXB6lMJ";
var yoda = new YodaSpeak(mashapeAPIKEY);

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
    socket.emit('newMessage', generateMessage(message.text))
    callback();
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

yoda.convert("I'm really happy for you, and I'm going to let you finish, but this is the best Node package of all time.",
function(err, result) {
    if (!err) {
        console.log(result.toString());
    } else {
        console.log('This is the error: ', err);
    }
})
