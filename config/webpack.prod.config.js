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
            use: [
              { loader: 'css-loader', options: { minimize: true, importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [require('autoprefixer')]
                }
              },
              'resolve-url-loader',
              'sass-loader?sourceMap'
            ]
          })
        }
      ]
    },
    plugins: [
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
        title: require('../package.json').name,
        template: path.resolve(__dirname, '../src/index.template.ejs'),
        favicon: path.resolve(__dirname, '../resources/logo.svg')
      }),
      new ExtractTextPlugin('css/app-[hash].css'),
    ],
    devtool: 'nosources-source-map',
  });
}
