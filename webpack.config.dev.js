/*
 * Development assets generation
 */

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const commonVariables = require('./webpack.configuration');
const conf = commonVariables.configuration;

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

const config = merge.strategy({
  entry: 'prepend',
})(common, {
  mode: 'development',

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://' + conf.HOSTNAME + ':' + conf.PORT,
      'webpack/hot/only-dev-server',
    ],
  },

  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    // necessary for HMR to know where to load the hot update chunks
    publicPath: 'https://' + conf.HOSTNAME + ':' + conf.PORT + '/',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /fontawesome([^.]+).(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|ttf|otf|eot|svg|webp|woff(2)?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return 'public/[path][name].[ext]';
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    host: IP,
    port: PORT,
    historyApiFallback: true,
    hot: false,
    clientLogLevel: 'info',
    disableHostCheck: true,
    contentBase: [
      path.resolve(__dirname, 'public'),
      path.resolve(__dirname, 'public', 'resources'),
      path.resolve(__dirname, 'public', 'resources', conf.APPDIR, conf.DIST),
      'node_modules',
    ],
    //watchContentBase: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

module.exports = config;
