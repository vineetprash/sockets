import express from "express";
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});
const app = express();

const userToRoomMap = new Map();

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    console.log("Client connected: ", data);
    const { username, roomcode } = data;
    console.log(userToRoomMap);

    socket.join(roomcode);
    userToRoomMap.set(username, roomcode);

    socket.emit("joined-room", { roomcode });
  });

  socket.on("send-message", (data) => {
    const { message } = data;
    console.log(
      message,
      userToRoomMap,
      userToRoomMap.get(data.username),
      data.username,
      data
    );
    io.to(userToRoomMap.get(data.username)).emit("new-message", { message });
  });
});
io.listen(8001, () => console.log("Listening on port " + 8001));
app.listen(8000);
