require("dotenv").config({
    path: "./config.env"
});
const express = require("express");
const app = express();

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}!`);
})