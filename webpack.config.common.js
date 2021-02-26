/*
 * Common Environment
 */

const webpack = require('webpack');
const commonVariables = require('./webpack.configuration');
const conf = commonVariables.configuration;

const path = require('path');
const filesystem = require('fs');

const includes = {};
const modules = [
    path.resolve(__dirname, conf.APPDIR, conf.SRC),
    path.resolve(__dirname, conf.APPDIR, conf.SRC, 'js'),
    path.resolve(__dirname, conf.APPDIR, conf.SRC, 'scss'),
    path.resolve(__dirname, conf.APPDIR, conf.SRC, 'img'),
    path.resolve(__dirname, conf.APPDIR, conf.SRC, 'thirdparty'),
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname),
    path.resolve(__dirname, 'public'),
];

const _addAppFiles = (theme) => {
    const dirPath = './' + theme;
    let themeName = path.basename(theme);
    if (themeName == '.') {
        themeName = 'app';
    }

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

    modules.push(path.join(dirPath, conf.SRC, 'js'));
    modules.push(path.join(dirPath, conf.SRC, 'scss'));
    modules.push(path.join(dirPath, conf.SRC, 'img'));
    modules.push(path.join(dirPath, conf.SRC, 'thirdparty'));

    const _getAllFilesFromFolder = function(dir, includeSubFolders = true) {
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
        // comment out jQuery if you don't use it to prevent bootstrap thinking that there's jQuery present
        //jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        modules: modules,
        alias: {
            // comment out jQuery if you don't use it to prevent bootstrap thinking that there's jQuery present
            /*'window.jQuery': require.resolve('jquery'),
            $: require.resolve('jquery'),
            jquery: require.resolve('jquery'),
            jQuery: require.resolve('jquery'),*/
            react: require.resolve('react'),
            'react-dom': require.resolve('react-dom'),
        },
        fallback: { path: false },
    },
    experiments: {
        topLevelAwait: true,
    },
};
