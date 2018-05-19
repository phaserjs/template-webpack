'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/dockit.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'project.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.s?css/,
                use: [
                    "style-loader", //created style nodes from JS strings and HAS TO BE FIRST
                    "css-loader", //translates CSS into CommonJS
                    "sass-loader" //compiles Sass to CSS
                ]
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]

};
