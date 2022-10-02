module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js/'],
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.(js|jsx)',
    '<rootDir>/src/pages/**/*.(js|jsx)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
}
