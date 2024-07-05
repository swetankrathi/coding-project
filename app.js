const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const calendarRouter = require('./routes/calendarRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// Middlewares
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/calendars', calendarRouter);
app.use('/api/v1/bookings', bookingRouter);


// Handler for unavailable routes / 404
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on the server!`
    });
})


module.exports = app;