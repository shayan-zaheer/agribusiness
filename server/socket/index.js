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

io.on("connection", socket => {
    console.log(`${socket.id} connected!`);

    io.on("disconnect", () => {
        console.log(`${socket.id} disconnected!`)
    })
});

module.exports = {
    app, server
};