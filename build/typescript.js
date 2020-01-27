const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const threadLoader = require('thread-loader');

threadLoader.warmup({}, [
    "ts-loader",
    "style-loader",
    "css-loader",
    "less-loader"
]);

module.exports = rootDir => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "cache-loader",
                    "thread-loader",
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
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

    plugins: [
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
    ],

    stats: {
        warningsFilter: /export .* was not found in/,
    },
});
