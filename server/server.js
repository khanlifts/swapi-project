const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

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
