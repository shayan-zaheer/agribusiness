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