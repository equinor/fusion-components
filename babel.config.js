module.exports = {
    presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-decorators', '@babel/plugin-proposal-class-properties'],
    env: {
        test: {
            plugins: ['require-context-hook'],
        },
    },
};
