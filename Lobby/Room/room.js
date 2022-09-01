// Room.js
function Room(name, gamemode) {
  if (!(this instanceof Room)) {
    return new Room();
  }

  // generate array for cards {suit,value}, fill and shuffle
  this.users = [];
  this.seatCount = 7;
  this.name = name;
  this.gamemode = gamemode;
}

// returns users
Room.prototype.getUsers = function getUsers() {
  return this.users;
};

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name };
  users.push(user);

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

module.exports = Room;
