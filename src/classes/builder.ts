import strip from '@rollup/plugin-strip';
import rollupPluginJson from '@rollup/plugin-json';
import { resolve, join } from 'path';
import rollup, { OutputOptions, RollupOptions } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import ts from 'rollup-plugin-ts';

import { BuildOptions, ExtraOptions } from '../types';
import { forceRmDir, isFile, randomStr, rmFile } from '../library/utils';

const defaultPackageOutputOptions = {
	externalLiveBindings: false,
	generatedCode: {
		arrowFunctions: true,
		constBindings: true,
		objectShorthand: true
	}
};

export class Builder {
	private buildOptions: BuildOptions;
	private packageIsModule: boolean;

	constructor(buildOptions: BuildOptions, packageIsModule: boolean = false) {
		this.buildOptions = buildOptions;
		this.packageIsModule = packageIsModule;
		buildOptions.dist = resolve(buildOptions.dist);
		buildOptions.extraConfig = resolve(buildOptions.extraConfig);
	}

	private async getBaseRollupOptions() {
		// Get output options
		const output: OutputOptions = {
			dir: this.buildOptions.dist,
			format: this.buildOptions.format
		};

		if (this.buildOptions.type === 'package') Object.assign(output, defaultPackageOutputOptions);
		if (this.buildOptions.preserveModules) {
			output.exports = 'named';
			output.preserveModules = true;
		}

		// Get plugins
		const nodeExternalsPlugin = (await import(this.packageIsModule ? 'rollup-plugin-node-externals' : 'rollup-plugin-node-externals5')).default;
		const plugins = [
			nodeExternalsPlugin(),
			rollupPluginJson(),
			ts({ tsconfig: (config) => ({ ...config, declaration: this.buildOptions.type === 'package' }) })
		];

		if (this.buildOptions.strip) plugins.push(strip({ include: ['./src/**/*.ts'] }),);
		if (this.buildOptions.minify) plugins.push(minify());

		// Get extra options
		const extraOptions = await this.getExtraOptions();

		// Process options
		const baseRollupOptions = { output, plugins };
		if (extraOptions) {
			baseRollupOptions.output.banner = extraOptions.output?.banner;
			baseRollupOptions.output.footer = extraOptions.output?.footer;
		}

		return baseRollupOptions;
	}

	private async getExtraOptions() {
		if (!await isFile(this.buildOptions.extraConfig)) return;
		const extraConfigTmpPath = join(this.buildOptions.extraConfig, `../tspbc-${randomStr()}.cjs`);
		await this.rollupBuild({
			input: this.buildOptions.extraConfig,
			output: {
				format: 'cjs',
				file: extraConfigTmpPath
			},
			plugins: [ts()]
		});

		const extraOptions = (await import(extraConfigTmpPath)).default;
		await rmFile(extraConfigTmpPath);
		return (extraOptions.default || extraOptions) as ExtraOptions;
	}

	private async rollupBuild(rollupOptions: RollupOptions) {
		const rollupBuild = await rollup.rollup(rollupOptions);
		await rollupBuild.write(rollupOptions.output as OutputOptions);
		await rollupBuild.close();
	}

	async build(inputs: string[]) {
		// Clear dist
		const root = resolve();
		const distPath = resolve(this.buildOptions.dist);
		if (!distPath.startsWith(root) && !this.buildOptions.forceClearDist) throw new Error('Dist folder outside the project catalog must be deleted by force using the --force-clear-dist flag.');
		await forceRmDir(distPath);

		// Get options and build
		const baseRollupOptions = await this.getBaseRollupOptions();
		if (!inputs.length) inputs.push('./src/index.ts');
		await Promise.all(inputs.map((input) => this.rollupBuild({ ...baseRollupOptions, input: resolve(input) })));
	}
}

export default Builder;
