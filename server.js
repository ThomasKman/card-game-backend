const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Lobby = require('./Lobby/lobby');

const port = 5001;

// create singleton Session
const session = require('./Session/Session');

// Start Socket Session
session.start(server);

// Create new Game Lobby
const lobby = new Lobby();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
