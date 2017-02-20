var webpack = require('webpack');
var minimize = process.argv.indexOf('--minimize') !== -1;

module.exports = {
    /** Build from built js file */
    entry: {
      barely: './dist/index.js',
    },
    output: {
        filename: minimize ? './umd/barely.min.js':'./umd/barely.js',
        libraryTarget: 'umd',
        /** The library name on window */
        library: 'barely'
    },
    plugins:minimize?[new webpack.optimize.UglifyJsPlugin({ minimize: true })]:[]
};