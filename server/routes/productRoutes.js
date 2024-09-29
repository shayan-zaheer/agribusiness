const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.route("/add").post(productController.addProduct);
router.route("/:id").get(productController.showProducts);

module.exports = router;
