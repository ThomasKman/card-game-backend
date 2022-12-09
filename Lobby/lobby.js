const Room = require('./Room/room');
const session = require('../Session/Session');

// lobby.js
function Lobby() {
  if (!(this instanceof Lobby)) {
    return new Lobby();
  }

  const rooms = [];

  // Get all rooms
  const getRooms = () => {
    return rooms;
  };
  // get specific room
  const getRoom = (name) => {
    name = format(name);
    return rooms.find((room) => room.name === name);
  };

  // Format name
  const format = (str) => str.trim().toLowerCase().replace(' ', '_');

  // Adds new Room to room list
  // data: {name,gamemode}
  const addRoom = (data, socket) => {
    name = format(data.name);

    const existingRoom = rooms.find((room) => room.name === name);

    if (existingRoom) {
      return { error: 'Room Name is taken' };
    }

    const room = new Room(name, data.gamemode);
    rooms.push(room);
    session.emit('updateRooms', getRooms(), { level: 'io' });

    return rooms;
  };

  // Removes specific room from List
  const removeRoom = (name) => {
    name = format(name);

    const index = rooms.findIndex((room) => room.name === name);
    if (index !== -1) {
      return rooms.splice(index, 1)[0];
    }
  };

  // User joins the Lobby
  // data: {} -> Not relevant
  const joinLobby = (data, socket) => {
    session.emit('updateRooms', getRooms(), {
      level: 'socket',
      socket: socket,
    });
    socket.join('lobby');
    console.log('user ' + socket.id + ' joined lobby');
  };

  // Socket Listener
  session.listen('joinLobby', joinLobby);
  session.listen('createRoom', addRoom);
}

module.exports = Lobby;

// Delete Me
//   socket.on('joinRoom', ({ userName, roomName }) => {
//     user = {
//       id: socket.id,
//       userName: userName,
//       roomName: roomName,
//     };
//
// TODO: Delete Room when last user leaves
