import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import path from 'path';
import loaders from './webpack.loaders';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8888';
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    path.join(__dirname, './../src/index.tsx') // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      fonts: path.join(__dirname, '../src/assets/fonts/'),
      images: path.join(__dirname, '../src/assets/images/'),
      utils: path.join(__dirname, '../src/utils'),
      '@ui': path.resolve(__dirname, '../src/ui-components'),
      '@templates': path.resolve(__dirname, '../src/Templates'),
      store: path.join(__dirname, '../src/store/'),
      config: path.join(__dirname, '../src/config/'),
      '~': path.join(__dirname, '../src')
    }
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: loaders
  },
  devServer: {
    contentBase: './../public',
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
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './style.css'
    }),
    isDevelopment && new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './../src/template.html'),
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    })
  ].filter(Boolean)
};
