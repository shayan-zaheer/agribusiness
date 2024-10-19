const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/add").post(authController.protect, productController.addProduct);
router.route("/:id").get(productController.showProducts);

module.exports = router;
