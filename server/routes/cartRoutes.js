const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.route("/view-cart/:userId").get(cartController.getCartByUser);
router.route("/add-to-cart").post(cartController.addToCart);
router.route("/remove-from-cart").post(cartController.removeFromCart);

module.exports = router;
