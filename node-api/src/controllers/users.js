const users = [];

const addUser = ({ id, username, room }) => {
  console.log("add user is called *** ");
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find(
    ({ username: name, room: roomName }) => username === name && room === room
  );

  if (existingUser) return { error: "Username is already taken" };
  const user = { username, room, id };
  users.push(user);
  console.log("users & addUser -- ", JSON.stringify(users));
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex(({ id: userId }) => id === userId);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  console.log("users & getUser -- ", JSON.stringify(users));
  return users.find(({ id: userId }) => id === userId);
};

const getUsersInRoom = (room) =>
  users.filter(({ room: roomName }) => room === roomName);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
