const express = require('express');
const router = express.Router();
const meritsController = require('../controllers/meritsController');

router.get('/get/:userId', meritsController.getMeritByUserId);
router.get('/getAll', meritsController.getAllMerits);
router.post('/create', meritsController.createMerit);
router.put('/update/:userId', meritsController.updateMeritByUserId);


module.exports = router;