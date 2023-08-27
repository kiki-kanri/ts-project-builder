import strip from '@rollup/plugin-strip';
import rollupPluginJson from '@rollup/plugin-json';
import path from 'path';
import rollup, { OutputOptions, RollupError, RollupOptions } from 'rollup';
import del from 'rollup-plugin-delete';
import { minify } from 'rollup-plugin-esbuild';
import ts from 'rollup-plugin-ts';
import { PackageJson } from 'type-fest';

import { handleError } from '../rollup/cli/logging';
import { BuildConfig, ExtraConfig } from './types';
import { getPackageJson, isFile, randomStr, rmFile } from './utils';

const defaultPackageOutputOptions = {
	externalLiveBindings: false,
	generatedCode: {
		arrowFunctions: true,
		constBindings: true,
		objectShorthand: true
	}
};

export const build = async (buildConfig: BuildConfig, packageJson?: PackageJson) => {
	// Check package.json type value and get node externals plugin.
	if (!packageJson) packageJson = await getPackageJson();
	let nodeExternalsPlugin = null;
	if (packageJson?.type === 'module') nodeExternalsPlugin = (await import('rollup-plugin-node-externals')).default;
	else nodeExternalsPlugin = (await import('rollup-plugin-node-externals5')).default;

	// Process options and plugins
	const dist = path.resolve(buildConfig.dist);
	const inputFile = path.resolve(buildConfig.input);
	const output: OutputOptions = {
		dir: dist,
		format: buildConfig.format
	};

	const plugins = [
		nodeExternalsPlugin(),
		rollupPluginJson(),
		ts({ tsconfig: (config) => ({ ...config, declaration: buildConfig.type === 'package' }) })
	];

	if (buildConfig.clearDist) plugins.unshift(del({ targets: dist }));
	if (buildConfig.strip) plugins.push(strip({ include: ['./src/**/*.ts'] }),);
	if (buildConfig.minify) plugins.push(minify());
	if (buildConfig.type === 'package') Object.assign(output, defaultPackageOutputOptions);
	if (buildConfig.preserveModules) {
		output.exports = 'named';
		output.preserveModules = true;
	}

	const rollupOptions = {
		input: inputFile,
		output,
		plugins
	};

	// Process extra config
	const extraConfigPath = path.resolve(buildConfig.extraConfig);
	const extraConfig = await getExtraConfig(extraConfigPath);
	if (extraConfig) {
		rollupOptions.output.banner = extraConfig.output.banner;
		rollupOptions.output.footer = extraConfig.output.footer;
		rollupOptions.plugins.push(...(extraConfig.plugins?.after || []));
		rollupOptions.plugins.unshift(...(extraConfig.plugins?.before || []));
	}

	// Build
	const builder = await rollup.rollup(rollupOptions);

	try {
		await builder.write(rollupOptions.output);
	} catch (error) {
		handleError(error as RollupError, true);
	}

	await builder.close();
}

export const buildExtraConfig = async (configPath: string, configTmpPath: string) => {
	const rollupOptions: RollupOptions = {
		input: configPath,
		plugins: [
			ts(),
			minify()
		]
	};

	const builder = await rollup.rollup(rollupOptions);
	await builder.write({
		file: configTmpPath,
		format: 'cjs'
	});

	await builder.close();
}

export const getExtraConfig = async (configPath: string) => {
	if (!await isFile(configPath)) return;
	const configTmpPath = path.join(configPath, `../tspbc-${randomStr()}.js`);
	await buildExtraConfig(configPath, configTmpPath);
	try {
		const extraConfig: ExtraConfig = (await import(configTmpPath)).default;
		await rmFile(configTmpPath);
		return extraConfig as ExtraConfig;
	} catch (error) { }
	await rmFile(configTmpPath);
}
