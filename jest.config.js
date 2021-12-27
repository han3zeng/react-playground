// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
