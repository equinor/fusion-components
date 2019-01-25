const merge = require("webpack-merge");
const styles = require("../build/style");
const fonts = require("../build/fonts");
const eslint = require("../build/eslint");
const prettier = require("../build/prettier");
const resolve = require("../build/resolve");

module.exports = merge(styles, fonts, eslint, prettier, resolve);
