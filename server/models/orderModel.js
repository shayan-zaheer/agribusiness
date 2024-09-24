const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
				required: true,
			},
            quantity: {
                type: Number,
                required: true
            }
		},
	],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;