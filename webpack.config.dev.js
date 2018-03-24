/*
 * Development assets generation
 */

const path = require("path");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const conf = require('./webpack.configuration');

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

const config = merge.strategy({
    entry: 'prepend'
})(common, {

    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?https://' + conf.HOSTNAME + ':' + conf.PORT + '/public/resourses/site',
            'webpack/hot/only-dev-server',
        ]
    },

    output: {
        path:  path.join(__dirname, conf.DIST),
        filename: '[name].js',
        // necessary for HMR to know where to load the hot update chunks
        publicPath: 'https://' + conf.HOSTNAME + ':' + conf.PORT + '/'
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: [
                        autoprefixer({
                            // If we want to use the same browser list for more tools
                            // this list should be moved to package.json
                            // https://evilmartians.com/chronicles/autoprefixer-7-browserslist-2-released
                            browsers: [
                                'ie >= 11',
                                'ie_mob >= 11',
                                'Safari >= 10',
                                'Android >= 4.4',
                                'Chrome >= 44', // Retail
                                'Samsung >= 4'
                            ]
                        })
                    ]
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }, ]
        }, {
            test: /fontawesome([^.]+).(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'url-loader'
            }]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],

    devServer: {
        host: IP,
        port: PORT,
        historyApiFallback: true,
        hot: false,
        clientLogLevel: "info",
        //watchContentBase: true,
        overlay: {
            warnings: true,
            errors: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
});

module.exports = config;