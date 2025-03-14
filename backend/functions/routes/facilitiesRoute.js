/* eslint-disable new-cap */
const express = require("express");
// rest of your code
const router = express.Router();
const facilitiesController = require("../controllers/facilitiesController");

router.get("/getAll", facilitiesController.getAllFacilities);

module.exports = router;
