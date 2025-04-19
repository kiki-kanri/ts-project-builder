export { resolve } from 'node:path';

const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Z]:)?[/\\|])/i;

export const isAbsolute = (path: string) => ABSOLUTE_PATH_REGEX.test(path);
