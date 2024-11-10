const User = require("./../models/userModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const CustomError = require("./../utils/custom_error");
const util = require("util");
const crypto = require("crypto");
const bcrypt=require("bcryptjs")
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
    const { username, password } = request.body;

    if (!username || !password) {
        return next(new CustomError("Please provide username & password for login!", 400));
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
        return next(new CustomError("Incorrect username or password!", 400));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new CustomError("Incorrect username or password!", 400));
    }

    const token = signToken(user._id);
    response.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
    });

    response.status(200).json({ status: "success", token });
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
    
    // 1. read the token and check if it exist
    const token = request.cookies.token;
    
    if(!token){
        next(new CustomError("You are not logged in!", 401));
    }
    
    // 2. verify/validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    console.log(decodedToken)
    
    // 3. if the user exists
    const user = await User.findById({_id: decodedToken.id});
    if(!user){
        const error = new CustomError(`The user with given token does not exist!`, 401);
        next(error);
    }
    
    // 4. if the user changed password after the token was issued
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    if(isPasswordChanged){
        const error = new CustomError("The password has been changed recently. Please login again!", 401);
        return next(error);
    }
    
    request.user = user;
    next();
});

// exports.restrict = (...role) => {
//     return (request, response, next) => {
//         if(!role.includes(request.user.role)){
//             const error = new CustomError("You do not have permission to perform this action!", 403);
//             next(error);
//         }
//         next();
//     }
// }

exports.restrict = role => {
    return (request, response, next) => {
        if(request.user.role !== role){
            const error = new CustomError("You do not have permission to perform this action!", 403);
            next(error);
        }
        next();
    }
};

exports.forgotPassword = asyncErrorHandler(async (request, response, next) => {
    
    // 1. get user based on posted email

    const user = await User.findOne({email: request.body.email})
    if(!user){
        const error = new CustomError("Could not find the user with given email!", 404);
        next(error);
    }

    // 2. generate random reset token

    const resetToken = user.createResetPasswordToken();

    await user.save({validateBeforeSave: false});

    // 3. send the token back to the user
    const resetUrl = `${request.protocol}://${request.get("host")}/api/user/resetPassword/${resetToken}`;
    const message = "We have received a password reset request. Please use the below link to reset your password\n\n" + resetUrl + "\n\nThis reset password will be valid for 10 minutes!";

    try{ 
        await sendEmail({
            email: user.email,
            subject: "Password change request received",
            message: message
        });

        response.status(200).json({
            status: "success",
            message: "Password reset link send to the user email!"
        })
    }
    catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save({validateBeforeSave: false});
        return next(new CustomError("There was an error sending password reset email. Please try again later!", 500));
    }

})


