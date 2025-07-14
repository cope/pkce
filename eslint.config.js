const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const jest = require('eslint-plugin-jest');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	{
		ignores: [
			'node_modules/**',
			'lib/**',
			'dist/**',
			'coverage/**',
			'docs/**',
			'*.d.ts',
			'*.js',
			'jest.config.js',
			'eslint.config.js',
			'.prettierrc.js'
		]
	},
	{
		files: ['src/**/*.ts', 'test/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': tseslint,
			prettier: prettier,
			jest: jest
		},
		rules: {
			...tseslint.configs.recommended.rules,
			...jest.configs.recommended.rules,
			...prettierConfig.rules,

			// TypeScript specific rules
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-var-requires': 'error',

			// General ESLint rules
			'no-console': 'off', // Allow console.log for this project
			'no-debugger': 'error',
			'prefer-const': 'error',
			'no-var': 'error',

			// Code style rules (handled by Prettier)
			'prettier/prettier': 'error',

			// Jest specific rules
			'jest/no-disabled-tests': 'warn',
			'jest/no-focused-tests': 'error',
			'jest/no-identical-title': 'error',
			'jest/prefer-to-have-length': 'warn',
			'jest/valid-expect': 'error',
			'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'fc.assert'] }],

			// Code quality rules
			'curly': ['error', 'multi-line'],
			'max-classes-per-file': ['error', 5],
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'eol-last': 'error',
			'comma-dangle': ['error', 'never'],
			'semi': ['error', 'always'],
			'quotes': ['error', 'single', { avoidEscape: true }]
		}
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				project: './tsconfig.json'
			}
		}
	},
	{
		files: ['test/**/*.ts'],
		languageOptions: {
			globals: {
				describe: 'readonly',
				it: 'readonly',
				test: 'readonly',
				expect: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				jest: 'readonly'
			}
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/unbound-method': 'off'
		}
	}
]; 