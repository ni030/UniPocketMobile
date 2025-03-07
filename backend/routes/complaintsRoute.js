const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaintsController');

router.post('/create', complaintsController.createComplaint);
router.get('/:userId', complaintsController.getAllComplaints);
router.get('/get/:complaintId', complaintsController.getComplaintById);
router.put('/updateRating/:complaintId', complaintsController.updateRatingById);
router.put('/updateStatus/:complaintId', complaintsController.updateStatusById);

module.exports = router;