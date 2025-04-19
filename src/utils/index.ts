import { stat } from 'node:fs/promises';

export const pathIsFile = async (path: string) => (await stat(path).catch(() => {}))?.isFile();

export function parseCliArgString<T extends Record<string, string> = Record<string, string>>(value: string) {
    const data: Record<string, string> = {};
    value.split(',').forEach((part) => {
        // eslint-disable-next-line style/array-bracket-newline, style/array-element-newline
        const [key, value] = part.replaceAll(/\s+/g, '').split('=');
        if (value === undefined) key !== undefined && (data.default = key);
        else if (key) data[key] = value;
    });

    return data as T;
}
