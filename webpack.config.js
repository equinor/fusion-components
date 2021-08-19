const path = require('path');
const { merge } = require('webpack-merge');
const styles = require('./build/style');
const fonts = require('./build/fonts');
/* const eslint = require('./build/eslint');
const prettier = require('./build/prettier'); */
const resolve = require('./build/resolve');
const typescript = require('./build/typescript');

module.exports = merge(
    styles,
    fonts,
    resolve,
    // eslint,
    typescript('./src'),
    // prettier,
    {
        entry: './src/index.ts',
    },
    {
        optimization: {
            minimize: false,
        },
    },
    {
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'default',
            libraryTarget: 'umd',
        },
    },
    {
        externals: {
            '@equinor/fusion': {
                commonjs: '@equinor/fusion',
                commonjs2: '@equinor/fusion',
                amd: '@equinor/fusion',
            },
            '@equinor/fusion-react-styles': {
                commonjs: '@equinor/fusion-react-styles',
                commonjs2: '@equinor/fusion-react-styles',
                amd: '@equinor/fusion-react-styles',
            },
            react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
            },
            'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom',
            },
            'react-router-dom': {
                commonjs: 'react-router-dom',
                commonjs2: 'react-router-dom',
                amd: 'react-router-dom',
            },
            history: {
                commonjs: 'history',
                commonjs2: 'history',
                amd: 'history',
            },
        },
        mode: 'production',
    },
    {
        resolve: {
            alias: {
                '@equinor/fusion-components': path.resolve(__dirname, 'src', 'index.ts'),
            },
        },
    }
);
