const path = require("path");
const merge = require("webpack-merge");
const styles = require("./build/style");
const fonts = require("./build/fonts");
const eslint = require("./build/eslint");
const prettier = require("./build/prettier");
const resolve = require("./build/resolve");
const typescript = require("./build/typescript");

module.exports = merge(
    styles,
    fonts,
    resolve,
    eslint,
    typescript,
    prettier,
    {
        entry: "./src/index.ts",
    },
    {
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
        },
    }
);
