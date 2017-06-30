const path = require('path');

module.exports = function () {
	return {
		entry: [
			path.resolve(__dirname, '../src/index.ts')
		],
		output: {
			path: path.resolve(__dirname, '../public'),
			filename: 'js/app-[hash].js',
		},
		module: {
			rules: [
				{
					test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					loader: 'url-loader',
					options: {
						limit: 10000
					}
				},
				{
					test: /\.ts?$/,
					exclude: /node_modules/,
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: path.resolve(__dirname, '../src/tsconfig.json')
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.ts']
		}
	}
}