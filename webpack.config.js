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
    module:{
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel",
            query: {
              presets: ['react','es2015']
            }            
        }]
    },
    externals: [{
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    ],
    resolve: {
        extensions: ['', '.js']
    }
};

var devBundleConfig = Object.assign({}, sharedConfig, {
    entry: {
        'main': entry
    }
}); 

var prodBundleConfig = Object.assign({}, sharedConfig, {
    entry: {
        'main.min': entry 
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),        
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
            screw_ie8: true,
            warnings: false
            }
        })
    ]
});

module.exports = [
    devBundleConfig,
    prodBundleConfig
];
