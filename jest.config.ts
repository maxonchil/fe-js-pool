import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  collectCoverage: false,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
  ],
  verbose: false,
  notify: true,
  notifyMode: "success-change"
};

export default config;