module.exports = {
    env: { browser: true, es6: true, node: true },
    extends: [
        'eslint:recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['react', '@typescript-eslint/eslint-plugin'],
    overrides: [
        {
            files: 'src/**/*.{js,ts,tsx}',
            parser: '@typescript-eslint/parser', // Specifies the ESLint parser
            extends: [
                'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
                'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
                'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
            ],
            parserOptions: {
                ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
                sourceType: 'module', // Allows for the use of imports
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json',
            },
            settings: { react: { version: 'detect' } },
            ecmaFeatures: { destructuring: true },
            rules: {
                'react/jsx-uses-react': 'off',
                'react/react-in-jsx-scope': 'off',

                // TODO: @odinr REMOVE THESE!
                '@typescript-eslint/ban-types': 'warn',
                '@typescript-eslint/no-empty-function': 'warn',
                'react/prop-types': 'warn',
                'react/display-name': 'warn',
                'react/no-children-prop': 'warn',
                'react/no-unescaped-entities': 'warn',
                'no-empty': 'warn',
            },
        },
    ],
};
