const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './../src/index.jsx'),
    path.join(__dirname, './../styles/main.sass')
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: 'js/[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      fonts: path.join(__dirname, '../src/assets/fonts/'),
      images: path.join(__dirname, '../src/assets/images/'),
      utils: path.join(__dirname, '../src/utils/'),
      ui: path.join(__dirname, '../src/ui-components/'),
      config: path.join(__dirname, '../src/config/'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: loaders
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './../src/template.html'),
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    }),
    // new WebpackCleanupPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
};
