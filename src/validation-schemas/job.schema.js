const Joi = require('joi');

const schema = {};

schema.paidForJob = {
    params: Joi.object({
        job_id: Joi.number().required(),
    }),
};

module.exports = schema;
