const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

loaders.push({
  test: /\.sass$/,
  loaders: ['style-loader', {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }, 'resolve-url-loader', 'sass-loader?sourceMap'],
  exclude: /(node_modules|bower_components|public\/)/
});

module.exports = {
  entry: [
    './../src/index.jsx',
    './../styles/main.sass'
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: 'js/[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './../src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    })
  ]
};
