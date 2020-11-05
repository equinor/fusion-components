module.exports = {
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000000,
                        },
                    },
                ],
            },
        ],
    },
};
