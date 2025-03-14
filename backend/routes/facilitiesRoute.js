const express = require('express');
const router = express.Router();
const facilitiesController = require('../controllers/facilitiesController');

router.get('/getAll', facilitiesController.getAllFacilities);

module.exports = router;