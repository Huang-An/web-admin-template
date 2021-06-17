module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-extend-native': 'off',
    'no-new': 'off',
    'space-before-function-paren': 'off',
    'no-useless-call': 'off',
    'handle-callback-err': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
