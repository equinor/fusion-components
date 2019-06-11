const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'prettier-loader',
                    options: {
                        configFile: path.resolve(__dirname, '..', '.prettierrc'),
                    },
                },
            },
        ],
    },
};
