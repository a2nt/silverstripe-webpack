const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");
const conf = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "site/_config/webpack.yml"), "utf8"));

module.exports = {
    SRC: path.join(__dirname, conf.WebpackTemplateProvider.src),
    BUILD: path.join(__dirname, conf.WebpackTemplateProvider.dist),
    PAGES: path.join(__dirname, conf.WebpackTemplateProvider.pages),
    HOSTNAME: conf.WebpackTemplateProvider.hostname,
    PORT: conf.WebpackTemplateProvider.port
};