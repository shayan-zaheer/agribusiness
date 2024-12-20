const express = require("express");
require("dotenv").config({path: "./config.env"});
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const conversationRoutes = require('./routes/conversationRoutes');
const cartRoutes = require('./routes/cartRoutes');
const {app} = require("./socket/index");
const cors = require("cors");
const mongoose = require("mongoose");
const {server} = require("./socket/index");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

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

app.use(morgan("dev"));

const corsOptions = {
    origin: [
        'http://localhost:5173', // Local development frontend
        'https://localhost:5173',
        'https://agribusiness-production.up.railway.app', // Deployed frontend
        'https://localhost', // Mobile app for debugging
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use('/api', conversationRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => { 
    console.log(`Server is started on port ${PORT}`);
});