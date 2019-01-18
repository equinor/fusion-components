const crypto = require("crypto");

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        localIdentName: "fc--[local]--[hash:base64:5]",
                        url: false,
                    },
                }, {
                    loader: "less-loader",
                }],
            }
        ],
    },
};