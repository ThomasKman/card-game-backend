// Room.js

function Room(name, gamemode) {
  if (!(this instanceof Room)) {
    return new Room();
  }

  this.gamemode = gamemode;
  this.seatCount = 7;
  this.name = name;

  this.users = [];

  // io.on('connection', (socket) => {
  //   socket.on('joinRoom', ({ userName, roomName }) => {
  //     socket.join(roomName);

  //     if (roomName === this.name) {
  //       addUser({ id: socket.id, name: userName });
  //       io.sockets.in(roomName).in('lobby').emit('updateRoom ', this);
  //       console.log(
  //         'update Rooms triggered by room joinRoom' + socket.id.slice(-3)
  //       );
  //     }
  //   });

  //   socket.on('disconnect', () => {
  //     removeUser(socket.id);
  //     io.sockets.in(this.name).in('lobby').emit('updateRoom ', this);
  //     console.log(
  //       'update Rooms triggered by room Disconnect' + socket.id.slice(-3)
  //     );
  //   });
  // });

  // returns users
  Room.prototype.getUsers = function getUsers() {
    return this.users;
  };

  Room.prototype.getMe = function (callback, salutation) {
    callback.call(this, salutation);
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
