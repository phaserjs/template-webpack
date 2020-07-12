const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "eval-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: [/\.vert$/, /\.frag$/],
				use: "raw-loader",
			},
			{
				test: /\.(gif|png|jpe?g|svg|xml)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "images/",
						},
					},
				],
			},
			{
				test: /\.(mp3|ogg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "sounds/",
						},
					},
				],
			},
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, "../"),
		}),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true),
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
		new MiniCSSExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
};
