const path = require('path');
const merge = require('webpack-merge');
const styles = require('../build/style');
const fonts = require('../build/fonts');
const eslint = require('../build/eslint');
const resolve = require('../build/resolve');
const typescript = require('../build/typescript');

module.exports = {
    stories: ['../src/**/*.stories.@(jsx|tsx|mdx)'],
    addons: [
        '@storybook/addon-options/register',
        '@storybook/addon-actions/register',
        '@storybook/addon-jest/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-docs'
    ],
    webpackFinal: async (config) =>
        merge(config, styles, resolve, fonts,eslint,typescript('../'),{
            resolve: {
                alias: {
                    '@equinor/fusion-components': path.resolve(__dirname, '..', 'src', 'index.ts'),
                },
            },
        }),
};
