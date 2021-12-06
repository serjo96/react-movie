const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = [
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
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    use: [
      {
        loader: 'babel-loader',
	      options: {
		      presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
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
		  'css-loader',
		  {
			  loader: 'sass-loader',
			  options: {
				  // Prefer `dart-sass`
				  implementation: require('dart-sass')
			  }
		  }
	  ]
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
