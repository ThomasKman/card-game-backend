const users = [];

const addUser = ({ id, userName, roomName }) => {
  userName = userName.trim();
  roomName = roomName;

  console.log(userName, roomName);

  const existingUser = users.find(
    (user) => user.roomName === roomName && user.userName === userName
  );

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, userName, roomName };
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

const getUsersInRoom = (room) => users.filter((user) => user.room === roomName);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
