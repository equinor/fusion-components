module.exports = (rootDir) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
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
