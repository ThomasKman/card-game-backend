const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const Lobby = require('./Lobby/lobby');
const connection = require('./Connection/connection');

const port = 5001;

const lobby = new Lobby(io);
let connections = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  addConnection(io, socket);
  console.log('user connected,', 'users: ', connections.length);

  socket.on('disconnect', () => {
    removeConnection(socket.id);
    console.log('user disconnected', 'users:', connections.length);
  });

  socket.on('joinRoom', () => {});
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

connections.forEach((connection) => {
  connection.connectionCheck(connection.test);
});

// connection.emitSomeShit('someShit');

const addConnection = (io, socket) => {
  connections.push(new connection(io, socket));
};

const removeConnection = (id) => {
  const index = connections.findIndex((connection) => connection.id === id);
  if (index !== -1) {
    return connections.splice(index, 1)[0];
  }
};
