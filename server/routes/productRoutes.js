const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const upload = require("../utils/multer.js"); 
const router = express.Router();

router.route("/add").post(authController.protect, upload.single("image"), productController.addProduct);
router.route("/").get(productController.showAllProducts);
router.route("/:id").get(productController.showOwnProducts);

module.exports = router;
