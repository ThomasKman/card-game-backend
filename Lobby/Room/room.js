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
      if (roomName === name) {
        console.log(userName, roomName);
        addUser({ id: 'loll', name: 'lolol' });

        socket.emit('updateRoom', this);
      }
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
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  };

  const getUser = (id) => users.find((user) => user.id === id);

  const getUsersInRoom = (room) => users.filter((user) => user.room === room);
}
module.exports = Room;
