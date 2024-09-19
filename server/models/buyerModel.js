const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    history: [{
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller"
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        date: {
            type: Date,
            default: Date.now
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;