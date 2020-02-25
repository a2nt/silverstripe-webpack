/*
 * Common Environment
 */

const webpack = require('webpack');
const commonVariables = require('./webpack.configuration');
const conf = commonVariables.configuration;

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');
const filesystem = require('fs');

const includes = {};
const modules = [
	path.resolve(__dirname, 'public'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'js'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'scss'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'img'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'thirdparty'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'node_modules'),
	path.resolve(__dirname, 'node_modules'),
];

const _addAppFiles = theme => {
	const dirPath = path.resolve(__dirname, theme);
	const themeName = path.basename(theme);

	if (filesystem.existsSync(path.join(dirPath, conf.SRC, 'js', 'app.js'))) {
		includes[`${themeName}`] = path.join(dirPath, conf.SRC, 'js', 'app.js');
	} else if (
		filesystem.existsSync(path.join(dirPath, conf.SRC, 'scss', 'app.scss'))
	) {
		includes[`${themeName}`] = path.join(
			dirPath,
			conf.SRC,
			'scss',
			'app.scss',
		);
	}

	modules.push(path.join(dirPath, 'client', 'src', 'js'));
	modules.push(path.join(dirPath, 'client', 'src', 'scss'));
	modules.push(path.join(dirPath, 'client', 'src', 'img'));
	modules.push(path.join(dirPath, 'client', 'src', 'thirdparty'));

	const _getAllFilesFromFolder = function(dir, includeSubFolders = true) {
		const dirPath = path.resolve(__dirname, dir);
		let results = [];

		filesystem.readdirSync(dirPath).forEach(file => {
			if (file.charAt(0) === '_') {
				return;
			}

			const filePath = path.join(dirPath, file);
			const stat = filesystem.statSync(filePath);

			if (stat && stat.isDirectory() && includeSubFolders) {
				results = results.concat(
					_getAllFilesFromFolder(filePath, includeSubFolders),
				);
			} else {
				results.push(filePath);
			}
		});

		return results;
	};

	// add page specific scripts
	const typesJSPath = path.join(theme, conf.TYPESJS);
	if (filesystem.existsSync(typesJSPath)) {
		const pageScripts = _getAllFilesFromFolder(typesJSPath, true);
		pageScripts.forEach(file => {
			includes[`${themeName}_${path.basename(file, '.js')}`] = file;
		});
	}

	// add page specific scss
	const typesSCSSPath = path.join(theme, conf.TYPESSCSS);
	if (filesystem.existsSync(typesSCSSPath)) {
		const scssIncludes = _getAllFilesFromFolder(typesSCSSPath, true);
		scssIncludes.forEach(file => {
			includes[`${themeName}_${path.basename(file, '.scss')}`] = file;
		});
	}
};

_addAppFiles(conf.APPDIR);

// add themes
commonVariables.themes.forEach(theme => {
	_addAppFiles(theme);
});

module.exports = {
	entry: includes,
	devtool: 'source-map',
	externals: {
		jquery: 'jQuery',
	},
	optimization: {
		namedModules: true, // NamedModulesPlugin()
		splitChunks: {
			// CommonsChunkPlugin()
			name: 'vendor',
			minChunks: 2,
		},
		noEmitOnErrors: true, // NoEmitOnErrorsPlugin
		concatenateModules: true, //ModuleConcatenationPlugin
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
						plugins: [
							['@babel/transform-react-jsx'],
							['react-hot-loader/babel'],
						],
						cacheDirectory: true,
						cacheCompression: false,
					},
				},
			},
			/*{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.coffee?$/,
				use: 'coffee-loader',
			},*/
			{
				test: /\.worker\.js$/,
				use: {
					loader: 'worker-loader',
				},
			},
		],
	},
	resolve: {
		modules: modules,
		alias: {
			jquery: require.resolve('jquery'),
			jQuery: require.resolve('jquery'),
		},
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
		new HardSourceWebpackPlugin(),
	],
};
