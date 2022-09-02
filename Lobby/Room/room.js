// Room.js

function Room(name, gamemode, io) {
  if (!(this instanceof Room)) {
    return new Room();
    this.io = io;
  }

  this.gamemode = gamemode;
  this.seatCount = 7;
  this.name = name;

  this.users = [];

  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ userName, roomName }) => {
      socket.join(roomName);

      if (roomName === this.name) {
        addUser({ id: socket.id, name: userName });
        io.sockets.in(roomName).in('lobby').emit('updateRoom', this);
      }
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
      io.sockets.in(this.name).in('lobby').emit('updateRoom', this);
    });
  });

  // returns users
  Room.prototype.getUsers = function getUsers() {
    return this.users;
  };

  const addUser = ({ id, name }) => {
    name = name.trim();

    const user = { id, name };
    this.users.push(user);

    return { user };
  };

  const removeUser = (id) => {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  };

  const getUser = (id) => users.find((user) => user.id === id);
}
module.exports = Room;
