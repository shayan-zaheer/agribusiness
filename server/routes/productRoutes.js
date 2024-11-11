const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const upload = require("../utils/multer.js"); 
const router = express.Router();

router.route("/:id").get(productController.showOwnProducts);
router.route("/").get(productController.showAllProducts);
router.route("/add").post(authController.protect, upload.single("image"), productController.addProduct);
router.route("/delete/:id").delete(productController.deleteProduct);
router.route("/update/:id").put(productController.updateProduct);
router.route("/product/:productId").get(productController.getProductById);

module.exports = router;
