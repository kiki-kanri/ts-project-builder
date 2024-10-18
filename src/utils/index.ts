import { stat } from 'fs/promises';

export const parseCLIArgString = <T extends Record<string, string> = {}>(value: string) => {
	const data: Record<string, string> = {};
	for (const part of value.split(',')) {
		const [key, value] = part.replaceAll(/\s+/g, '').split('=');
		if (value === undefined) key !== undefined && (data.default = key);
		else if (key) data[key] = value;
	}

	return data as T;
};

export const pathIsFile = async (path: string) => {
	try {
		return (await stat(path)).isFile();
	} catch {}
};
