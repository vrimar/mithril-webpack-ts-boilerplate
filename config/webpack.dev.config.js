const path = require('path');
const baseConfig = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = function () {
	return merge(baseConfig(), {
		plugins: [
			new webpack.NamedModulesPlugin()
		],
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
				},
			]
		},
		devtool: 'cheap-eval-source-map',
		devServer: {
			contentBase: path.resolve(__dirname, '../public/'),
			port: 8000,
			stats: 'errors-only'
		}
	})
}


