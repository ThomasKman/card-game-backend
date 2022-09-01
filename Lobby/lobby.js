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

      socket.join(user.roomName);

      io.to(user.roomName).emit('updateRoom', getRoom(user.roomName));
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
