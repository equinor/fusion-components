const merge = require("webpack-merge");
const styles = require("./build/style");
const eslint = require("./build/eslint");
const prettier = require("./build/prettier");

module.exports = merge(styles, eslint, prettier, {});
