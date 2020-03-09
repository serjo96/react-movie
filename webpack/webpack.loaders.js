module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'null-loader'
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
    loaders: ['style-loader', {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    }, 'resolve-url-loader', 'sass-loader?sourceMap'],
    exclude: /(node_modules|bower_components|public\/)/
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/'
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader?prefix=font/&limit=5000',
        options: {
          outputPath: 'fonts/'
        }
      }
    ]
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
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
