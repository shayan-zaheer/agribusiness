const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Product = require("../models/productModel");

exports.addProduct = asyncErrorHandler(async (request, response, next) => {
    const { name, description, price, quantityAvailable, category } = request.body;
    const image = request.file ? `/images/${request.file.filename}` : '';
    const seller = request?.user?._id;

    const newProduct = new Product({ name, description, price, quantityAvailable, category, image, seller });
    await newProduct.save();

    response.status(201).json({
        status: "success",
        data: {
            product: newProduct
        }
    });
});

exports.updateProduct = asyncErrorHandler(async (request, response, next) => {
    const { id } = request.params;
    const { name, description, price, quantityAvailable, category } = request.body;

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, quantityAvailable, category },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    response.status(200).json({ status: 'success', data: { product: updatedProduct } });
});

exports.deleteProduct = asyncErrorHandler(async (request, response, next) => {
    const {id} = request.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return response.status(404).json({ status: "error", message: "Product not found" });
    }
    response.status(200).json({ status: "success", message: "Product deleted successfully" });
})

exports.showAllProducts = asyncErrorHandler(async (request, response, next) => {
    const products = await Product.find().populate('seller'); // Get all products with seller details
    
    response.status(200).json({
        status: "success",
        data: {
            products
        }
    });
});


exports.showOwnProducts = asyncErrorHandler(async (request, response, next) => {
    const products = await Product.find({ seller: request.params.id }).populate('seller');
	response.status(200).json({
        status: "success",
        data: {
            products
        }
     });
})