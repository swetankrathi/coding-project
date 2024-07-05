// env variables and dependencies
const mongoose = require('mongoose');
const env = require('dotenv');
env.config({path: './config.env'});

// Database connection
const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

if(!process.env.DATABASE_PASSWORD){
    console.log("Error: Please enter password in config file");
    process.exit();
}

mongoose.connect(db).then(_con => {
    console.log("DB Connection successful")
}).catch(err => {
    console.error("Unable to connect to the database. Please check url and password.");
    process.exit();
});

// Server Config
const app = require('./app');
const port = process.env.PORT || 8001;

// Start server
app.listen(port, '127.0.0.1', () => {
    console.log(`🖥 Project execution environment: ${process.env.NODE_ENV}`)
    console.log(`🌐 App is listening on port ${port}...`);
});