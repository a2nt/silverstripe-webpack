/*
 * Development assets generation
 */
const common = require('./webpack.config.common.js');
const conf = common.configuration;

const path = require('path');
const fs = require('fs');

//const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const {
    merge,
} = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

const NODE_ENV = 'development'; //conf.NODE_ENV || process.env.NODE_ENV;
const COMPRESS = NODE_ENV === 'production' ? true : false;

const plugins = [
    new webpack.ProvidePlugin(common['PROVIDES']),
    new webpack.DefinePlugin(common['JSVARS']),
    //new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
];

const indexPath = path.join(__dirname, conf.APPDIR, conf.SRC, 'index.html');
if (fs.existsSync(indexPath)) {
  plugins.push(
      new HtmlWebpackPlugin({
          publicPath: '',
          template: path.join(conf.APPDIR, conf.SRC, 'index.html'),
          templateParameters: {
              NODE_ENV: NODE_ENV,
              GRAPHQL_URL: conf['GRAPHQL_URL'],
              STATIC_URL: conf['STATIC_URL'],
              REACT_SCRIPTS: NODE_ENV === 'production' ?
                  '<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script><script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>' : '<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script><script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>',
            },
        }),
  );
}

const config = merge(common.webpack, {
    mode: 'development',

    entry: {
      /*hot: [
        'react-hot-loader/patch',
        'webpack-dev-server/?https://' + conf.HOSTNAME + ':' + conf.PORT,
        'webpack/hot/only-dev-server',
      ],*/
    },

    output: {
        path: path.join(__dirname),
        filename: '[name].js',
        // necessary for HMR to know where to load the hot update chunks
        publicPath: `http${conf['HTTPS'] ? 's' : ''}://${conf['HOSTNAME']}:${
      conf.PORT
    }/`,
      },

    module: {
        rules: [{
            test: /\.(js|ts)x?$/,
            //exclude: /node_modules/,
            use: {
                loader: 'babel-loader', //'@sucrase/webpack-loader',
                options: {
                    //transforms: ['jsx']
                    presets: [
                        '@babel/preset-env',
                        '@babel/react',
                        {
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                            ],
                          },
                    ], //Preset used for env setup
                    plugins: [
                        '@babel/transform-react-jsx',
                        '@babel/plugin-transform-typescript',
                    ],
                    cacheDirectory: true,
                    cacheCompression: true,
                  },
              },
          },
        {
            test: /\.s?css$/,
            use: [{
                loader: 'style-loader', //MiniCssExtractPlugin.loader,
              },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                  },
              },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                  },
              }, ],
          },
        {
            test: /fontawesome([^.]+).(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            type: 'asset/resource',
          },
        {
            test: /\.(gif|png|jpg|jpeg|ttf|otf|eot|svg|webp|woff(2)?)$/,
            type: 'asset/resource',
          }, ],
      },
    plugins: plugins,

    devServer: {
        host: IP,
        port: PORT,
        historyApiFallback: false,
        static: path.resolve(__dirname, conf['APPDIR'], conf['SRC']),
        https: conf['HTTPS'],
        hot: false,
        //injectClient: conf['injectClient'],

        headers: {
            'Access-Control-Allow-Origin': '*',
            'Referrer-Policy': 'unsafe-url',
            'service-worker-allowed': '/',
          },
      },
  });

module.exports = config;
