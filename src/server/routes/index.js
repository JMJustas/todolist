'use strict';
const EntriesController = require('../controllers/entries');

module.exports = (app, models) => {
  app.route('/')
    .get((req, res) => {
      return res.render('index', {
        stylesheet: 'style.css'
      });
    });

  app.route('/entries')
    .get(EntriesController.findAll)
    .post(EntriesController.create);

  app.route('/entries/:id')
    .get(EntriesController.findOne)
    .put(EntriesController.update);

  return app;
};
