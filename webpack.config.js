const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cssNano = require('cssnano');

const plugins = [];

plugins.push(new HtmlWebPackPlugin({
  hash: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    removeComments: true,
  },
  filename: 'index.html',
  template: path.resolve(__dirname, 'public/index.html'),
}));
plugins.push(new ExtractTextPlugin('styles.css'));

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  plugins.push(new BabiliPlugin());
  plugins.push(new OptimizeCSSAssetsPlugin({
    cssProcessor: cssNano,
    cssProcessorOptions: {
      discardComments: {
        removeAll: true,
      },
    },
    canPrint: true,
  }));
}

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins,
};
