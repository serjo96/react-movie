import webpack from 'webpack';
import 'webpack-dev-server';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import loaders from './webpack.loaders';
import resolve from './webpack.resolve';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8888';
const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  entry: [
    path.join(__dirname, './../src/index.tsx') // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve,
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: loaders
  },
  devServer: {
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    client: {
      progress: true,
      reconnect: true,
      overlay: true
    },
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './style.css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './../src/template.html'),
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    })
  ].filter(Boolean)
};

export default config;
