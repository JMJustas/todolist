var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha', 'sinon' ],
    files: [
      'tests.webpack.config.js'
    ],
    preprocessors: {
      'tests.webpack.config.js': [ 'webpack']
    },
    reporters: [ 'dots' ],
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
