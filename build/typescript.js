module.exports = (rootDir) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            // transpileOnly: true,
                            happyPackMode: true,
                            compilerOptions: {
                                rootDir,
                            },
                        },
                    },
                ],
            },
        ],
    },
});
