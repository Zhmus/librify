import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^app/(.*)$': '<rootDir>/src/app/$1',
        '^composites/(.*)$': '<rootDir>/src/composites/$1',
        '^entities/(.*)$': '<rootDir>/src/entities/$1',
        '^features/(.*)$': '<rootDir>/src/features/$1',
        '^layouts/(.*)$': '<rootDir>/src/layouts/$1',
        '^pages/(.*)$': '<rootDir>/src/pages/$1',
        '^shared/(.*)$': '<rootDir>/src/shared/$1',
    },
    testMatch: ['**/*.test.(ts|tsx|js)', '**/?(*.)+(spec|test).(ts|tsx)'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    globals: {},
};

export default config;
