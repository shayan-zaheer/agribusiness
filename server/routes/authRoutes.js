const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/logout").post(authController.logout);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
// router.route("/update-password").patch(authController.updatePassword);
// router.route("/forgot-password").patch(authController.forgotPassword);
// router.route("/reset-password").patch(authController.resetPassword);

module.exports = router;