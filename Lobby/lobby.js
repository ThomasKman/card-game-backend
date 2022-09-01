const Room = require('./Room/room');

// lobby.js
function Lobby(name) {
  if (!(this instanceof Lobby)) {
    return new Lobby();
  }

  const rooms = [];

  Lobby.prototype.addRoom = function addRoom(name, gamemode) {
    name = format(name);

    const existingRoom = rooms.find((room) => room.name === name);

    if (existingRoom) {
      return { error: 'Room Name is taken' };
    }

    const room = new Room(name, gamemode);
    rooms.push(room);

    return rooms;
  };

  Lobby.prototype.getRooms = function getRooms() {
    return rooms;
  };

  Lobby.prototype.getRoom = function getRoom(name) {
    name = format(name);
    return rooms.find((room) => room.name === name);
  };

  const format = (str) => str.trim().toLowerCase().replace(' ', '_');
}
module.exports = Lobby;
