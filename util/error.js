const winston = require('winston');
const { format } = winston;

const logFormat = format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
);

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ format: format.simple() }) // Also log to console
    ],
});

module.exports = logger;
