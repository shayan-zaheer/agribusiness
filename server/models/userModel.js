const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["seller", "buyer"],
		required: true,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
            required: function(){
                this.role === "seller"  
            }
		},
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    } else{
        this.password = await bcrypt.hash(this.password, 12); // 12 is the salt
        this.confirmPassword = undefined;
        next();
    }
});

userSchema.pre(/^find/, function(next){
    this.find({active: {$ne: false}});
    next();
})

userSchema.methods.comparePasswordInDB = async function(password, passwordDB){
    return await bcrypt.compare(password, passwordDB);
};

userSchema.methods.isPasswordChanged = function(JWTTimestamp){
    if(this.passwordChangedAt){ // it it exists, means that password is changed otherwise it should be undefined
        const pswdChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); // it is in milliseconds, we're dividing it to get it in seconds
        console.log(pswdChangedTimestamp, JWTTimestamp);

        return JWTTimestamp < pswdChangedTimestamp;
    }
    return false;
}

userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256",).update(resetToken).digest("hex");
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken, this.passwordResetToken);
    return resetToken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;