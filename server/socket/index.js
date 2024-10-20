// const express = require("express");
// const { Server } = require("socket.io");
// const http = require("http");
// const util = require("util");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const { Message, Conversation } = require("../models/conversationModel"); // Import your models

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://127.0.0.1:8000", // Adjust this as needed for your frontend
//         credentials: true,
//     },
// });

// // Function to get a user by token
// async function getUserByToken(token) {
//     const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
//     return await User.findById(decodedToken.id);
// }

// const onlineUsers = new Set();

// io.on("connection", async (socket) => {
//     console.log(`${socket.id} connected!`);
//     const token = socket.handshake.auth.token;

//     if (!token) {
//         console.log("No token provided");
//         return; // Disconnect if no token
//     }

//     const user = await getUserByToken(token);
//     if (!user) {
//         console.log("Invalid token");
//         return; // Disconnect if user not found
//     }

//     socket.join(user._id.toString()); // Use string for room join
//     onlineUsers.add(user._id.toString());
//     io.emit("onlineUser", Array.from(onlineUsers));

//     // Load previous messages for the conversation
//     socket.on("message-page", async (receiverId) => {
//         console.log("User ID for messaging:", receiverId);
        
//         // Load previous messages
//         const conversation = await Conversation.findOne({
//             sender: user._id,
//             receiver: receiverId,
//         }).populate("messages");

//         if (conversation) {
//             const messages = await Message.find({ _id: { $in: conversation.messages } });
//             socket.emit("load-messages", messages); // Emit messages back to the user
//         }
//     });

//     // Handle sending a message
//     socket.on("send-message", async ({ receiverId, text }) => {
//         try {
//             // Save the message to the database
//             const message = await Message.create({
//                 text,
//                 sender: user._id, // Associate the sender with the message
//                 receiver: receiverId // Associate the receiver with the message
//             });

//             const conversation = await Conversation.findOneAndUpdate(
//                 { sender: user._id, receiver: receiverId },
//                 { $push: { messages: message._id } },
//                 { new: true, upsert: true } // Create if not found
//             );

//             // Emit message to the receiver
//             socket.to(receiverId).emit("receive-message", {
//                 senderId: user._id,
//                 text,
//                 createdAt: message.createdAt,
//             });

//             // Optionally, emit back to the sender
//             socket.emit("receive-message", {
//                 senderId: user._id,
//                 text,
//                 createdAt: message.createdAt,
//             });

//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     });

//     socket.on("disconnect", () => {
//         onlineUsers.delete(user._id.toString());
//         console.log(`${socket.id} disconnected!`);
//         io.emit("onlineUser", Array.from(onlineUsers)); // Emit updated online users
//     });
// });

// module.exports = {
//     app, 
//     server
// };

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
        origin: "http://localhost:5173", // Adjust this as needed for your frontend
        credentials: true,
    },
});

// Function to get a user by token
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
        return; // Disconnect if no token
    }

    const user = await getUserByToken(token);
    if (!user) {
        console.log("Invalid token");
        return; // Disconnect if user not found
    }

    socket.join(user._id.toString()); // Use string for room join
    onlineUsers.add(user._id.toString());
    io.emit("onlineUser", Array.from(onlineUsers));

    // Load previous messages for the conversation
    socket.on("message-page", async (receiverId) => {
        console.log("User ID for messaging:", receiverId);
        
        // Load previous messages
        const conversation = await Conversation.findOne({
            sender: user._id,
            receiver: receiverId,
        }).populate("messages");

        if (conversation) {
            const messages = await Message.find({ _id: { $in: conversation.messages } });
            socket.emit("load-messages", messages); // Emit messages back to the user
        }
    });
 
    // Handle sending a message
    socket.on("send-message", async ({ receiver, sender, text }) => {
        try {
            const message = await Message.create({
                text,
                // sender: user._id, // Associate the sender with the message
                sender: sender,
                receiver: receiver // Associate the receiver with the message
            });

            const conversation = await Conversation.findOneAndUpdate(
                // { sender: user._id, receiver: receiver },
                {sender: sender, receiver: receiver},
                { $push: { messages: message._id } },
                { new: true, upsert: true } // Create if not found
            );

            socket.to(receiver).emit("receive-message", {
                _id: message._id,
                receiver: receiver,
                sender: sender,
                text,
                createdAt: message.createdAt,
            });

        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        onlineUsers.delete(user._id.toString());
        io.emit("onlineUser", Array.from(onlineUsers));
        console.log(`${socket.id} disconnected!`);
    });
});

module.exports = { server, app };
