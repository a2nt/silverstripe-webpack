/*
 * Load webpack configuration from site/_config/webpack.yml
 */

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const conf = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'site/_config/webpack.yml'), 'utf8'));

module.exports = conf['Site\\Templates\\WebpackTemplateProvider'];