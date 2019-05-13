module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                    },
                ],
            },
        ],
    },
};
