const fs = require('fs');
const Booking = require('./../models/bookingModel');
const Calendar = require('./../models/calendarModel');

// Request handlers
exports.getAllBookings = async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach(field => delete queryObj[field]);

        // Populate data for user and calendar fields
        // to fill relevant data and not just object ids
        const bookings = await Booking.find(queryObj)
            .populate('user', 'username email')
            .populate('calendar', 'name description');

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings: bookings
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })
    }
};

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                booking: booking
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })
    }
};

exports.createBooking = async (req, res) => {
    const { calendar, startTime, endTime } = req.body;

    try {
        // Check if the calendar exists
        if(!calendar) {
            return res.status(400).json({ 
                status: 'error',
                message: 'calendar field is required. Please pass a valid calendar id.' 
            });
        }
        const calendarDoc = await Calendar.findById(calendar);
        
        if (!calendarDoc) {
            return res.status(404).json({
                status: 'error',
                message: 'Calendar not found'
            });
        }

        // Ensure start time is before end time
        if (new Date(startTime) >= new Date(endTime)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid time range. End time must be greater than start Time.'
            });
        }

        // Check for overlapping bookings
        const overlappingBookings = await Booking.find({
            calendar: calendar,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
            ]
        });

        if (overlappingBookings.length > 0) {
            return res.status(409).json({
                status: 'error',
                message: 'Time slot is already booked. Please try with a different slot.'
            });
        }

        // Create new booking
        const booking = await Booking.create(req.body);

        res.status(201).json({ 
            status: 'success',
            data: {
                booking: booking
            }
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Something went wrong. Please try again.'
        });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                booking: booking
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        
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