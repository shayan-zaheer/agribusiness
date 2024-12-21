const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Message, Conversation } = require("../models/conversationModel");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'https://localhost:5173',
            'https://agribusiness-production.up.railway.app',
            "*"
          ],
          allowedHeaders: ['Content-Type'],
    credentials: true
    },
});

async function getUserByToken(token) {
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    return await User.findById(decodedToken.id);
}

const onlineUsers = new Set();

io.on("connection", async (socket) => {
    console.log(`${socket.id} connected!`);
    const token = socket.handshake.auth.token;

    if (!token) {
        console.log("No token provided");
        return;
    }

    const user = await getUserByToken(token);
    if (!user) {
        console.log("Invalid token");
        return;
    }

    socket.join(user._id.toString());
    onlineUsers.add(user._id.toString());
    io.emit("onlineUser", Array.from(onlineUsers));

//     socket.on("message-page", async (receiverId) => {
//         console.log("User ID for messaging:", receiverId);
        
//         const conversation = await Conversation.findOne({
//             $or: [
//                 { sender: user._id, receiver: receiverId },
//                 { sender: receiverId, receiver: user._id }
//             ],
//         }).populate("messages");

//         if (conversation) {
//             const messages = await Message.find({ _id: { $in: conversation.messages } });
//             socket.emit("load-messages", messages);
//         }
//     });

//     socket.on("send-message", async ({ receiver, sender, text }) => {
//         try {
//             const message = await Message.create({
//                 text,
//                 sender,
//                 receiver
//             });

//             await Conversation.findOneAndUpdate(
//                 { $or: [{ sender, receiver }, { sender: receiver, receiver: sender }] },
//                 { $push: { messages: message._id } },
//                 { new: true, upsert: true }
//             );

//             socket.to(receiver).emit("receive-message", {
//                 _id: message._id,
//                 receiver,
//                 sender,
//                 text,
//                 createdAt: message.createdAt,
//             });

//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     });

//     socket.on("disconnect", () => {
//         onlineUsers.delete(user._id.toString());
//         io.emit("onlineUser", Array.from(onlineUsers));
//         console.log(`${socket.id} disconnected!`);
//     });

socket.on("message-page", async (receiverId) => {
    console.log("User ID for messaging:", receiverId);
    
    // Find an existing conversation between the current user and the receiver
    const conversation = await Conversation.findOne({
        $or: [
            { sender: user._id, receiver: receiverId },
            { sender: receiverId, receiver: user._id }
        ],
    }).populate("messages");

    if (conversation) {
        const messages = await Message.find({ _id: { $in: conversation.messages } });
        socket.emit("load-messages", messages);
    } else {
        // No conversation found yet, so no messages to load
        socket.emit("load-messages", []);
    }
});

socket.on("send-message", async ({ receiver, sender, text }) => {
    try {
        // Find an existing conversation or create a new one
        let conversation = await Conversation.findOne({
            $or: [{ sender, receiver }, { sender: receiver, receiver: sender }],
        });

        if (!conversation) {
            // Create a new conversation if one doesn't exist
            conversation = await Conversation.create({
                sender,
                receiver,
                messages: [],
            });
        }

        // Create the message
        const message = await Message.create({
            text,
            sender,
            receiver
        });

        // Add the message to the conversation
        conversation.messages.push(message._id);
        await conversation.save();

        // Emit the message to the receiver's socket
        socket.to(receiver).emit("receive-message", {
            _id: message._id,
            receiver,
            sender,
            text,
            createdAt: message.createdAt,
        });

    } catch (error) {
        console.error("Error sending message:", error);
    }
});

socket.on("disconnect", () => {
    onlineUsers.delete(user._id.toString());
    io.emit("onlineUser", Array.from(onlineUsers));
    console.log(`${socket.id} disconnected!`);
});
});


module.exports = { server, app };