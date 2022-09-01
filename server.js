const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const Lobby = require('./Lobby/lobby');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const port = 5001;

let usersConnected = 0;
const lobby = new Lobby(io);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  usersConnected++;
  console.log(usersConnected);

  socket.on('disconnect', () => {
    usersConnected--;
    console.log('user disconnected', 'users:', usersConnected);
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
