const logger = require('./logger');

module.exports = (err, req, res) => {
    logger.log('error', 'Error handler =>', {
        data: err,
    });
    return res.status(err.statusCode || 500).json({ errors: err.errors, message: err.message }).end();
};
