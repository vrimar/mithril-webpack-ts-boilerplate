const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
	return merge(baseConfig(), {
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
					})
				}
			]
		},
		plugins: [
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					screw_ie8: true
				},
				comments: false
			}),
			new HtmlWebpackPlugin({
				title: 'Boilerplate',
				hash: true,
				template: path.resolve(__dirname, '../src/index.template.ejs')
			}),
			new ExtractTextPlugin('css/app.css')
		],
		devtool: 'nosources-source-map',
	});
}
