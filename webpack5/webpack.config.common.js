/*
 * Common Environment
 */

const webpack = require('webpack');
const commonVariables = require('./webpack.configuration');
const conf = commonVariables.configuration;

const path = require('path');
const filesystem = require('fs');

const UIInfo = require('./node_modules/@a2nt/ss-bootstrap-ui-webpack-boilerplate/package.json');
const UINAME = JSON.stringify(UIInfo.name);
const UIVERSION = JSON.stringify(UIInfo.version);
console.info(`%cUI Kit ${UINAME} ${UIVERSION}`, 'color:yellow;font-size:14px');

const includes = {};
const modules = [
	path.resolve(__dirname, conf.APPDIR, 'client', 'src'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'js'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'scss'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'img'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'thirdparty'),
	path.resolve(__dirname, conf.APPDIR, 'client', 'node_modules'),
	path.resolve(__dirname, 'node_modules'),
	path.resolve(__dirname),
	path.resolve(__dirname, 'public'),
];

const _addAppFiles = (theme) => {
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

	const _getAllFilesFromFolder = function (dir, includeSubFolders = true) {
		const dirPath = path.resolve(__dirname, dir);
		let results = [];

		filesystem.readdirSync(dirPath).forEach((file) => {
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
		pageScripts.forEach((file) => {
			includes[`${themeName}_${path.basename(file, '.js')}`] = file;
		});
	}

	// add page specific scss
	const typesSCSSPath = path.join(theme, conf.TYPESSCSS);
	if (filesystem.existsSync(typesSCSSPath)) {
		const scssIncludes = _getAllFilesFromFolder(typesSCSSPath, true);
		scssIncludes.forEach((file) => {
			includes[`${themeName}_${path.basename(file, '.scss')}`] = file;
		});
	}
};

_addAppFiles(conf.APPDIR);

// add themes
commonVariables.themes.forEach((theme) => {
	_addAppFiles(theme);
});

module.exports = {
	entry: includes,
	externals: {
		jquery: 'jQuery',
	},
	resolve: {
		modules: modules,
		alias: {
			'window.jQuery': require.resolve('jquery'),
			$: require.resolve('jquery'),
			jquery: require.resolve('jquery'),
			jQuery: require.resolve('jquery'),
		},
	},
};
