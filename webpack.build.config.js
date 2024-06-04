
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {

    mode: "development",
    target: "node",
    watch:"development",
    externals: [NodeExternals()],
    entry: path.resolve(__dirname, 'src'),
    output:{
        filename: "index.js",
        path: path.resolve(__dirname, "public")
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.gql$/ ,
                exclude: /node_modules/,
                loader: "graphql-tag/loader"
            }
        ]
    },
    resolve: {
        extensions:["*.ts" , "*.js"],
        plugins: [new TsconfigPathsPlugin()]
    }
}