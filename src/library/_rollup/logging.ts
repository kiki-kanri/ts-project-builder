import process from 'process';
import { RollupError } from 'rollup';

import { bold, cyan, dim, red } from './colors';
import relativeId from './relativeId';

// log to stderr to keep `rollup main.js > bundle.js` from breaking
export const stderr = (...parameters: readonly unknown[]) =>
	process.stderr.write(`${parameters.join('')}\n`);

export function handleError(error: RollupError): void {
	const name = error.name || (error.cause as Error)?.name;
	const nameSection = name ? `${name}: ` : '';
	const pluginSection = error.plugin ? `(plugin ${error.plugin}) ` : '';
	const message = `${pluginSection}${nameSection}${error.message}`;
	const outputLines = [bold(red(`[!] ${bold(message.toString())}`))];
	if (error.url) outputLines.push(cyan(error.url));
	if (error.loc) outputLines.push(`${relativeId((error.loc.file || error.id)!)}:${error.loc.line}:${error.loc.column}`);
	else if (error.id) outputLines.push(relativeId(error.id));
	if (error.frame) outputLines.push(dim(error.frame));
	if (error.stack) outputLines.push(dim(error.stack?.replace(`${nameSection}${error.message}\n`, '')));
	outputLines.push('', '');
	stderr(outputLines.join('\n'));
}
