/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/__tests__/_.*', '/node_modules/'],

  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],
  coveragePathIgnorePatterns: ['.*\\.(ignored|stories|test)\\.*', '__tests__'],
};
