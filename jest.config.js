/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },

  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/tests/'],
  coverageReporters: ['json', 'html'],
};
