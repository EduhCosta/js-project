// const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const plugins = [];

plugins.push(new HtmlWebPackPlugin({
  hash: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    removeComments: true,
  },
  filename: 'index.html',
  template: path.resolve(__dirname, '/public/index.html'),
}));

module.exports = {
  mode: 'development',
  entry: {
    filename: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins,
};
