const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      configFile: path.resolve(__dirname, './.babelrc'),
    },
  },
  plugins: [
    'vue',
  ],
  rules: {
    semi: 2,
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
