/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/__tests__/_.*', '/node_modules/'],

  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],
};
