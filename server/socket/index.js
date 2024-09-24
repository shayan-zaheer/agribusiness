const express = require("express");
const { Server } = require("socket.io");
const http = require("http")

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:8000",
        credentials: true
    }
});

const onlineUsers = new Set();

io.on("connection", async (socket) => {
    console.log(`${socket.id} connected!`);
    const token = socket.handshake.auth.token;
    // const user = await getUserByToken(token); => to be made by me

    socket.join(user?._id);
    onlineUsers.add(user?._id);

    io.emit("onlineUser", Array.from(onlineUsers));

    socket.on("disconnect", () => {
        onlineUsers.delete(user?._id);
        console.log(`${socket.id} disconnected!`)
    })
});

module.exports = {
    app, server
};