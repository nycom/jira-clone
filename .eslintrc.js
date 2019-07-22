module.exports = {
    root: true,

    parser: 'babel-eslint',

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'prettier'
    ],

    plugins: ['prettier', 'react'],

    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true
    },

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        }
    },

    rules: {
        'no-unused-vars': 0,
        'no-console': 0,
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                jsxBracketSameLine: true,
                tabWidth: 4,
            }
        ]
    },

    globals: {
        DEBUG: false
    }
};
