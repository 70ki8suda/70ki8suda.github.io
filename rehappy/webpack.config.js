//sudo npm install webpack webpack-build-notifier glob extract-text-webpack-plugin browser-sync browser-sync-webpack-plugin css-loader sass-loader style-loader node-sass babel-core babel-loader babel-preset-es2015 html-loader pug-html-loader import-glob-loader html-webpack-plugin --save-dev

var webpack = require("webpack");
var path                       = require('path');
var glob = require("glob");

var ExtractTextPlugin          = require('extract-text-webpack-plugin');
var BrowserSyncPlugin          = require('browser-sync-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');


    module.exports = [
    {
    entry: {
        style: './scss/style.scss'
    },
    output: {
        path: path.join(__dirname, ''),
        filename: 'style.css'
    },
    module: {
          rules: [
            {
              enforce: 'pre',
              test: /\.scss$/,
              loader: 'import-glob-loader'
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract('css-loader?url=false!sass-loader')
            }

        ]
    },

    watch:true,
    plugins: [
        new WebpackBuildNotifierPlugin(),
        new ExtractTextPlugin('[name].css'),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: false,
            server: { __dirname },
            files: [
                '*.css',
                '*.html',
                'js/*.js'
            ]
        })
        ]
    }
    ,{
    entry: {
      js: glob.sync("./js/*.js")
     },
     output: {
       path: path.join(__dirname, './'),
       filename: "bundle.js"
     },
     module: {
       loaders: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader',
           query: {
             presets: ['es2015']
           }
         }
       ]
     },
     plugins: [
        new webpack.optimize.UglifyJsPlugin()
      ],
     watch:true
   }



  ];
