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
        const user = await User.findById(userId).select('name username mobile city'); 

        if (!user) {
            return response.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        request.user = decoded;

        response.status(200).json({
            status: "success",
            user
        });
});
