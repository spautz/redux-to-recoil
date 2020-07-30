/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },

  collectCoverage: true,
  coverageReporters: ['json', 'html'],
};
