const BaseError = require('./base-error');

module.exports = class SingleError extends BaseError {
    constructor(message, slug, details = {}, statusCode) {
        const errors = [{
            slug,
            message,
            details,
        }];
        super(message, errors);

        this.name = this.constructor.name;
        if (statusCode) {
            this.statusCode = statusCode;
        }
        Error.captureStackTrace(this, this.constructor);
    }
};
