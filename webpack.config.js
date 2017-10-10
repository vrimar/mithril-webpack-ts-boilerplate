const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = {
  common: [
    new webpack.NamedModulesPlugin(),
  ],
  production: [
    new ExtractTextPlugin('app-[hash:6].css'),
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
      title: 'b3Intelligence ProjectManagement Tool',
      template: 'src/index.template.ejs'
    })
  ],
  development: [
    new HtmlWebpackPlugin({
      template: 'src/index.template.ejs',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}

const cssLoader = {
  production: ExtractTextPlugin.extract({
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
  }),
  development: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?source-map']
}

module.exports = {
  context: __dirname,
  entry: './src/index.ts',
  output: {
    filename: isProduction ? 'app-[hash:6].js' : 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: isProduction ? cssLoader.production : cssLoader.development
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: path.resolve(__dirname, 'src/tsconfig.json')
        }
      }
    ]
  },
  plugins: plugins.common.concat(isProduction ? plugins.production : plugins.development),
  devtool: isProduction ? 'source-map' : 'cheap-eval-source-map',
  devServer: {
    contentBase: __dirname,
    port: 8080,
    stats: 'errors-only',
    watchOptions: {
      ignored: /node_modules/
    }
  }
}