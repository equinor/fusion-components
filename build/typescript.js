module.exports = rootDir => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            rootDir,
                        },
                    },
                ],
            },
        ],
    },
});
