const fs = require('fs');
const Calendar = require('./../models/calendarModel');
const Booking = require('./../models/bookingModel');

// Request handlers
exports.getAllCalendars = async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach(field => delete queryObj[field]);

        const calendars = await Calendar.find(queryObj);
        res.status(200).json({
            status: 'success',
            results: calendars.length,
            data: {
                calendars: calendars
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })
    }
};

exports.getCalendar = async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                calendar: calendar
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })
    }
};

exports.createCalendar = async (req, res) => {
    try {
        const newCalendar = await Calendar.create(req.body);
        
        res.status(200).json({
            status: 'success',
            data: {
                calendar: newCalendar
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};

exports.updateCalendar = async (req, res) => {
    try {
        const calendar = await Calendar.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                calendar: calendar
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};

exports.deleteCalendar = async (req, res) => {
    try {
        await Calendar.findByIdAndDelete(req.params.id);
        
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};

exports.findOverlappingBookings = async (req, res) => {
    const { calendarId1, calendarId2 } = req.params;

    try {
        // Fetch bookings for both calendars and
        // populate data for user and calendar objects as well
        const bookingsCalendar1 = await Booking.find({ calendar: calendarId1 })
            .populate('user', 'username email')
            .populate('calendar', 'name email');
        const bookingsCalendar2 = await Booking.find({ calendar: calendarId2 })
            .populate('user', 'username email')
            .populate('calendar', 'name email');

        // Check for overlapping bookings
        const overlappingBookings = [];

        bookingsCalendar1.forEach(booking1 => {
            bookingsCalendar2.forEach(booking2 => {
                // Check if there is an overlap
                if ((booking1.startTime < booking2.endTime && booking1.endTime > booking2.startTime)) {
                    overlappingBookings.push({
                        calendar1: booking1,
                        calendar2: booking2
                    });
                }
            });
        });

        if (overlappingBookings.length === 0) {
            return res.status(200).json({
                status: 'success',
                data: null,
                message: 'No overlapping bookings found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                bookings: overlappingBookings
            }
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Something went wrong. Please try again.'
        });
    }
};