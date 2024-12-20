const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/userdata").get(userController.getUser);
router.route("/:id").get(userController.getUserById);
router.route("/change-password").put(userController.changePassword);
router.route("/change-username").put(userController.changeUsername);

module.exports = router;