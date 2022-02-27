import path from 'path';
import * as webpack from 'webpack';

const resolve: webpack.ResolveOptions = {
  extensions: ['.js', '.ts', '.jsx', '.tsx'],
  alias: {
    fonts: path.join(__dirname, '../src/assets/fonts/'),
    styles: path.join(__dirname, '../src/styles/'),
    '~': path.join(__dirname, '../src')
  }
};

export default resolve;
