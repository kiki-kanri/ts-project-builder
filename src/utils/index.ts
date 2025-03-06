import { stat } from 'node:fs/promises';

export function parseCliArgString<T extends Record<string, string> = Record<string, string>>(value: string) {
    const data: Record<string, string> = {};
    value.split(',').forEach((part) => {
        const [
            key,
            value,
        ] = part.replaceAll(/\s+/g, '').split('=');
        if (value === undefined) key !== undefined && (data.default = key);
        else if (key) data[key] = value;
    });

    return data as T;
}

export async function pathIsFile(path: string) {
    try {
        return (await stat(path)).isFile();
    } catch {}
}
