const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/userdata").get(userController.getUser);
router.route("/:id").get(userController.getUserById);
// router.route("/login").post(authController.login);
// router.route("/logout").post(authController.logout);
// router.route("/update-password").patch(authController.updatePassword);
// router.route("/forgot-password").patch(authController.forgotPassword);
// router.route("/reset-password").patch(authController.resetPassword);

module.exports = router;