const { merge } = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "bundle.min.js",
    publicPath: "/",
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../"),
    }),
  ],
});
