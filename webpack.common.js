const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    entry: './src/index.ts',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(?:|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './fonts/`[name].[contenthash].[ext]',
                    },
                }],
            },
            {
                test: /\.(?:|gif|jpeg|jpg|png|sgv|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './assets/[name].[contenthash].[ext]',
                    },
                }],
            },
            {
                test: /\.ts$/,
                use: ['babel-loader', 'ts-loader'],
                include: [path.resolve(__dirname, './src')],
                exclude: [/node_modules/, /\.spec\.ts$/],
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, './src')],
                exclude: /node_modules/,
            },
        ],
    },
}
