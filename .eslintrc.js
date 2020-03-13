module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['semistandard', 'plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: [1, 'single'],
    semi: [1, 'never'],
    'no-console': 1,
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': ['off'],
    'prefer-const': 0,
    'vue/no-v-html': 0,
    'vue/html-self-closing': 0,
    'vue/attributes-order': 0,
    'vue/max-attributes-per-line': 0,
    'vue/mustache-interpolation-spacing': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'no-case-declarations': 0,
    'indent': ["error", 2, { "SwitchCase": 1 }]
  },
  globals: {
    $: true,
    __BROWSER__: true,
    __DEV__: true,
    __SIT__: true,
    __UAT__: true,
    __PROD__: true,
    __BUILD__: true,
    describe: true,
    it: true,
    importScripts: true
  }
}
