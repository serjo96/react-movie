const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8888';
module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx' // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, './public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      fonts: path.join(__dirname, 'src/assets/fonts/'),
      images: path.join(__dirname, 'src/assets/images/'),
      utils: path.join(__dirname, 'src/utils/'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: loaders
  },
  devServer: {
    contentBase: './public',
    // do not print bundle build stats

    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: './style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    })
  ]
};
