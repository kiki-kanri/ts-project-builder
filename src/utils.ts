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
