const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.route("/add").post(productController.addProduct);

module.exports = router;
