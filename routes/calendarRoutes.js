// Calendar router
const express = require('express');
const calendarController = require('./../controllers/calendarController');

const router = express.Router();
router.route('/').get(calendarController.getAllCalendars).post(calendarController.createCalendar);
router.route('/find-bookings-overlap/:calendarId1/:calendarId2').get(calendarController.findOverlappingBookings);
router.route('/:id').get(calendarController.getCalendar).patch(calendarController.updateCalendar).delete(calendarController.deleteCalendar);


// Export router
module.exports = router;