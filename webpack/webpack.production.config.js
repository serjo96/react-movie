const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },
  entry: [
    path.join(__dirname, './../src/index.jsx'),
    path.join(__dirname, './../styles/main.sass')
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, './../build'),
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
      store: path.join(__dirname, '../src/store/'),
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
      cache: true,
      hash: true,
      files: {
        css: ['style.css'],
        js: ['bundle.js']
      }
    }),
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them

        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        svgo: {
          quality: '95-100',
          optimizationLevel: 3
        },
        plugins: [
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                  quality: [0.6, 0.8],
                  optimizationLevel: 3
                }
              ]
            }
          ]
        ]
      }
    }),
    new CompressionPlugin(),
    new WebpackCleanupPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'build' }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          parse: {
            bare_returns: true
          },
          compress: {
            drop_console: true,
            warnings: true,
            hoist_funs: true
          },
          ecma: 6,
          module: true
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        preset: ['default', { discardComments: { removeAll: true }, discardUnused: true }]
      })
    ]
  }
};
