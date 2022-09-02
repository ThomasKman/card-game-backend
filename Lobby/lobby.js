const Room = require('./Room/room');

// lobby.js
function Lobby(io) {
  if (!(this instanceof Lobby)) {
    return new Lobby();
    this.io = io;
  }

  const rooms = [];

  io.on('connection', (socket) => {
    io.emit('updateRooms', getRooms());
    socket.join('lobby');

    socket.on('createRoom', (roomName) => {
      addRoom(roomName, 'arnus');
    });

    socket.on('joinRoom', ({ userName, roomName }) => {
      user = {
        id: socket.id,
        userName: userName,
        roomName: roomName,
      };

      io.emit('updateRooms', getRooms());
    });
  });

  const addRoom = (name, gamemode) => {
    name = format(name);

    const existingRoom = rooms.find((room) => room.name === name);

    if (existingRoom) {
      return { error: 'Room Name is taken' };
    }

    const room = new Room(name, gamemode, io);
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

  const getRoom = (name) => {
    name = format(name);
    return rooms.find((room) => room.name === name);
  };

  const format = (str) => str.trim().toLowerCase().replace(' ', '_');
}
module.exports = Lobby;
