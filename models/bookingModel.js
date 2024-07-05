const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the booking schema
const bookingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    calendar: {
        type: Schema.Types.ObjectId,
        ref: 'Calendar',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;