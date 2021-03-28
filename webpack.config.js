const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        main: "./index.js",
        analytics: './analytics.js'
    },
    mode: "development",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader, css-loader']
        }]
    }
}