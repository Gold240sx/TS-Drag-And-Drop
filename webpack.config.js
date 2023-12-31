const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
	mode: "development",
	entry: "./src/app.ts",
	devServer: {
		static: [
			{
				directory: path.join(__dirname),
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
	},
	module: {
		rules: [
			{ test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
		}),
	],
}
