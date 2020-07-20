const express = require("express");
const app = express();
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./src/controllers/users");

const PORT = process.env.PORT || 3000;

// Controllers loading
app.use(express.json());

// Mongo db connection
const mongoDb = require("mongodb").MongoClient;

// Socket io set up for messaging
const socketIO = require("socket.io");

const io = socketIO(server);

// Socket setup
io.on("connection", (socket) => {
  socket.emit("yourId", socket.id);
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

  socket.on("sendMessage", ({ message, socketId }, callback) => {
    const user = getUser(socketId);
    const { username, room } = user || {};
    console.log(" sendMessage -- ", username, room, message, socketId);
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
