const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const mongoose = require("mongoose");

process.on("unhandledRejection", (error)=>{
    console.log(error);
    process.exit(1);
});

process.on("uncaughtException", (err) =>{
    console.log("Uncaught exception occured! Shutting down!");
    console.log(err);
    process.exit(1);
});

const app = require("./app");

// console.log(app.get("env"));

// console.log(process.env);

mongoose.connect(process.env.MONGO_URL).then((conObj)=>{
    console.log("DB Connection Successful!");
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => { 
    console.log(`Server is started on port ${PORT}`);
});