var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module:{
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel",
            query: {
              presets: ['react','es2015']
            },
            //include: path.resolve(__dirname),
            /*exclude: "/node_modules/"*/
        }]
    },

}