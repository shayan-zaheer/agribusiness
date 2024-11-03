const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const conversationRoutes = require('./routes/conversationRoutes');
const {app} = require("./socket/index");
const cors = require("cors");
const mongoose = require("mongoose");
const {server} = require("./socket/index");
const cookieParser = require('cookie-parser');
MONGO_URL="mongodb+srv://agribusinesschat:agribusiness123@cluster0.qwu19.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

process.on("unhandledRejection", (error)=>{
    console.log(error)
    process.exit(1);
});

process.on("uncaughtException", (err) =>{
    console.log("Uncaught exception occured! Shutting down!");
    console.log(err);
    process.exit(1);
});

mongoose.connect(process.env.MONGO_URL).then((conObj)=>{
    console.log("DB Connection Successful!");
});

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use('/api', conversationRoutes);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => { 
    console.log(`Server is started on port ${PORT}`);
});