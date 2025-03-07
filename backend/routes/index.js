const express = require("express");
const router = express.Router();

const usersRoute = require("./usersRoute");
const complaintsRoute = require("./complaintsRoute");

router.use("/users", usersRoute);
router.use("/complaints", complaintsRoute);

module.exports = router;