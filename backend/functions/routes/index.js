/* eslint-disable new-cap */
const express = require("express");
// rest of your code
const router = express.Router();

const usersRoute = require("./usersRoute");
const complaintsRoute = require("./complaintsRoute");
const meritsRoute = require("./meritsRoute");
const chosenRoomRoute = require("./chosenRoomRoute");
const facilitiesRoute = require("./facilitiesRoute");

router.use("/users", usersRoute);
router.use("/complaints", complaintsRoute);
router.use("/merits", meritsRoute);
router.use("/chosenRoom", chosenRoomRoute);
router.use("/facilities", facilitiesRoute);

module.exports = router;
