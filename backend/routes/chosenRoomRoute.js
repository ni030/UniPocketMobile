const express = require('express');
const router = express.Router();
const chosenRoomController = require('../controllers/chosenRoomController');

router.post('/create', chosenRoomController.createChosenRoom);
router.get('/get/:userId', chosenRoomController.getChosenRoomByUserId);
router.put('/update/:userId', chosenRoomController.updateChosenRoomByUserId);

module.exports = router;