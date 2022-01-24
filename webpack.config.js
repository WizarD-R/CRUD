const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const { VueLoaderPlugin } = require('vue-loader')

const isDEV = process.env.NODE_ENV === 'development'
const isPROD = !isDEV

const filename = ext => isDEV ? `[name].[hash].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if(isPROD) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        fallback: {
            querystring: false,
            // fs: false
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'title',
            template: './public/index.html',
            collapseWhitespace: isPROD,
            // favicon: 'public/favicon.ico'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: true
        }),
        new DotenvWebpack(),
        new VueLoaderPlugin()
    ],
    devServer: {
        hot: isDEV
    },
    target: isDEV ? 'web' : 'browserslist',
}
