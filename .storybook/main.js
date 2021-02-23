const path = require('path');
const { merge } = require('webpack-merge');
const styles = require('../build/style');
const fonts = require('../build/fonts');
const eslint = require('../build/eslint');
const resolve = require('../build/resolve');
const typescript = require('../build/typescript');

module.exports = {
    stories: ['../src/**/*.stories.@(jsx|tsx|mdx)'],
    addons: [
        '@storybook/addon-essentials'
    ],
    typescript: {
        check: true,
        reactDocgen: 'react-docgen-typescript',
    },

    webpackFinal: async (config) =>
        merge(
            config,
            styles,
            resolve,
            fonts,
            eslint,
            typescript('../'),
            {
                resolve: {
                    alias: {
                        '@equinor/fusion-components': path.resolve(__dirname, '..', 'src', 'index.ts'),
                    },
                },
            }
        )
};
