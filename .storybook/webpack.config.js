const path = require("path");
const merge = require("webpack-merge");
const styles = require("../build/style");
const fonts = require("../build/fonts");
const eslint = require("../build/eslint");
const prettier = require("../build/prettier");

module.exports = merge(styles, fonts, eslint, prettier, {
    resolve: {
        modules: [path.resolve(__dirname, "..", "./src"), "node_modules"],
    },
});
