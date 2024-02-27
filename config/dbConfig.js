const logger = require("../util/error");

const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ulVerifyDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    logger.info('Connected to MongoDB successfully!');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error.message);
        // Optionally, you can throw an error or handle it in another way
    }
}

// Usage
module.exports = connectDB
