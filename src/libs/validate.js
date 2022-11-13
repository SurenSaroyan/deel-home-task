const logger = require('./logger');

const MultiValidateError = require('./errors/validation/multi-validate-error');

function requestValidator(validationSchema) {
    return async (req, res, next) => {
        const inputTypes = ['params', 'query', 'body', 'headers'];
        let input;
        for (let i = 0; i < inputTypes.length; i++) {
            const joiSchema = validationSchema[inputTypes[i]];
            if (!joiSchema) {
                continue;
            }

            logger.info(`Validating input ${inputTypes[i]}`);

            if (inputTypes[i] === 'params') {
                input = req.params;
            } else {
                input = req[inputTypes[i]];
            }

            const response = joiSchema.validate(input, {
                abortEarly: false,
            });

            if (response.error) {
                const { error } = response;
                if (error.details && error.details.length) {
                    const errors = error.details.map((err) => ({
                        message: err.message,
                        slug: `invalid-${err.context.key}-${err.type.replace(/\./g, '-').toLowerCase()}`,
                        details: { path: err.path },
                    }));
                    next(new MultiValidateError(response.error.message, errors));
                }
            }
        }

        return next();
    };
}

module.exports = requestValidator;
