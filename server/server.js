const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');
const socketIO = require('socket.io');
const swapi = require('swapi-node');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  request(`https://credentials-api.herokuapp.com/credentials`, (err, res, body) => {
    console.log('error:', err);
    console.log('statusCode:', res && res.statusCode);
    socket.emit('createIntro', body);
  });
  // on createMessage
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message.option, message.number);
    // get Info from star wars api
    swapi.get(`http://swapi.co/api/${message.option}/${message.number}/`).then((result) => {
      socket.emit('newMessage', result.name);
  }).catch((err) => {
    console.log(err);
    socket.emit('newMessage', 'Sorry, no info');
    });
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = {app, server};
