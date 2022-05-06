import * as path from 'path';
import * as webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import SentryCliPlugin from '@sentry/webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import mainConfig from './webpack.config';

const config: webpack.Configuration = mainConfig({
  mode: 'production',
  entry: [
    path.join(__dirname, './../src/index.tsx'),
    path.join(__dirname, './../styles/main.sass')
  ],
  output: {
    publicPath: '/',
    clean: true,
    path: path.join(__dirname, './../build'),
    filename: 'js/[chunkhash].js'
  },
  optimization: {
    chunkIds: 'total-size',
    moduleIds: 'size',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          sourceMap: true,
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
});

const exportConfig: webpack.Configuration = {
  ...config,
  plugins: [
    new SentryCliPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN || '',
      org: 'curiosity-things',
      project: 'movie-base',
      include: '.',
      ignore: ['node_modules', 'webpack.config.js'],
      release: process.env.COMMIT_REF,
      dist: process.env.BUILD_ID,
      debug: true,
      validate: true,
      urlPrefix: '~/',
      deploy: {
        env: process.env.NODE_ENV,
        name: process.env.BUILD_ID
      },
      setCommits: {
        auto: true
      }
    }),
    ...config.plugins,
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
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' }
      ]
    }),
    new CompressionPlugin({
      deleteOriginalAssets: false
    })
  ]
};
export default exportConfig;
