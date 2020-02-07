const path = require('path');
const merge = require('webpack-merge');
const styles = require('../build/style');
const fonts = require('../build/fonts');
const eslint = require('../build/eslint');
const prettier = require('../build/prettier');
const resolve = require('../build/resolve');
const typescript = require('../build/typescript');

module.exports = async ({ config }) =>
    merge(config, styles, fonts, eslint, prettier, typescript('../'), resolve, {
        resolve: {
            alias: {
                '@equinor/fusion-components': path.resolve(__dirname, '..', 'src', 'index.ts'),
            },
        },
    });
