module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'google'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'max-len': ['error', {code: 120}],
    semi: ['error', 'never'],
    'require-jsdoc': 0,
    'quote-props': ['error', 'as-needed'],
  },
}
