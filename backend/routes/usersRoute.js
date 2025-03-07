const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.createUser);
router.get('/check/:email', usersController.getAllUsers);
router.get('/get/:userId', usersController.getUserById);
router.put('/update/:userId', usersController.updateUserById);

module.exports = router;