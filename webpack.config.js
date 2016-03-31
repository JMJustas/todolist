var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src/client/js'),
  devtool: 'inline-sourcemap',
  entry: './app.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs']
        }
      }
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: []
};
