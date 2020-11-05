const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: path.resolve(__dirname, '..', '.eslintrc.js'),
                },
            },
        ],
    },
};
