const path = require("path")
const CleanPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	mode: "production",
	entry: "./src/app.ts",
	devServer: {
		static: [
			{
				directory: path.join(__dirname),
			},
		],
	},
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [{ test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Caching",
			template: "index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
		}),
		new CleanPlugin.CleanWebpackPlugin(),
	],
}
