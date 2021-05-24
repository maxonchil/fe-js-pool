const path = require('path');

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebPackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebPackPlugin = require('terser-webpack-plugin');
const ImageInWebPackPlugin = require('imagemin-webpack');


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebPackPlugin(),
            new TerserWebPackPlugin(),
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.[contenthash].html',
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css',
        }),
        new ImageInWebPackPlugin({
            bail: false,
            cache: true,
            imageminOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                        "svgo",
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.(?:|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./fonts/[name].[contenthash].[ext]}`,
                    },
                }],
            },
            {
                test: /\.(?:|gif|jpeg|jpg|png|sgv|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./assets/[name].[contenthash].[ext]`,
                    },
                }],
            },
        ],
    }
});
