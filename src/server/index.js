/*eslint global-require:0, no-unused-vars:0*/
'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const knex = require('knex');
const path = require('path');

const packageInfo = require('../../package.json');

module.exports = (config) => {
  //Connecting to database and registering models
  const models = require('./models/').register(knex({
    client: 'mysql',
    connection: config.db
  }));

  const app = express();

  // Enable HTML5 features
  app.enable('jsonp callback');

  // Parse req body and URL
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // views and view engine setup
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'ejs');

  // static assets
  app.use(express.static(path.join(__dirname, '../../build')));

  // register routes
  require('./routes/index')(app, models, config);

  // Add a default statusCode to the error
  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    return next(err);
  });

  app.listen = app.listen.bind(app, config.port, config.host);
  return app;
};
