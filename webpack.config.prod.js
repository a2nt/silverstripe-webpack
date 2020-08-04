/*
 * Production assets generation
 */

const webpack = require('webpack');
const commonVariables = require('./webpack.configuration');
const conf = commonVariables.configuration;
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const filesystem = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const ImageminPlugin = require('imagemin-webpack');
//const ImageSpritePlugin = require('@a2nt/image-sprite-webpack-plugin');

const COMPRESS = true;

console.log('WebP images: ' + conf['webp']);

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true,
  }),
  new OptimizeCssAssetsPlugin({
    //assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default'],
    },
    cssProcessorOptions: {
      zindex: true,
      cssDeclarationSorter: true,
      reduceIdents: false,
      mergeIdents: true,
      mergeRules: true,
      mergeLonghand: true,
      discardUnused: true,
      discardOverridden: true,
      discardDuplicates: true,
      discardComments: {
        removeAll: true,
      },
    },
    canPrint: true,
  }),
  new FaviconsWebpackPlugin({
    title: 'Webpack App',
    logo: path.join(__dirname, conf.APPDIR, conf.SRC, 'favicon.png'),
    prefix: '/icons/',
    emitStats: false,
    persistentCache: true,
    inject: false,
    statsFilename: path.join(conf.APPDIR, conf.DIST, 'icons', 'iconstats.json'),
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
  /*new ImageminPlugin({
    bail: false, // Ignore errors on corrupted images
    cache: true,
    maxConcurrency: 3,
    exclude: /original/,
    filter: (source, sourcePath) => {
      return source.byteLength < 512000;
    },
    imageminOptions: {
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
        [
          'svgo',
          {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        ],
        ['webp', { quality: 100 }],
      ],
    },
  }),*/
  /*new ImageSpritePlugin({
    exclude: /exclude|original|default-|icons|sprite/,
    commentOrigin: false,
    compress: true,
    extensions: ['png'],
    indent: '',
    log: true,
    //outputPath: path.join(__dirname, conf.APPDIR, conf.DIST),
    outputFilename: 'img/sprite-[hash].png',
    padding: 0,
  }),*/
];

// add themes favicons
commonVariables.themes.forEach((theme) => {
  const faviconPath = path.join(__dirname, theme, conf.SRC, 'favicon.png');
  if (filesystem.existsSync(faviconPath)) {
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

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    removeAvailableModules: false,
    namedModules: true, // NamedModulesPlugin()
    splitChunks: {
      // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: 2,
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, //ModuleConcatenationPlugin
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
      }),
    ],
  },

  devtool: '',

  output: {
    path: path.join(__dirname, conf.APPDIR, conf.DIST),
    filename: path.join('js', '[name].js'),
    publicPath: path.join(conf.APPDIR, conf.DIST),
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: ExtractTextPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !COMPRESS,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !COMPRESS,
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !COMPRESS,
            },
          },
        ],
      },
      {
        test: /fontawesome([^.]+).(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|webp|jpg|jpeg|gif|svg)$/,
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
          },
          inline: {
            limit: 1,
          },
        },
      },
    ],
  },

  plugins: plugins,
});
