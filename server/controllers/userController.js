const jwt = require('jsonwebtoken');
// const util = require("util");
const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.getUser = asyncErrorHandler(async (request, response) => {
        const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({
                status: "fail",
                message: "You are not logged in!"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_STR);

        const userId = decoded.id; 
        const user = await User.findById(userId).select('name email role username mobile city'); 

        if (!user) {
            return response.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        // request.user = decoded;

        response.status(200).json({
            status: "success",
            user
        });
});

exports.getUserById = asyncErrorHandler(async (request, response, next) => {
    const {id} = request.params;
    const user = await User.findById(id).select('name email role username mobile city'); 

        if (!user) {
            return response.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        response.status(200).json({
            status: "success",
            user
        });
});



exports.changeUsername = asyncErrorHandler(async (req, res) => {
    const { username } = req.body;

    // Verify the token from the request cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in!"
        });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.SECRET_STR);
    const userId = decoded.id;

    // Find the user by ID and update the username
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        });
    }

    // Check if the new username is already taken (optional)
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            status: "fail",
            message: "Username is already taken"
        });
    }

    // Update the username in the database
    user.username = username;
    await user.save();

    // Send success response
    res.status(200).json({
        status: "success",
        message: "Username updated successfully!"
    });
});


const bcrypt = require('bcryptjs'); // For password hashing

exports.changePassword = asyncErrorHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in!"
        });
    }

    const decoded = jwt.verify(token, process.env.SECRET_STR);
    const user = await User.findById(decoded.id).select("+password");

    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ status: "fail", message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: "success", message: "Password updated successfully!" });
});
