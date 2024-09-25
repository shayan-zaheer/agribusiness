const express = require("express");
require("dotenv").config({path: "./config.env"});
const authRoutes = require("./routes/authRoutes");
const {app} = require("./socket/index");
const cors = require("cors");
const mongoose = require("mongoose");
const {server} = require("./socket/index");

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

app.use(cors({
    origin: "http://127.0.0.1:8000",
    credentials: true
}))

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => { 
    console.log(`Server is started on port ${PORT}`);
});