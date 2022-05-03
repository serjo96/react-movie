import webpack from 'webpack';
import 'webpack-dev-server';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import loaders from './webpack.loaders';
import resolve from './webpack.resolve';

const isDevelopment = process.env.NODE_ENV !== 'production';

const mainConfig = (config: webpack.Configuration): webpack.Configuration => ({
  mode: isDevelopment ? 'development' : 'production',
  entry: [
    path.join(__dirname, './../src/index.tsx') // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL === 'source-map' ? 'source-map' : 'eval-source-map',
  resolve,
  module: {
    rules: loaders
  },
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    errorDetails: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './style.css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './../src/template.html'),
      hash: !isDevelopment,
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    })
  ].filter(Boolean) as webpack.Configuration['plugins'],
  ...config
});

export default mainConfig;
