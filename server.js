const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const port = 5001;

let usersConnected = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  usersConnected++;
  console.log(
    'a user connected'
    ' - users:',
    usersConnected
  );

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    console.log('user ' + user.name + ' has joined room: ' + user.room);

    callback();
  });

  socket.on('disconnect', () => {
    usersConnected--;
    console.log(
      'user disconnected',
      getUser(socket.id).name,
      ' - users:',
      usersConnected
    );
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg + ' ' + socket.id.slice(-3));
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
