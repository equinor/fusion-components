// Support for github pages
// const publicPath = process.env.NODE_ENV === "production" ? "/fusion-components/fonts/" : "/fonts/";

// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.(woff(2)?|ttf|eot|svg)$/,
//                 use: [{
//                     loader: "file-loader",
//                     options: {
//                         name: "[name].[ext]",
//                         useRelativePath: true,
//                         outputPath: "fonts/",
//                         publicPath,
//                     },
//                 }],
//             },
//         ],
//     },
// };

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
