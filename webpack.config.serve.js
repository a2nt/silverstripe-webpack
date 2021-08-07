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
    merge
} = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

const UIInfo = require('./package.json');
test: /\.(png|webp|jpg|jpeg|gif|svg)$/,
    type: "asset/resource",
},
const UIVERSION = JSON.stringify(UIInfo.version);
const UIMetaInfo = require('./node_modules/@a2nt/meta-lightbox-js/package.json');

const NODE_ENV = 'development'; //conf.NODE_ENV || process.env.NODE_ENV;
const COMPRESS = NODE_ENV === 'production' ? true : false;

console.log('NODE_ENV: ' + NODE_ENV);
console.log('COMPRESS: ' + COMPRESS);
console.log('WebP images: ' + conf['webp']);
console.log('GRAPHQL_API_KEY: ' + conf['GRAPHQL_API_KEY']);
console.log('HTTPS: ' + conf['HTTPS']);

const plugins = [
    new webpack.ProvidePlugin({
        react: 'React',
        'react-dom': 'ReactDOM',
        /*$: 'jquery',
          jQuery: 'jquery',*/
    }),
    new webpack.DefinePlugin({
        UINAME: JSON.stringify(UIInfo.name),
        UIVERSION: UIVERSION,
        UIAUTHOR: JSON.stringify(UIInfo.author),
        UIMetaNAME: JSON.stringify(UIMetaInfo.name),
        UIMetaVersion: JSON.stringify(UIMetaInfo.version),
        GRAPHQL_API_KEY: JSON.stringify(conf['GRAPHQL_API_KEY']),
        SWVERSION: JSON.stringify(`sw-${new Date().getTime()}`),
        BASE_HREF: JSON.stringify(
            `http${conf['HTTPS'] ? 's' : ''}://${IP}:${PORT}`,
        ),
    }),
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
            test: /\.jsx?$/,
            //exclude: /node_modules/,
            use: {
                loader: '@sucrase/webpack-loader', //'babel-loader',
                options: {
                    transforms: ['jsx']
                    /*presets: [
                        '@babel/preset-env',
                        '@babel/react',
                        {
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-syntax-top-level-await',
                            ],
                        },
                    ], //Preset used for env setup
                    plugins: [
                        ['@babel/transform-react-jsx'],
                        ['@babel/plugin-syntax-top-level-await'],
                    ],
                    cacheDirectory: true,
                    cacheCompression: true,*/
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
