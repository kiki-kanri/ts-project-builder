const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Za-z]:)?[/\\|])/;
const BACKSLASH_REGEX = /\\/g;
const RELATIVE_PATH_REGEX = /^\.?\.(\/|$)/;

export const isAbsolute = (path: string) => ABSOLUTE_PATH_REGEX.test(path);
export const isRelative = (path: string) => RELATIVE_PATH_REGEX.test(path);
export const normalize = (path: string) => path.replace(BACKSLASH_REGEX, '/');

export { basename, dirname, extname, resolve } from 'node:path';
