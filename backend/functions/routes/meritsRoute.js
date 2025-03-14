/* eslint-disable new-cap */
const express = require("express");
// rest of your code
const router = express.Router();
const meritsController = require("../controllers/meritsController");

router.get("/get/:userId", meritsController.getMeritByUserId);
router.get("/getAll", meritsController.getAllMerits);
router.post("/create", meritsController.createMerit);
router.put("/update/:userId", meritsController.updateMeritByUserId);


module.exports = router;
