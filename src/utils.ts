import fsp from 'fs/promises';
import { resolve } from 'path';
import { PackageJson } from 'type-fest';

export const getPackageJson = async () => {
	const packageJsonPath = resolve('./package.json');
	try {
		const file = await fsp.readFile(packageJsonPath);
		return JSON.parse(file.toString()) as PackageJson;
	} catch (error) { }
}

export const isFile = async (path: string) => {
	try {
		return (await fsp.stat(path)).isFile();
	} catch (error) { }
	return false;
}

export const randomStr = (length = 8) => Math.random().toString(36).substring(2, length + 2);
