const Room = require('./Room/room');

// lobby.js
function Lobby(name) {
  if (!(this instanceof Lobby)) {
    return new Lobby();
  }

  const rooms = [];

  Lobby.prototype.addRoom = function addRoom(name, gamemode) {
    name = name.trim().toLowerCase();

    const existingRoom = rooms.find((room) => room.name === name);

    if (existingRoom) {
      return { error: 'Room Name is taken' };
    }

    const room = new Room(name, gamemode);
    rooms.push(room);

    console.log('created room: ' + name);

    return { room };
  };

  Lobby.prototype.getRooms = function getRooms() {
    return rooms;
  };
}
module.exports = Lobby;
