// Booking router
const express = require('express');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();
router.route('/').get(bookingController.getAllBookings).post(bookingController.createBooking);
router.route('/:id').get(bookingController.getBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking);


// Export router
module.exports = router;