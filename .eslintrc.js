module.exports = {
  extends: [
    'airbnb',
    'plugin:security/recommended',
  ],
  plugins: [
    'security'
  ],
  globals: {
    window: true,
    navigator: true,
    fetch: true,
    document: true,
    it: true,
    describe: true,
    beforeEach: true,
    afterEach: true,
    expect: true,
    jest: true,
    beforeAll: true,
    afterAll: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'global-require': 0,
    'prefer-promise-reject-errors': 0,
  },
  overrides: [
    {
      files: ['test/unit/**/*.test.js'],
      rules: {
        'no-unused-expressions': 0
      }
    }
  ]
};
