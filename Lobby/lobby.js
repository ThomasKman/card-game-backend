const Room = require('./Room/room');
const session = require('../Session/Session');

// lobby.js
function Lobby(connection) {
  if (!(this instanceof Lobby)) {
    return new Lobby();
    this.connection = connection;
  }

  const rooms = [];

  // io.on('connection', (socket) => {
  //   socket.emit('updateRooms', getRooms());
  //   socket.join('lobby');

  //   socket.on('createRoom', (roomName) => {
  //     addRoom(roomName, 'arnus');
  //   });

  //   socket.on('joinRoom', ({ userName, roomName }) => {
  //     user = {
  //       id: socket.id,
  //       userName: userName,
  //       roomName: roomName,
  //     };

  //     io.emit('updateRooms', getRooms());
  //     console.log('update Rooms triggered by join room ' + socket.id.slice(-3));
  //   });
  // });

  const addRoom = (name, gamemode) => {
    name = format(name);

    const existingRoom = rooms.find((room) => room.name === name);

    if (existingRoom) {
      return { error: 'Room Name is taken' };
    }

    const room = new Room(name, gamemode, connection);
    rooms.push(room);

    return rooms;
  };

  const removeRoom = (name) => {
    name = format(name);

    const index = rooms.findIndex((room) => room.name === name);
    if (index !== -1) {
      return rooms.splice(index, 1)[0];
    }
  };

  const getRooms = () => {
    return rooms;
  };

  Lobby.prototype.getRoomerinos = function getRoomerinos() {
    return rooms;
  };

  const getRoom = (name) => {
    name = format(name);
    return rooms.find((room) => room.name === name);
  };

  const format = (str) => str.trim().toLowerCase().replace(' ', '_');
}
module.exports = Lobby;
