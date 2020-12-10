const merge = require('webpack-merge');

module.exports = {
    stories: ['../src/**/*.stories.@(jsx|tsx|mdx)'],
    addons: [
        '@storybook/addon-essentials'
    ],
    typescript: {
        check: true,
        reactDocgen: 'react-docgen-typescript',
    },
    webpackFinal: async (config) => merge(config, require('./config')),
        
    // webpackFinal: async (config) =>
    //     merge(config, styles, resolve, fonts, eslint, {
    //         resolve: {
    //             alias: {
    //                 '@equinor/fusion-components': path.resolve(__dirname, '..', 'src', 'index.ts'),
    //             },
    //         },
    //     }),
};
