const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    entry: PATHS.source + '/js/main.js',
    output: {
        path: PATHS.build,
        publicPath:"../",
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
        }, {
            test: /\.css$/,
            loader: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: [ 'css-loader', 'resolve-url-loader' ]
            })
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'file-loader?name=img/[name].[ext]'
        },  {
            test: /\.(ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }
        ]
    },
    plugins: [
        new extractTextPlugin('./css/style.css'),
        new HtmlPlugin({
            filename: 'index.html',
            title: 'Другофильтр',
            template: PATHS.source + '/index.hbs'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "/public"),
        stats: 'errors-only',
        port: 8080
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
};