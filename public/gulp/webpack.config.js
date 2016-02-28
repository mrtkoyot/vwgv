var webpack = require("webpack");
var path    = require('path');

module.exports = {

    // entry point of our application
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '../site/templates/scripts', 'init.js'),
    ],

    // where to place the compiled bundle
    output: {
        path: path.resolve(__dirname, '../site/templates/scripts'),
        publicPath: '/site/templates/scripts/',
        filename: 'main.js'
    },

    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [

            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                loader: 'vue'   // loader to use for matched files
            },

            {
                test   : /\.js$/,
                // loader : 'babel!eslint',
                loader : 'babel',
                exclude: /node_modules/
            },

            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },

            {
                test  : /\.json$/,
                loader: 'json'
            },

            {
                test  : /\.html$/,
                loader: 'html'
            },

            {
                test  : /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query : {
                    limit: 10000,
                    name : '[name].[ext]?[hash:7]'
                }
            }

        ]
    },

    babel: {
        // enable stage 0 babel transforms.
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    },

    vue: {
        loaders: {
            // js: 'babel!eslint'
            js: 'babel'
        }
    },

    // eslint: {
    //     formatter: require('eslint-friendly-formatter')
    // },

    plugins: [
        // Webpack 1.0
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

}
