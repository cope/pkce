'use strict';

import createCodeVerifier from '../../src/functions/create.code.verifier';
import createCodeChallenge from '../../src/functions/create.code.challenge';
import pkce from '../../src/pkce';
import IPkceCode from '../../src/pkce.code.interface';

describe('PKCE Performance Tests', () => {
	const PERFORMANCE_TIMEOUT: number = 30000;

	describe('createCodeVerifier performance', () => {
		it(
			'should generate 1000 verifiers within reasonable time',
			() => {
				const batchSize: number = 1000;
				const maxTimeMs: number = 5000;

				const startTime: number = Date.now();

				const verifiers: string[] = [];
				for (let i: number = 0; i < batchSize; i++) {
					verifiers.push(createCodeVerifier());
				}

				const endTime: number = Date.now();
				const duration: number = endTime - startTime;

				expect(verifiers).toHaveLength(batchSize);
				expect(duration).toBeLessThan(maxTimeMs);
				expect(verifiers.every((v: string) => v.length > 0)).toBe(true);

				console.log(`Generated ${batchSize} verifiers in ${duration}ms (${(duration / batchSize).toFixed(4)}ms per verifier)`);
			},
			PERFORMANCE_TIMEOUT
		);

		it(
			'should generate 5000 verifiers within reasonable time',
			() => {
				const batchSize: number = 5000;
				const maxTimeMs: number = 15000;

				const startTime: number = Date.now();

				const verifiers: string[] = [];
				for (let i: number = 0; i < batchSize; i++) {
					verifiers.push(createCodeVerifier());
				}

				const endTime: number = Date.now();
				const duration: number = endTime - startTime;

				expect(verifiers).toHaveLength(batchSize);
				expect(duration).toBeLessThan(maxTimeMs);
				expect(verifiers.every((v: string) => v.length > 0)).toBe(true);

				console.log(`Generated ${batchSize} verifiers in ${duration}ms (${(duration / batchSize).toFixed(4)}ms per verifier)`);
			},
			PERFORMANCE_TIMEOUT
		);
	});

	describe('createCodeChallenge performance', () => {
		it(
			'should generate 1000 challenges within reasonable time',
			() => {
				const batchSize: number = 1000;
				const maxTimeMs: number = 3000;
				const testVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';

				const startTime: number = Date.now();

				const challenges: string[] = [];
				for (let i: number = 0; i < batchSize; i++) {
					challenges.push(createCodeChallenge(testVerifier));
				}

				const endTime: number = Date.now();
				const duration: number = endTime - startTime;

				expect(challenges).toHaveLength(batchSize);
				expect(duration).toBeLessThan(maxTimeMs);
				expect(challenges.every((c: string) => c.length > 0)).toBe(true);

				console.log(`Generated ${batchSize} challenges in ${duration}ms (${(duration / batchSize).toFixed(4)}ms per challenge)`);
			},
			PERFORMANCE_TIMEOUT
		);

		it(
			'should handle varying-length inputs efficiently',
			() => {
				const batchSize: number = 1000;
				const maxTimeMs: number = 3000;
				const minLength: number = 43;
				const maxLength: number = 128;

				const startTime: number = Date.now();

				const challenges: string[] = [];
				for (let i: number = 0; i < batchSize; i++) {
					const length: number = minLength + (i % (maxLength - minLength + 1));
					const testVerifier: string = 'A'.repeat(length);
					challenges.push(createCodeChallenge(testVerifier));
				}

				const endTime: number = Date.now();
				const duration: number = endTime - startTime;

				expect(challenges).toHaveLength(batchSize);
				expect(duration).toBeLessThan(maxTimeMs);
				expect(challenges.every((c: string) => c.length > 0)).toBe(true);

				console.log(`Processed ${batchSize} varying-length inputs in ${duration}ms`);
			},
			PERFORMANCE_TIMEOUT
		);
	});

	describe('pkce function performance', () => {
		it(
			'should generate 1000 PKCE pairs within reasonable time',
			() => {
				const batchSize: number = 1000;
				const maxTimeMs: number = 8000;

				const startTime: number = Date.now();

				const pairs: IPkceCode[] = [];
				for (let i: number = 0; i < batchSize; i++) {
					pairs.push(pkce());
				}

				const endTime: number = Date.now();
				const duration: number = endTime - startTime;

				expect(pairs).toHaveLength(batchSize);
				expect(duration).toBeLessThan(maxTimeMs);
				expect(pairs.every((p: IPkceCode) => p.code_verifier.length > 0 && p.code_challenge.length > 0)).toBe(true);

				console.log(`Generated ${batchSize} PKCE pairs in ${duration}ms (${(duration / batchSize).toFixed(4)}ms per pair)`);
			},
			PERFORMANCE_TIMEOUT
		);

		it(
			'should generate 2000 PKCE pairs within reasonable time',
			() => {
				const batchSize: number = 2000;
				const maxTimeMs: number = 15000;

				const startTime: number = Date.now();

				const pairs: IPkceCode[] = [];
				for (let i: number = 0; i < batchSize; i++) {
					pairs.push(pkce());
				}

				const endTime: number = Date.now();
				const duration: number = endTime - startTime;

				expect(pairs).toHaveLength(batchSize);
				expect(duration).toBeLessThan(maxTimeMs);
				expect(pairs.every((p: IPkceCode) => p.code_verifier.length > 0 && p.code_challenge.length > 0)).toBe(true);

				console.log(`Generated ${batchSize} PKCE pairs in ${duration}ms (${(duration / batchSize).toFixed(4)}ms per pair)`);
			},
			PERFORMANCE_TIMEOUT
		);
	});

	describe('comparative performance', () => {
		it(
			'should measure relative performance of each function',
			() => {
				const iterations: number = 1000;
				const results: {[key: string]: number} = {};

				// Measure createCodeVerifier
				let startTime: number = Date.now();
				for (let i: number = 0; i < iterations; i++) {
					createCodeVerifier();
				}
				let endTime: number = Date.now();
				results.createCodeVerifier = (endTime - startTime) / iterations;

				// Measure createCodeChallenge
				const testVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
				startTime = Date.now();
				for (let i: number = 0; i < iterations; i++) {
					createCodeChallenge(testVerifier);
				}
				endTime = Date.now();
				results.createCodeChallenge = (endTime - startTime) / iterations;

				// Measure pkce
				startTime = Date.now();
				for (let i: number = 0; i < iterations; i++) {
					pkce();
				}
				endTime = Date.now();
				results.pkce = (endTime - startTime) / iterations;

				// Verify reasonable performance
				expect(results.createCodeVerifier).toBeLessThan(1); // Less than 1ms per operation
				expect(results.createCodeChallenge).toBeLessThan(1); // Less than 1ms per operation
				expect(results.pkce).toBeLessThan(2); // Less than 2ms per operation

				// Log results
				console.log(`createCodeVerifier: ${results.createCodeVerifier.toFixed(6)}ms per operation`);
				console.log(`createCodeChallenge: ${results.createCodeChallenge.toFixed(6)}ms per operation`);
				console.log(`pkce: ${results.pkce.toFixed(6)}ms per operation`);
			},
			PERFORMANCE_TIMEOUT
		);
	});
});
