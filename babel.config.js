module.exports = {
    presets: ["@babel/preset-react", "@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"],
    env: {
        test: {
            plugins: ["require-context-hook"],
        },
    },
};
