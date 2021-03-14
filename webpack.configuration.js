/*
 * Load webpack configuration from app/_config/webpack.yml
 */

const YML_PATH = '/app/_config/webpack.yml';
const CONF_VAR = 'App\\Templates\\WebpackTemplateProvider';

const path = require('path');
const filesystem = require('fs');
const fs = require('fs');
const yaml = require('js-yaml');

const conf = yaml.safeLoad(
    fs.readFileSync(path.join(__dirname, YML_PATH), 'utf8'),
);

let themes = [];
// add themes
if (conf[CONF_VAR].THEMESDIR) {
    const themeDir = conf[CONF_VAR].THEMESDIR;
    const dir = path.resolve(__dirname, themeDir);

    if (filesystem.existsSync(dir)) {
        filesystem.readdirSync(dir).forEach((file) => {
            filePath = path.join(themeDir, file);
            const stat = filesystem.statSync(filePath);

            if (stat && stat.isDirectory()) {
                themes.push(filePath);
            }
        });
    }
}

module.exports = {
    configuration: conf[CONF_VAR],
    themes: themes,
};
