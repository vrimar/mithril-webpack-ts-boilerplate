const path = require('path');
const baseConfig = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = function () {
  return merge(baseConfig(), {
    plugins: [
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.template.ejs'),
        alwaysWriteToDisk: true
      }),
      new HtmlWebpackHarddiskPlugin(),
      new OpenBrowserPlugin({ url: 'http://localhost:8000' })
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


