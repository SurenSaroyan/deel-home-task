const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const { sequelize } = require('./models/index');
const globalErrorHandler = require('./libs/globalErrorHandler');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use(routes);
app.use((err, req, res, next) => {
    // don't remove "next" param from function
    globalErrorHandler(err, req, res);
    next();
});

module.exports = app;
