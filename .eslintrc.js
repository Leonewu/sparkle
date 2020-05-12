module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'standard', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'space-before-function-paren': ['error', 'never']
  }
}
