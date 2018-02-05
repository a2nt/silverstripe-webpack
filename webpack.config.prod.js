const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const conf = require('./webpack.configuration');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const fs = require("fs");
const yaml = require("js-yaml");
const confYML = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "site/_config/webpack.yml"), "utf8"));

module.exports = merge(common, {

    output: {
        path: conf.BUILD,
        filename: '[name].js',
        publicPath: confYML.WebpackTemplateProvider.dist + '/',
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
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
                            }),
                            // http://lostgrid.org/docs.html
                            require('lost')
                        ]
                    }
                }, {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }, ]
            })
        }, ]
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new OptimizeCSSAssets(),
        new FaviconsWebpackPlugin({
            logo: conf.SRC + '/favicon.png',
            prefix: '/icons/',
            statsFilename: confYML.WebpackTemplateProvider.dist + '/icons/iconstats.json',
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