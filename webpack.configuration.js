/*
 * Load webpack configuration from app/_config/webpack.yml
 */

const YML_PATH = '/app/_config/webpack.yml';

const path = require('path');
const filesystem = require('fs');
const fs = require('fs');
const yaml = require('js-yaml');

const conf = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, YML_PATH), 'utf8'),
);

let themes = [];
// add themes
if (conf['Site\\Templates\\WebpackTemplateProvider'].THEMESDIR) {
  const themeDir = conf['Site\\Templates\\WebpackTemplateProvider'].THEMESDIR;
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
  configuration: conf['Site\\Templates\\WebpackTemplateProvider'],
  themes: themes,
};
