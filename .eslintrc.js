module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier' ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [ '@typescript-eslint', 'prettier' ],
    rules: {
        'no-unused-vars': 'warn',
        'no-shadow': 'off',
        'no-undef': 'off',
        quotes: [ 'error', 'single', { allowTemplateLiterals: true } ],
        'max-len': [
            'error',
            {
                ignoreComments: true,
                ignoreTemplateLiterals: true,
                code: 125,
            },
        ],
        indent: [ 'error', 4 ],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'prettier/prettier': 'error',
    },
    root: true,
}
