'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js'
    },

    module: {
        rules: [
          {
              test: [ /\.vert$/, /\.frag$/ ],
              use: 'raw-loader'
          },

          {
              test: /\.js$/,
              include: path.resolve(__dirname, 'src/'),
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['env']
                  }
              }
          }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 1
                }
            }
        }
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: '[name].js'
    },

    performance: {
        hints: false
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],
};
