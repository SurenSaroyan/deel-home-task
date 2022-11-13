const Joi = require('joi');

const schema = {};

schema.deposit = {
    params: Joi.object({
        userId: Joi.number().required(),
    }),
    body: Joi.object({
        amount: Joi.number().required(),
    }),
};

module.exports = schema;
