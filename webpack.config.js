const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: [
					{
						loader: "html-loader",
						options: { minimise: true },
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	],
};
