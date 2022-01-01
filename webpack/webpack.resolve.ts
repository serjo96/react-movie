import path from 'path';
import * as webpack from 'webpack';

const resolve: webpack.ResolveOptions = {
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
};

export default resolve;
