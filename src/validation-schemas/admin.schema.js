const Joi = require('joi');

const schema = {};

schema.getBestProffesion = {
    query: Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required(),
    }),
};
schema.getBestClients = {
    query: Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required(),
        limit: Joi.number().optional(),
    }),
};

module.exports = schema;
