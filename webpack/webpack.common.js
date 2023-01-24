const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// To maintain a manifest file of your project containing information 
// such as the version number of your application, 
// the names of the output files, and the URLs of the assets that were built.
//const { InjectManifest } = require('workbox-webpack-plugin'); 



module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [

      {
        test: /\.tsx?$|\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
        loader: 'ts-loader'
       },
       {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(), //Show build progress in cli
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      gameName: 'Phaser game project template', //Change name here
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        //{ from: 'pwa', to: ''}
      ]
    }),
    // new InjectManifest({
    //   swSrc: path.resolve(__dirname, '../pwa/sw.js'),
    //   swDest: 'sw.js'
    // })
  ]
};
