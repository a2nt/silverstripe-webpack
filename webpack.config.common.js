/*
 * Common Environment
 */

const webpack = require('webpack');
const conf = require('./webpack.configuration');

const path = require('path');
const filesystem = require('fs');

const includes = {};

const _addAppFiles = (theme) => {

    const dirPath = path.resolve(__dirname, theme);
    const themeName = path.basename(theme);

    if (filesystem.existsSync(path.join(dirPath, conf.SRC, 'js', 'app.js'))) {
        includes[`${themeName}`] = path.join(dirPath, conf.SRC, 'js', 'app.js');
    } else if (filesystem.existsSync(path.join(dirPath, conf.SRC, 'scss', 'app.scss'))) {
        includes[`${themeName}`] = path.join(dirPath, conf.SRC, 'scss', 'app.scss');
    }

    const _getAllFilesFromFolder = function(dir, includeSubFolders = true) {
        const dirPath = path.resolve(__dirname, dir);
        let results = [];

        filesystem.readdirSync(dirPath).forEach((file) => {
            if (file.charAt(0) === '_') {
                return;
            }

            const filePath = `${dirPath}/${file}`;
            const stat = filesystem.statSync(filePath);

            if (stat && stat.isDirectory() && includeSubFolders) {
                results = results.concat(_getAllFilesFromFolder(filePath, includeSubFolders));
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
if (conf.THEMESDIR) {
    const dir = path.resolve(__dirname, conf.THEMESDIR);

    if (filesystem.existsSync(dir)) {
        filesystem.readdirSync(dir).forEach((file) => {
            filePath = `${dir}/${file}`;
            const stat = filesystem.statSync(filePath);

            if (stat && stat.isDirectory()) {
                _addAppFiles(path.join(conf.THEMESDIR, file));
            }
        });
    }
}

module.exports = {
    entry: includes,
    devtool: 'source-map',
    externals: {
        'jquery': 'jQuery',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {
                            modules: false,
                        }],
                        ['stage-2'],
                    ],
                    plugins: [
                        ['transform-react-jsx'],
                        ['react-hot-loader/babel'],
                    ],
                },
            },
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.coffee?$/,
            use: 'coffee-loader',
        }, {
            test: /\.worker\.js$/,
            use: {
                loader: 'worker-loader',
            },
        }],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'public'),
            path.resolve(__dirname, conf.APPDIR, 'client', 'src'),
            path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'js'),
            path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'scss'),
            path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'img'),
            path.resolve(__dirname, conf.APPDIR, 'client', 'src', 'thirdparty'),
            path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            'jquery': require.resolve('jquery'),
            'jQuery': require.resolve('jquery'),
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
    ],
};
