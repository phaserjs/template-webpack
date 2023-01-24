const merge = require("webpack-merge");
const path = require("path");
const common = require('./webpack.common');
//const WebpackObfuscator = require('webpack-obfuscator');

const prod = {
  mode: "production",
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[contenthash].bundle.js'
        }
      }
    }
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  plugins: [
    // disabled by default (uncomment to active)
    // new WebpackObfuscator(
    //   {
    //     rotateStringArray: true,
    //     stringArray: true,
    //     stringArrayThreshold: 0.75
    //   },
    //   ['vendors.*.js', 'sw.js']
    // )
  ]
};

module.exports = merge(common, prod);
