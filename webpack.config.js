/**
 *
 * Created by yikazhu on 2015/7/17.
 */
var path = require('path');

var webpack = require('webpack');

module.exports = {
    entry: './src/FileUpload.js',

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
            }
        ]
    },
};