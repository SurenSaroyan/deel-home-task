require('dotenv').config();
const config = require('config');
const app = require('./app');
const logger = require('./libs/logger');

const port = config.get('listen.port');

async function init() {
    try {
        app.listen(port, () => {
            logger.info('Express App Listening on Port 3001');
        });
    } catch (error) {
        logger.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}
init().then().catch((e) => logger.log('error', e.message));

/**
 * Server uncaught error handlers
 * ESLint disabled because here we need to catch all unhandled exeptions and log them.
 * Additional logs will help us to make project more stable
 */
process.on('uncaughtException', (error, origin) => {
    logger.error('UncaughtExceptionError => Error:', {
        data: {
            message: error.message,
            stack: error.stack || 'Stack not provided',
            error,
            origin,
        },
    });
});

process.on('unhandledRejection', (error, origin) => {
    logger.error('UnhandledRejectionError => Error:', {
        data: {
            message: error.message,
            stack: error.stack || 'Stack not provided',
            error,
            origin,
        },
    });
});
