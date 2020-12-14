const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const threadLoader = require('thread-loader');

// threadLoader.warmup({}, [
//     "ts-loader",
//     // "style-loader",
//     "css-loader",
//     "less-loader"
// ]);

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

    plugins: [
        // new ForkTsCheckerWebpackPlugin({
        //     eslint: {
        //         files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        //     }
        // })
    ],

    stats: {
        warningsFilter: /export .* was not found in/,
    },
});
