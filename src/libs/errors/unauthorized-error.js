const SingleError = require('./single-error');

module.exports = class UnauthorizedError extends SingleError {
    constructor(message) {
        super('Unauthorized.', 'unauthorized', { message });

        this.name = this.constructor.name;
        this.statusCode = 401;
        Error.captureStackTrace(this, this.constructor);
    }
};
