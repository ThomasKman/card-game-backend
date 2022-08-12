const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const port = 5001;

let usersConnected = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  usersConnected++;
  console.log(
    'a user connected',
    socket.id.slice(-3),
    ' - users:',
    usersConnected
  );

  socket.on('disconnect', () => {
    usersConnected--;
    console.log(
      'user disconnected',
      socket.id.slice(-3),
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
  console.log(`Example app listening on port ${port}`);
});
