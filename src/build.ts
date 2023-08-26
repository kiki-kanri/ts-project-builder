import strip from '@rollup/plugin-strip';
import rollupPluginJson from '@rollup/plugin-json';
import { resolve } from 'path';
import rollup, { ModuleFormat, OutputOptions, Plugin, RollupError } from 'rollup';
import del from 'rollup-plugin-delete';
import { minify } from 'rollup-plugin-esbuild';
import ts from 'rollup-plugin-ts';
import { PackageJson } from 'type-fest';

import { handleError } from '../rollup/cli/logging';
import { getPackageJson } from './utils';

export type BuildType = 'node' | 'package';

export interface BuildConfig {
	clearDist: boolean;
	dist: string;
	extraConfig: string;
	format: ModuleFormat;
	input: string;
	minify: boolean;
	preserveModules: boolean;
	strip: boolean;
	type: BuildType;
}

export interface ExtraConfig {
	output: Pick<OutputOptions, 'banner' | 'footer'>;
	plugins?: {
		after?: Plugin[];
		before?: Plugin[];
	}
}

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
	const dist = resolve(buildConfig.dist);
	const inputFile = resolve(buildConfig.input);
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
	try {
		const extraConfigPath = resolve(buildConfig.extraConfig);
		const extraConfig: ExtraConfig = (await import(extraConfigPath)).default;
		rollupOptions.output.banner = extraConfig.output.banner;
		rollupOptions.output.footer = extraConfig.output.footer;
		rollupOptions.plugins.push(...(extraConfig.plugins?.after || []));
		rollupOptions.plugins.unshift(...(extraConfig.plugins?.before || []));
	} catch (error) { }

	// Build
	const builder = await rollup.rollup(rollupOptions);

	try {
		await builder.write(rollupOptions.output);
	} catch (error) {
		handleError(error as RollupError, true);
	}

	await builder.close();
}
