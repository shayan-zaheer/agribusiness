const User = require("./../models/userModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const CustomError = require("./../utils/custom_error");
const util = require("util");
const crypto = require("crypto");

const signToken = id => {
    return jwt.sign({id: id}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
};

exports.register = asyncErrorHandler(async (request, response, next) => {
    const newUser = await User.create(request.body);
    response.status(201).json({
        status: "success",
        data: {
            user: newUser
        }
    });
});

exports.login = asyncErrorHandler(async (request, response, next) => {
    const {username, password} = request.body;
    if(!username || !password){
        const error = new CustomError("Please provide username & password for login!", 400);
        return next(error);
    }

    const user = await User.findOne({username: username}).select("+password");
    request.user = user;

    if(!user || !(await user.comparePasswordInDB(password, user.password))){
        const error = new CustomError("Incorrect email or password!", 400);
        return next(error);
    }

    const token = signToken(user._id);

    response.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
        path: "/",
    });

    response.status(200).json({
        status: "success",
        token: token
    });
});

exports.logout = asyncErrorHandler(async (request, response, next) => {
    response.clearCookie("token", {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
    });

    response.status(200).json({
        status: "success",
    });
});

exports.protect = asyncErrorHandler(async (request, response, next) => { 
    const token = request.cookies.token;
    
    if(!token){
        next(new CustomError("You are not logged in!", 401));
    }
    
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    console.log(decodedToken)

    const user = await User.findById({_id: decodedToken.id});
    if(!user){
        const error = new CustomError(`The user with given token does not exist!`, 401);
        next(error);
    }
    
    request.user = user;
    next();
});