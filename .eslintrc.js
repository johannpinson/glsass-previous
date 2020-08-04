module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // 'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // 'operator-linebreak': [
    //   'error',
    //   'before',
    //   {
    //     overrides: {
    //       '&&': 'after',
    //       '||': 'after',
    //       '=': 'after',
    //     },
    //   },
    // ],
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
  },
}

// module.exports = {
//   extends: ['airbnb', 'prettier'],
//   plugins: ['prettier'],
//   env: {
//     browser: true,
//     es6: true,
//   },
//   rules: {
//     'import/no-extraneous-dependencies': 'off',
//     'prettier/prettier': 'error',
//     'no-console': 'warn',
//     'react/jsx-one-expression-per-line': 'off',
//     'react/jsx-filename-extension': 'off', // disable if necessary
//     'react/static-property-placement': 'off', // disable if necessary
//     'react/jsx-props-no-spreading': 'off', // disable if necessary
//     'react/require-default-props': 'off',
//   },
//   parser: 'babel-eslint',
// };

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'prettier/@typescript-eslint',
//     'react-app',
//     'plugin:prettier/recommended',
//   ],
//   plugins: [
//     '@typescript-eslint',
//     'prettier',
//     'react',
//     // anoter config
//   ],
//   rules: {
//     // 'react/react-in-jsx-scope': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/no-empty-function': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
// }
