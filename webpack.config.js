let webpack = require('webpack');
let path = require('path');
let loaders = require('./webpack.loaders');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let DashboardPlugin = require('webpack-dashboard/plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || '192.168.1.58';
const PORT = process.env.PORT || '8888';

loaders.push({
    test: /\.sass$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1', 'resolve-url-loader', 'sass-loader?sourceMap'],
    exclude: ['node_modules']
});

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.jsx' // your app's entry point
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, './public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    devServer: {
        contentBase: './public',
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: './style.css',
            allChunks: true
        }),
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            files: {
                css: ['style.css'],
                js: [ 'bundle.js']
            }
        })
    ]
};



