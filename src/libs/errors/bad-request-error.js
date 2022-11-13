const SingleError = require('./single-error');

module.exports = class BadRequestError extends SingleError {
    constructor(message, path) {
        const details = {
            path,
        };

        super(message, `${path}-is-invalid`, details);

        this.name = this.constructor.name;
        this.statusCode = 400;

        Error.captureStackTrace(this, this.constructor);
    }
};
