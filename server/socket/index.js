const express = require("express");
const { Server } = require("socket.io");
const http = require("http")
const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:8000",
        credentials: true
    }
});

async function getUserByToken(token){
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    console.log(decodedToken)
    
    const user = await User.findById({_id: decodedToken.id});
    return user;
}

const onlineUser = new Set();

io.on("connection", async (socket) => {
    console.log(`${socket.id} connected!`);
    const token = socket.handshake.auth.token;
    const user = await getUserByToken(token);

    socket.join(user?._id);
    onlineUser.add(user?._id);

    io.emit("onlineUser", Array.from(onlineUser));

    socket.on("disconnect", () => {
        onlineUser.delete(user?._id);
        console.log(`${socket.id} disconnected!`)
    })
});

module.exports = {
    app, server
};