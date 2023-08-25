import strip from '@rollup/plugin-strip';
import rollupPluginJson from '@rollup/plugin-json';
import { resolve } from 'path';
import rollup, { ModuleFormat, OutputOptions, Plugin } from 'rollup';
import del from 'rollup-plugin-delete';
import { minify } from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals5';
import ts from 'rollup-plugin-ts';

export type BuildType = 'node' | 'package';

export interface BuildConfig {
	clean: boolean;
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
	exports: 'named',
	externalLiveBindings: false,
	generatedCode: {
		arrowFunctions: true,
		constBindings: true,
		objectShorthand: true
	}
};

export const build = async (buildConfig: BuildConfig) => {
	const dist = resolve(buildConfig.dist);
	const inputFile = resolve(buildConfig.input);
	const output: OutputOptions = {
		dir: dist,
		format: buildConfig.format
	};

	const plugins = [
		rollupPluginJson(),
		ts(),
		externals()
	];

	if (buildConfig.clean) plugins.unshift(del({ targets: dist }));
	if (buildConfig.strip) plugins.push(strip({ include: ['./src/**/*.ts'] }),);
	if (buildConfig.minify) plugins.push(minify());
	if (buildConfig.type === 'package') {
		Object.assign(output, defaultPackageOutputOptions);
		output.preserveModules = buildConfig.preserveModules;
	}

	const rollupOptions = {
		input: inputFile,
		output,
		plugins
	};

	try {
		const extraConfigPath = resolve(buildConfig.extraConfig);
		const extraConfig: ExtraConfig = (await import(extraConfigPath)).default;
		rollupOptions.output.banner = extraConfig.output.banner;
		rollupOptions.output.footer = extraConfig.output.footer;
		rollupOptions.plugins.push(...(extraConfig.plugins?.after || []));
		rollupOptions.plugins.unshift(...(extraConfig.plugins?.before || []));
	} catch (error) { }

	const builder = await rollup.rollup(rollupOptions);
	await builder.write(rollupOptions.output as OutputOptions);
}
