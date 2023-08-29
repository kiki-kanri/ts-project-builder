const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Za-z]:)?[/\\|])/;
const ANY_SLASH_REGEX = /[/\\]/;
const BACKSLASH_REGEX = /\\/g;
const RELATIVE_PATH_REGEX = /^\.?\.(\/|$)/;

export const isAbsolute = (path: string) => ABSOLUTE_PATH_REGEX.test(path);
export const isRelative = (path: string) => RELATIVE_PATH_REGEX.test(path);
export const normalize = (path: string) => path.replace(BACKSLASH_REGEX, '/');

export function relative(from: string, to: string): string {
	const fromParts = from.split(ANY_SLASH_REGEX).filter(Boolean);
	const toParts = to.split(ANY_SLASH_REGEX).filter(Boolean);
	if (fromParts[0] === '.') fromParts.shift();
	if (toParts[0] === '.') toParts.shift();

	while (fromParts[0] && toParts[0] && fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}

	while (toParts[0] === '..' && fromParts.length > 0) {
		toParts.shift();
		fromParts.pop();
	}

	while (fromParts.pop()) toParts.unshift('..');
	return toParts.join('/');
}

export { basename, dirname, extname, resolve } from 'node:path';
