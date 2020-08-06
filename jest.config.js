/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/tests/'],
  coverageReporters: ['json', 'html'],
};
