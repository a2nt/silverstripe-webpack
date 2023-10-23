/*
 * Production assets generation
 */
const common = require('./webpack.config.common.js');
const conf = common.configuration;

const webpack = require('webpack');
const {
    merge,
} = require('webpack-merge');

const fs = require('fs');
const path = require('path');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//const ImageSpritePlugin = require('@a2nt/image-sprite-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifications = require('webpack-build-notifications');

const NODE_ENV = conf.NODE_ENV || process.env.NODE_ENV;
const COMPRESS = NODE_ENV === 'production' ? true : false;

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

const plugins = [
    new webpack.ProvidePlugin(common['PROVIDES']),
    new webpack.DefinePlugin(common['JSVARS']),
    new webpack.LoaderOptionsPlugin({
        minimize: COMPRESS,
        debug: !COMPRESS,
      }),
    new MiniCssExtractPlugin({
      experimentalUseImportModule: false,
      filename: 'css/[name].css',
      //allChunks: true,
    }),
    new WebpackBuildNotifications({
      title: common['JSVARS']['UINAME'] + ' ' + common['JSVARS']['UIVERSION'],
      logo: path.join(__dirname, conf.APPDIR, conf.SRC, 'favicon.png'),
      suppressWarning: true,
    }),
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
              STATIC_URL: conf['STATIC_URL']
            },
          xhtml: true,
        }),
  );
}

const faviconPath = path.join(__dirname, conf.APPDIR, conf.SRC, 'favicon.png');
if (fs.existsSync(faviconPath)) {
  plugins.push(
      new FaviconsWebpackPlugin({
          title: 'Webpack App',
          logo: faviconPath,
          prefix: '/icons/',
          emitStats: false,
          persistentCache: true,
          inject: false,
          statsFilename: path.join(
              conf.APPDIR,
              conf.DIST,
              'icons',
              'iconstats.json',
          ),
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
              windows: true,
            },
        }),
  );
}

// add themes favicons
common.themes.forEach((theme) => {
    const faviconPath = path.join(__dirname, theme, conf.SRC, 'favicon.png');
    if (fs.existsSync(faviconPath)) {
      plugins.push(
          new FaviconsWebpackPlugin({
              title: 'Webpack App',
              logo: faviconPath,
              prefix: '/' + theme + '-icons/',
              emitStats: false,
              persistentCache: true,
              inject: false,
              statsFilename: path.join(
                  conf.APPDIR,
                  conf.DIST,
                  theme + '-icons',
                  'iconstats.json',
              ),
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
                  windows: true,
                },
            }),
      );
    }
  });

const minimizers = [];
minimizers.push(
  new TerserPlugin({
    terserOptions: {
        module: false,
        parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
        compress: {
            ecma: 6,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
          },
        keep_fnames: true,
        keep_classnames: true,

        mangle: {
            safari10: true,
            keep_fnames: true,
            keep_classnames: true,
            reserved: ['$', 'jQuery', 'jquery'],
          },
        output: {
            ecma: 6,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
      },
    // Use multi-process parallel running to improve the build speed
    // Default number of concurrent runs: os.cpus().length - 1
    parallel: true,
  })
);

if (conf['PROCESS_CSS']) {
  minimizers.push(
    new CssMinimizerPlugin({
      parallel: true,
      minimizerOptions: [{
          preset: [
              'default',
              {
                  discardComments: {
                      removeAll: true,
                    },
                  zindex: true,
                  cssDeclarationSorter: true,
                  reduceIdents: false,
                  mergeIdents: true,
                  mergeRules: true,
                  mergeLonghand: true,
                  discardUnused: true,
                  discardOverridden: true,
                  discardDuplicates: true,
                },
          ],
        },],
      minify: [
          CssMinimizerPlugin.cssnanoMinify,
          //CssMinimizerPlugin.cleanCssMinify,
      ],
    })
  );
}

if (COMPRESS) {
  plugins.push(require('autoprefixer'));

  /*plugins.push(
      new ImageSpritePlugin({
          exclude: /exclude|original|default-|icons|sprite|svg|logo|favicon/,
          commentOrigin: false,
          compress: COMPRESS,
          extensions: ['png'],
          indent: '',
          log: true,
          //outputPath: path.join(__dirname, conf.APPDIR, conf.DIST),
          outputFilename: 'img/sprite-[hash].png',
          padding: 0,
      }),
  );*/
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
plugins.push(
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
);

const cfg = merge(common.webpack, {
    mode: NODE_ENV,
    cache: {
        type: 'filesystem',
      },
    recordsPath: path.join(__dirname, conf.APPDIR, conf.DIST, 'records.json'),
    optimization: {
        //removeAvailableModules: false,
        //realContentHash: false,
        splitChunks: {
            name: 'vendor',
            minChunks: 2,
          },
        concatenateModules: true, //ModuleConcatenationPlugin
        minimizer: minimizers,
      },

    output: {
        publicPath: path.join(conf.APPDIR, conf.DIST) + '/',
        path: path.join(__dirname, conf.APPDIR, conf.DIST) + '/',
        filename: path.join('js', '[name].js'),
      },

    module: {
        rules: [{
            test: /\.(js|ts)x?$/,
            //exclude: /node_modules/,
            use: {
                loader: 'babel-loader',//'@sucrase/webpack-loader',
                options: {
                    "presets": ["@babel/preset-env"],
                    "plugins": [
                        [
                            "@babel/plugin-transform-react-jsx",
                            {
                                "pragma": "m",
                                "pragmaFrag": "'['"
                            }
                        ]
                    ],
                    cacheDirectory: true,
                    cacheCompression: true,
                  },
              },
          },
        {
            test: /\.s?css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                      },
                  },
                {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true,
                      esModule: true,
                    },
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
            test: /fontawesome([^.]+).(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
            type: 'asset/resource',
          },
        {
            test: /\.(ttf|otf|eot|woff(2)?)$/,
            type: 'asset/resource',
          }, {
            test: /\.(png|webp|jpg|jpeg|gif|svg)$/,
            type: 'javascript/auto',
            use: [
            {
                loader: 'img-optimize-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/',
                    publicPath: '../img/',
                    compress: {
                        // This will take more time and get smaller images.
                        mode: 'low', // 'lossless', 'high', 'low'
                        disableOnDevelopment: true,
                        webp: conf['webp'],
                        // loseless compression for png
                        optipng: {
                            optimizationLevel: 4,
                          },
                        // lossy compression for png. This will generate smaller file than optipng.
                        pngquant: {
                            quality: [0.2, 0.8],
                          },
                        // Compression for svg.
                        svgo: true,
                        // Compression for gif.
                        gifsicle: {
                            optimizationLevel: 3,
                          },
                        // Compression for jpg.
                        mozjpeg: {
                            progressive: true,
                            quality: 60,
                          },
                      },
                    inline: {
                        limit: 1,
                      },
                  },
              },],
          },],
      },

    plugins: plugins,
  });

console.log(cfg);
module.exports = cfg;
