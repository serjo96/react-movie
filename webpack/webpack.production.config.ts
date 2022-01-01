import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import loaders from './webpack.loaders';
import resolve from './webpack.resolve';

const config: webpack.Configuration = {
  mode: 'production',
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
  entry: [
    path.join(__dirname, './../src/index.tsx'),
    path.join(__dirname, './../styles/main.sass')
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, './../build'),
    filename: 'js/[chunkhash].js'
  },
  resolve,
  module: {
    rules: loaders
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
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
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          svgo: {
            quality: '95-100',
            optimizationLevel: 3
          },
          plugins: [
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
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
      }
    }),
    // new CompressionPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' }
      ]
    }),
    new CompressionPlugin()
  ],
  optimization: {
    chunkIds: 'total-size',
    moduleIds: 'size',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          parse: {
            bare_returns: true
          },
          compress: {
            drop_console: true,
            hoist_funs: true
          },
          module: true
        }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              discardUnused: true
            }
          ]
        }
      })
    ]
  }
};

export default config;
