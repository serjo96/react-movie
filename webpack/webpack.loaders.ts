import * as webpack from 'webpack';
const isDevelopment = process.env.NODE_ENV !== 'production';

const loaders: webpack.ModuleOptions['rules'] = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.js?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  {
    test: /\.[j]sx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean)
        }
      }
    ]
  },
  {
    test: /\.css$/,
    exclude: /(node_modules|bower_components|public\/)/,
    use: ['style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }
    ]
  },
  {
    test: /\.sass$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: {
          // Prefer `dart-sass`
          implementation: require('dart-sass'),
          sassOptions: {
            sourceMap: isDevelopment
          }
        }
      }
    ]
  },
  {
    test: /\.(woff2?|ttf|otf|eot|svg)$/,
    type: 'asset/resource',
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader',
        options: {
          outputPath: 'fonts/'
        }
      }
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml/'
      }
    ]
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      }
    ]
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      }
    ]
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }
    ]
  }
];

export default loaders;
