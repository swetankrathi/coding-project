const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the calendar schema
const calendarSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    availability: [
        {
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;
