const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);
    socket.emit('newMessage', {
      text: 'This is from the server',
      createdAt: new Date().getTime()
    })
    callback();
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
