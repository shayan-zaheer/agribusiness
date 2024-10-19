const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Product = require("../models/productModel");

exports.addProduct = asyncErrorHandler(async (request, response, next) => {
    console.log(request.body);
    console.log(request.user);
    const newProduct = await Product.create({...request.body, seller: request?.user?._id});


    response.status(201).json({
        status: "success",
        data: {
            product: newProduct
        }
    });
});

// exports.getProductByUserId = asyncErrorHandler(async (_request, response, next) => {
//     const products = await Product.find({})
// })

exports.showProducts = asyncErrorHandler(async (request, response, next) => {
    const products = await Product.find({ seller: request.params.id }).populate('seller');
	response.status(200).json({
        status: "success",
        data: {
            products
        }
     });
})