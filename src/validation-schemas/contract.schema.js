const Joi = require('joi');

const schema = {};

schema.getContract = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = schema;
