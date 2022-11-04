function Connection(io, socket) {
  if (!(this instanceof Connection)) {
    return new Connection();
  }

  this.io = io;
  this.socket = {};
  this.id = socket.id;

  // event basiert

  // observer pattern

  // callbacks sind anti OOP

  // liste von sockets, user haben socket ID

  // io.fetchsockets() -> lists all sockets

  // basic functions ->
  // listener(socketID??, keyword,function)?
  // emitter (socketID,keyword, object)

  Connection.prototype.getID = function getID() {
    return this.id;
  };

  io.on('connection', (socket) => {
    this.socket = socket;
    console.log(this.socket.id);
  });

  socket.on('test', (text) => {
    console.log('test: ', text, ' ', socket.id);
  });

  Connection.prototype.test = function test(test) {
    console.log(test);
  };

  Connection.prototype.doSomething = function doSoemthing(callback) {
    callback('testotesto');
  };

  Connection.prototype.connectionCheck = function connectionCheck(callback) {
    io.on('connection', (socket) => {
      callback(socket.id + 'lol');
    });
  };

  Connection.prototype.emitTest = function emitTest(callback) {
    io.on('connection', (socket) => {
      socket.on('socketTest', (text) => {
        this.emitSomeShit(text);
      });
    });
  };

  Connection.prototype.emitSomeShit = function emitSomeShit(someShit) {
    io.on('connection', (socket) => {
      socket.on('test', ({ someShit }) => {
        socket.emit('test', someShit);
      });
    });
  };
}
module.exports = Connection;
