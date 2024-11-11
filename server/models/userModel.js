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
	mobile: {
		type: Number,
		required: true
	},
    role: {
        type: String,
        enum: ["seller", "buyer"],
        required: true,
    },
    farmName: {
        type: String,
    },
    farmLocation: {
        type: String,
    },
    cropsProduced: {
        type: [String],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    city: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    } else {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = undefined;
        next();
    }
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.comparePasswordInDB = async function (password, passwordDB) {
    return await bcrypt.compare(password, passwordDB);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
