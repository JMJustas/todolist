'use strict';

module.exports = (app) => {
  app.route('/')
    .get((req, res) => {
      return res.render('index', {
        stylesheet: 'style.css'
      });
    });

  return app;
};
