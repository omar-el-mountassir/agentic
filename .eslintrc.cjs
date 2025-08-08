module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:n/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'off'
  },
  ignorePatterns: ['node_modules/', 'dist/', 'coverage/']
};
