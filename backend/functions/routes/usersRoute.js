/* eslint-disable new-cap */
const express = require("express");
// rest of your code
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/register", usersController.createUser);
router.get("/check/:email", usersController.getAllUsers);
router.get("/get/:userId", usersController.getUserById);
router.put("/update/:userId", usersController.updateUserById);

module.exports = router;
