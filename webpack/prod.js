const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
var webpack = require('webpack');

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false
      })
    ]
  }
});
