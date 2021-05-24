const path = require('path');

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        writeToDisk: true,
        port: 3000,
        hot: true,
        inline: true,
        open: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(?:|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./fonts/[name].[ext]}`,
                    },
                }],
            },
            {
                test: /\.(?:|gif|jpeg|jpg|png|sgv|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./assets/[name].[ext]}`,
                    },
                }],
            },
        ],
    },
});
