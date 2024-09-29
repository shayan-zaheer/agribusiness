const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Product = require("../models/productModel");

exports.addProduct = asyncErrorHandler(async (request, response, next) => {
    const newProduct = await Product.create(request.body);
    response.status(201).json({
        status: "success",
        data: {
            product: newProduct
        }
    });
});