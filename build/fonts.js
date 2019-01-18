module.exports = {
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                    },
                }],
            },
        ],
    },
};