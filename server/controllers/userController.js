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

exports.changePassword = asyncErrorHandler(async (req, res, next) => {
    const { userId,
        oldPassword,
        newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
        return next(new CustomError("Please provide user ID, current password, and new password", 400));
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
        return next(new CustomError("User not found", 404));
    }

    const isMatch = await user.comparePasswordInDB(oldPassword, user.password);
    if (!isMatch) {
        return next(new CustomError("Current password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        status: "success",
        message: "Password changed successfully"
    });
});

exports.changeUsername = asyncErrorHandler(async (req, res, next) => {
    const { userId, newUsername } = req.body;

    if (!userId || !newUsername) {
        return next(new CustomError("Please provide user ID and new username", 400));
    }

    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
        return next(new CustomError("Username already taken", 400));
    }

    const user = await User.findById(userId);
    if (!user) {
        return next(new CustomError("User not found", 404));
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({
        status: "success",
        message: "Username changed successfully"
    });
});
