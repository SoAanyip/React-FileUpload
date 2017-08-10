var path = require('path');
var webpack = require('webpack');
var entry = path.resolve(__dirname, 'src/FileUpload.js');

var sharedConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'react-fileupload',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|tmp)/,
            loader: 'babel-loader'
        }]
    },
    externals: [{
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    }]
};

var devBundleConfig = Object.assign({}, sharedConfig, {
    entry: {
        'main': entry
    }
});

var prodBundleConfig = Object.assign({}, sharedConfig, {
    entry: {
        'main.min': entry
    }/*,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    ]*/
});

module.exports = [
    devBundleConfig,
    prodBundleConfig
];
