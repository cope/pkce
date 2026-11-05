'use strict';

import * as fs from 'fs';
import * as path from 'path';

const sourceDir = path.join(__dirname, '..', 'src');

const sourceFiles = (dir: string): string[] =>
	fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => (entry.isDirectory() ? sourceFiles(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));

describe('browser safety tests', () => {
	it('should not import any node builtin module in src', () => {
		const offenders = sourceFiles(sourceDir).filter((file) => /from\s+['"](node:|crypto['"]|fs['"]|buffer['"])/.test(fs.readFileSync(file, 'utf8')));
		expect(offenders).toEqual([]);
	});

	it('should not reference Buffer in src', () => {
		const offenders = sourceFiles(sourceDir).filter((file) => /\bBuffer\b/.test(fs.readFileSync(file, 'utf8')));
		expect(offenders).toEqual([]);
	});
});
