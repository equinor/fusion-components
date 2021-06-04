const { resolve } = require('path');

const root = resolve(__dirname, '../..');

module.exports = {
    resolve: {
        modules: [resolve(root, 'src')],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.woff', '.woff2'],
        alias: {
            '@equinor/fusion-components': resolve(root, 'src')
        }
    },
};
