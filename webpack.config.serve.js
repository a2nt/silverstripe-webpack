/*
 * Development assets generation
 */

const COMPRESS = false;

const path = require('path');
//const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.config.common.js');
const commonVariables = require('./webpack.configuration');
const conf = commonVariables.configuration;

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

const UIInfo = require('./node_modules/@a2nt/ss-bootstrap-ui-webpack-boilerplate/package.json');
const UIMetaInfo = require('./node_modules/@a2nt/meta-lightbox/package.json');

const config = merge(common, {
  mode: 'development',

  entry: {
    hot: [
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
        test: /\.jsx?$/,
        //exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], //Preset used for env setup
            plugins: [['@babel/transform-react-jsx']],
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !COMPRESS,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
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
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      UINAME: JSON.stringify(UIInfo.name),
      UIVERSION: JSON.stringify(UIInfo.version),
      UIAUTHOR: JSON.stringify(UIInfo.author),
      UIMetaNAME: JSON.stringify(UIMetaInfo.name),
      UIMetaVersion: JSON.stringify(UIMetaInfo.version),
    }),
  ],

  devServer: {
    host: IP,
    port: PORT,
    historyApiFallback: true,
    //hot: true,
    /*clientLogLevel: 'info',
    disableHostCheck: true,
    contentBase: [
      path.resolve(__dirname, 'public'),
      path.resolve(__dirname, 'public', 'resources'),
      path.resolve(__dirname, 'public', 'resources', conf.APPDIR, conf.DIST),
      'node_modules',
    ],*/
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
