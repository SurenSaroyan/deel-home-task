const { createLogger, format, transports } = require('winston');

const levels = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    http: 'http',
    verbose: 'verbose',
    debug: 'debug',
    silly: 'silly',
};

const logger = createLogger({
    levels,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json(),
    ),
    exitOnError: false,
    transports: [new transports.Console()],
});

// logger.transports[0].silent = true;
// set true for disable logger

module.exports = logger;
