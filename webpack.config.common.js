/*
 * Common Environment
 */

const INDEX_NAME = 'app';
const YML_PATH = '/app/_config/webpack.yml';
const CONF_VAR = 'A2nt\\CMSNiceties\\Templates\\WebpackTemplateProvider';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const webpack = require('webpack');

/*
 * Load webpack configuration from webpack.yml
 */

const yml = yaml.load(
    fs.readFileSync(path.join(__dirname, YML_PATH), 'utf8'),
);
const conf = yml[CONF_VAR];

let themes = [];
// add themes
if (conf.THEMESDIR) {
  const themeDir = conf.THEMESDIR;
  const dir = path.resolve(__dirname, themeDir);

  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
        filePath = path.join(themeDir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
          themes.push(filePath);
        }
      });
  }
}

/* Setup Entries */
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

    if (fs.existsSync(path.join(dirPath, conf.SRC, 'js', INDEX_NAME + '.js'))) {
      includes[`${themeName}`] = path.join(dirPath, conf.SRC, 'js', INDEX_NAME + '.js');
    } else if (
        fs.existsSync(path.join(dirPath, conf.SRC, 'scss', INDEX_NAME + '.scss'))
    ) {
      includes[`${themeName}`] = path.join(
          dirPath,
          conf.SRC,
          'scss',
          INDEX_NAME + '.scss',
      );
    }

    modules.push(path.join(dirPath, conf.SRC, 'js'));
    modules.push(path.join(dirPath, conf.SRC, 'scss'));
    modules.push(path.join(dirPath, conf.SRC, 'img'));
    modules.push(path.join(dirPath, conf.SRC, 'thirdparty'));

    const _getAllFilesFromFolder = function (dir, includeSubFolders = true) {
        const dirPath = path.resolve(__dirname, dir);
        let results = [];

        fs.readdirSync(dirPath).forEach((file) => {
            if (file.charAt(0) === '_') {
              return;
            }

            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

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
    if (fs.existsSync(typesJSPath)) {
      const pageScripts = _getAllFilesFromFolder(typesJSPath, true);
      pageScripts.forEach((file) => {
          includes[`${themeName}_${path.basename(file, '.js')}`] = file;
        });
    }

    // add page specific scss
    const typesSCSSPath = path.join(theme, conf.TYPESSCSS);
    if (fs.existsSync(typesSCSSPath)) {
      const scssIncludes = _getAllFilesFromFolder(typesSCSSPath, true);
      scssIncludes.forEach((file) => {
          includes[`${themeName}_${path.basename(file, '.scss')}`] = file;
        });
    }
  };

_addAppFiles(conf.APPDIR);

// add themes
themes.forEach((theme) => {
    _addAppFiles(theme);
  });

const UIInfo = require('./node_modules/@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/package.json');
const UINAME = JSON.stringify(UIInfo.name);
const UIVERSION = JSON.stringify(UIInfo.version);
const UIMetaInfo = require('./node_modules/@a2nt/meta-lightbox-js/package.json');

const NODE_ENV = conf.NODE_ENV || process.env.NODE_ENV;
const COMPRESS = NODE_ENV === 'production' ? true : false;

const IP = process.env.IP || conf.HOSTNAME;
const PORT = process.env.PORT || conf.PORT;

console.log('NODE_ENV: ' + NODE_ENV);
console.log('COMPRESS: ' + COMPRESS);
console.log('WebP images: ' + conf['webp']);
console.log('GRAPHQL_API_KEY: ' + conf['GRAPHQL_API_KEY']);

const JSVARS = {
    NODE_ENV: JSON.stringify(NODE_ENV),
    UINAME: UINAME,
    UIVERSION: UIVERSION,
    UIAUTHOR: JSON.stringify(UIInfo.author),
    UIMetaNAME: JSON.stringify(UIMetaInfo.name),
    UIMetaVersion: JSON.stringify(UIMetaInfo.version),
    GRAPHQL_API_KEY: JSON.stringify(conf['GRAPHQL_API_KEY']),
    SWVERSION: JSON.stringify(`sw-${new Date().getTime()}`),
    BASE_HREF: JSON.stringify(''),
  };

const provides = {};
const externals = {};
const aliases = {};

if (!conf['JQUERY']) {
  /*provides['react'] = 'React';
  provides['react-dom'] = 'ReactDOM';
  externals['react'] = 'React';
  externals['react-dom'] = 'ReactDOM';*/
} else {
  provides['$'] = 'jquery';
  provides['jQuery'] = 'jquery';
  externals['jquery'] = 'jQuery';

  aliases['window.jQuery'] = require.resolve('jquery');
  aliases['$'] = require.resolve('jquery');
  aliases['jquery'] = require.resolve('jquery');
  aliases['jQuery'] = require.resolve('jquery');
}

module.exports = {
    PROVIDES: provides,
    JSVARS: JSVARS,
    configuration: conf,
    themes: themes,
    webpack: {
        entry: includes,
        externals: externals,
        resolve: {
            modules: modules,
            extensions: ['.tsx', '.ts', '.js'],
            alias: aliases,
            fallback: {
                path: false,
              },
          },
        experiments: {
            topLevelAwait: true,
          },
      },
  };
