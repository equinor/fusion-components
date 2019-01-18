const path = require("path");
const merge = require("webpack-merge");
const styles = require("../build/style");
const fonts = require("../build/fonts");

module.exports = merge(styles, fonts, {
    resolve: {
        modules: [path.resolve(__dirname, "..", "./src"), "node_modules"],
    },
});