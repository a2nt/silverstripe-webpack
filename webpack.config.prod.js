/*
 * Production assets generation
 */

const webpack = require('webpack');
const conf = require('./webpack.configuration');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
    devtool: '',

    output: {
        path: path.join(__dirname, conf.DIST),
        filename: 'js/[name].js',
        publicPath: conf.DIST + '/',
    },

    module: {
        rules: [{
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: false,
                        minimize: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: false,
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
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }, ]
            })
        }, {
            test: /fontawesome([^.]+).(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '../fonts/'
                }
            }]
        }, {
            test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '../fonts/'
                }
            }]
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),

        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, conf.SRC) + '/favicon.png',
            prefix: '/icons/',
            statsFilename: conf.DIST + '/icons/iconstats.json',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: true,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                yandex: true,
                windows: true
            }
        }),
    ],
});
