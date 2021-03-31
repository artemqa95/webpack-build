const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`
const cssLoaders = extra => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {}
    }, 'css-loader']
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}
const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    if (preset) opts.presets.push(preset)
    return opts
}
const jsLoabers = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) loaders.push('eslint-loader')
    return loaders
}
const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/fav.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]
    if (!isDev) base.push(new BundleAnalyzerPlugin())
    return base
}

console.log(isDev)
module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        main: ['@babel/polyfill', "./index.jsx"],
        analytics: './analytics.ts'
    },
    mode: "development",
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ],
    },
    resolve: {
        extensions: [".js", '.json',],
        alias: {
            "@models": path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    devtool: isDev? 'source-map': false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoabers()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}