export { resolve } from 'node:path';

const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Z]:)?[/\\|])/i;

export const isAbsolute = (path: string): boolean => ABSOLUTE_PATH_REGEX.test(path);
