module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: './tsconfig.json',
      node: {
        paths: ['src'],
        moduleDirectory: ['webpack', 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/babel',
  ],
  rules: {
    'object-curly-newline': ['off'],
    'array-element-newline': ['off', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],

    'max-len': ['off'],

    'no-multiple-empty-lines': ['error'],

    '@typescript-eslint/naming-convention': ['off'],

    '@typescript-eslint/indent': ['error', 2],
    indent: ['error', 2, { SwitchCase: 1 }],

    'operator-linebreak': ['error', 'before'],

    'consistent-return': 'warn',

    'lines-between-class-members': ['off', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/lines-between-class-members': ['off'],

    'no-console': ['off'],

    'function-paren-newline': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'object-curly-spacing': ['error', 'always'],
  },
};
