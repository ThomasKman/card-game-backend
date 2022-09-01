const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const Deck = require('./Deck/deck');
const Lobby = require('./Lobby/lobby');

const port = 5001;

let usersConnected = 0;
const deck = new Deck();
const lobby = new Lobby();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  usersConnected++;
  console.log('a user connected ', usersConnected, ' - users:', usersConnected);

  socket.on('joinLobby', () => {
    console.log(socket.id + ' joined lobby');
    io.emit('updateRooms', lobby.getRooms());
  });

  socket.on('join', ({ userName, roomName }, callback) => {
    console.log(userName, roomName);
    const { error, user } = addUser({
      id: socket.id,
      userName: userName,
      roomName: roomName,
    });

    if (error) return callback(error);

    socket.join(user.roomName);

    console.log('user ' + user.userName + ' has joined room: ' + user.roomName);

    io.to(user.roomName).emit('updateRoom', lobby.getRoom(user.roomName));

    callback();
  });

  socket.on('disconnect', () => {
    usersConnected--;
    console.log('user disconnected', 'users:', usersConnected);
  });

  socket.on('createRoom', (roomName) => {
    lobby.addRoom(roomName, 'arnus');
    io.emit('updateRooms', lobby.getRooms());
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
