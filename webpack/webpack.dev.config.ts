import webpack from 'webpack';
import 'webpack-dev-server';
import path from 'path';
import mainConfig from './webpack.config';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8888';

const config: webpack.Configuration = mainConfig({
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    clean: true,
    path: path.join(__dirname, './../dist'),
    filename: 'bundle.js'
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
  }
});

export default {
  ...config,
  mode: 'development',
  plugins: [
    ...config.plugins,
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
