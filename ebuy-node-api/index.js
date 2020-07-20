const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");

const { PORT, MONGO_DB_URL } = process.env;

const usersRouter = require("./src/routes/users");

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Mongo Db connected");
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening at : http://localhost:${PORT}`);
});

// Socket io set up for messaging
const io = socketIO(server);

// Socket setup
io.on("connection", (socket) => {
  socket.emit("yourId", socket.id);

  socket.on("join", ({ room, username }, callback) => {
    console.log(`${username} has joined in room ${room}`);

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

  socket.on("sendMessage", ({ message, socketId, username }, callback) => {
    console.log(" sendMessage -- ", message, socketId);
    io.emit("message", { username, message });
    //callback();
  });

  socket.on("typing", (data) => {
    console.log("in typing event ", data);
    const { username, room } = data;
    const typingMsg = username ? username + " is typing" : "";
    socket.broadcast.to(room).emit("typing", typingMsg);
  });

  socket.on("disconnect", (data) => {
    console.log("user has left ", data);
    io.sockets.emit("chat", data);
  });
});
