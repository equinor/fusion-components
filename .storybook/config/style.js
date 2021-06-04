const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: 'fc--[folder]__[local]--[hash:base64:5]',
                                context: path.resolve(__dirname, '..', 'src'),
                                // hashPrefix: new Date().getTime().toString(),
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
        ],
    },
};
