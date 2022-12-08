const { Server } = require('socket.io');

class Session {
  constructor() {
    this.sockets = [];
    this.io = null;
    console.log('session started');
  }

  // Starts the server and updates list of sockets when user joins

  start(server) {
    this.io = new Server(server);

    this.io.on('connection', async (socket) => {
      this.sockets = await this.io.fetchSockets();
      console.log('user connected,', 'users: ', this.sockets.length);
      console.log(socket.id);

      socket.on('disconnect', async () => {
        this.sockets = await this.io.fetchSockets();
        console.log('user disconnected', 'users:', this.sockets.length);
      });
    });
  }

  // Listens for data from frontend
  listen(keyword, callback) {
    if (this.io == null) {
      console.log(
        'socket connection is not established could not listen for keyword: ' +
          keyword
      );
    } else {
      this.io.on('connection', async (socket) => {
        socket.on(keyword, (text) => {
          callback(text, socket.id);
        });
      });
    }
  }

  // Emit data to Sockets
  // data object structure {level,socket,room}
  // level options: io, socket, room
  // socket = socket.id , room= roomName
  emit(keyword, data, adress) {
    if (this.io == null) {
      console.log(
        'socket connection is not established could not emit data on channel: ' +
          keyword
      );
    } else {
      // emit to all sockets
      if (adress.level === 'io') {
        this.io.emit(keyword, data);
      }
      // emit to specific socket
      else if (adress.level === 'socket') {
        const socket = this.sockets.find(
          (socket) => socket.id === adress.socket
        );
        socket.emit(keyword, data);
      }
      // emit to specific room
      else if (adress.level === 'room') {
        this.io.sockets.in(adress.room).emit(keyword, data);
      }
      // emit to specific room in Lobby
      else if (adress.level === 'lobbyroom') {
        this.io.sockets.in(adress.room).in('lobby').emit(keyword, data);
      }
    }
  }
}

module.exports = new Session();

// callback example please delete
// const testFuntion = (text, id) => {
//   console.log(text);
//   session.emit('test', 'lol iks deh', { level: 'io' });
//   session.emit('test', 'roflmao', { level: 'socket', socket: id });
// };
