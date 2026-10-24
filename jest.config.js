module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src', '<rootDir>/test'],

	testMatch: ['**/test/**/*.spec.ts'],

	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.jest.json'
			}
		]
	},

	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {'^(\\.{1,2}/.*)\\.js$': '$1'},

	setupFilesAfterEnv: [],

	collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.spec.ts', '!src/**/*.test.ts'],

	coverageDirectory: 'coverage',

	coverageReporters: ['lcov', 'html', 'text', 'text-summary'],

	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	},

	clearMocks: true,

	testTimeout: 30000
};
