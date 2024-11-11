const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.addToCart = async (request, response) => {
    try {
        const { userId, productId, quantity } = request.body;

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return response.status(404).json({ message: "Product not found" });
        }

        const existingProduct = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }
        await user.save();

        response.status(200).json({ message: "Product added to cart", cart: user.cart });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
}

exports.getCartByUser = async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await User.findById(userId).populate("cart.product");

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
}

exports.removeFromCart = async (request, response) => {
    try {
        const { userId, productId } = request.body;
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        const productIndex = user.cart.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return response.status(404).json({ message: "Product not found in cart" });
        }

        user.cart.splice(productIndex, 1);
        await user.save();

        response.status(200).json({ message: "Product removed from cart", cart: user.cart });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
}