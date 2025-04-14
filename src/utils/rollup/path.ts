const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Z]:)?[/\\|])/i;

export function isAbsolute(path: string): boolean {
    return ABSOLUTE_PATH_REGEX.test(path);
}

export { resolve } from 'node:path';
