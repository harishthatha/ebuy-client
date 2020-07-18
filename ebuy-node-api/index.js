const express = require("express");
const app = express();
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./src/controllers/users");
const http = require("http");
const PORT = process.env.PORT || 3000;

const router = require("./src/controllers/homeController");
app.use(router);

app.use(express.json());
const mongoDb = require("mongodb").MongoClient;

const socketIO = require("socket.io");
//const server = http.createServer(app);
// const { get } = require("./src/controllers/homeController");

// // Server setup
const server = app.listen(PORT, () =>
  console.log(`listening on http://localhost:${PORT}`)
);
const io = socketIO(server);

// Socket setup

io.on("connection", (socket) => {
  socket.on("join", ({ room, username }, callback) => {
    console.log(`${username} has joined in room ${room}`);
    const { error, user } = addUser({ id: socket.id, room, username });

    if (error) callback(error);

    socket.emit("message", {
      username: "admin",
      message: `${username}, welcome to the room ${room}`,
    });

    socket.broadcast.to(room).emit("message", {
      username: "admin",
      message: `${username}, has joined`,
    });

    socket.join(room);
    callback();
  });

  socket.on("sendMessage", ({ message }, callback) => {
    console.log("sendMessage -- ", message, socket.id);
    const user = getUser(socket.id);
    const { username, room } = user || {};
    console.log(" sendMessage -- ", username, room, message);
    io.to(room).emit("message", { username, message });
    //callback();
  });

  socket.on("typing", (data) => {
    const typingMsg = data ? data + " is typing" : "";
    socket.broadcast.emit("typing", typingMsg);
  });

  socket.on("disconnect", (data) => {
    console.log("user has left ", data);
    io.sockets.emit("chat", data);
  });
});
