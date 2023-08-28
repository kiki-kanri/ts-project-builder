import rollupPluginJson from '@rollup/plugin-json';
import strip from '@rollup/plugin-strip';
import { resolve, join } from 'path';
import ms from 'pretty-ms';
import { OutputOptions, RollupError, RollupOptions, rollup } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import ts from 'rollup-plugin-ts';

import { cyan, green } from '@/library/_rollup/colors';
import { handleError, stderr } from '@/library/_rollup/logging';
import { forceRmDir, isFile, randomStr, rmFile } from '@/library/utils';
import { BuildOptions, ExtraOptions } from '@/types';

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

	constructor(buildOptions: BuildOptions) {
		this.buildOptions = buildOptions;
		buildOptions.dist = resolve(buildOptions.dist);
		buildOptions.extraConfig = resolve(buildOptions.extraConfig);
	}

	private async getBaseRollupOptions() {
		// Get extra options
		const extraOptions = await this.getExtraOptions();

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
		const plugins = [
			externals(extraOptions?.builtinPluginOptions?.external),
			rollupPluginJson(extraOptions?.builtinPluginOptions?.json),
			ts({
				tsconfig: (config) => ({ ...config, declaration: this.buildOptions.type === 'package' }),
				...extraOptions?.builtinPluginOptions?.ts
			})
		];

		if (this.buildOptions.strip) plugins.push(strip({ include: ['./src/**/*.ts'], ...extraOptions?.builtinPluginOptions?.strip }),);
		if (this.buildOptions.minify) plugins.push(minify(extraOptions?.builtinPluginOptions?.esbuildMinify));

		// Process options
		if (extraOptions) {
			output.banner = extraOptions.output?.banner;
			output.footer = extraOptions.output?.footer;
			plugins.push(...(extraOptions.plugins?.after || []));
			plugins.unshift(...(extraOptions.plugins?.before || []));
		}

		return { output, plugins };
	}

	private async getExtraOptions() {
		if (!await isFile(this.buildOptions.extraConfig)) return;
		const extraConfigTmpPath = join(this.buildOptions.extraConfig, `../tspbc-${randomStr()}.mjs`);
		await this.rollupBuild({
			external: () => true,
			input: this.buildOptions.extraConfig,
			output: {
				format: 'es',
				file: extraConfigTmpPath
			},
			plugins: [ts()]
		});

		const extraOptions = (await import(extraConfigTmpPath)).default;
		await rmFile(extraConfigTmpPath);
		return (extraOptions.default || extraOptions) as ExtraOptions;
	}

	private async rollupBuild(rollupOptions: RollupOptions) {
		let successBuild = false;
		const rollupBuild = await rollup(rollupOptions);

		try {
			await rollupBuild.write(rollupOptions.output as OutputOptions);
			successBuild = true;
		} catch (error) {
			handleError(error as RollupError, true);
		}

		await rollupBuild.close();
		return successBuild;
	}

	async build(inputs: string[]) {
		const st = Date.now();
		stderr(cyan('Starting build...'));

		// Clear dist
		if (this.buildOptions.clearDist) {
			const root = resolve();
			const distPath = resolve(this.buildOptions.dist);
			if (!distPath.startsWith(root) && !this.buildOptions.forceClearDist) throw new Error('Dist folder outside the project catalog must be deleted by force using the --force-clear-dist flag.');
			await forceRmDir(distPath);
		}

		// Get options and build
		const baseRollupOptions = await this.getBaseRollupOptions();
		if (!inputs.length) inputs.push('./src/index.ts');
		const promises = inputs.map((input) => this.rollupBuild({ ...baseRollupOptions, input: resolve(input) }));
		await Promise.all(promises);
		if (promises.every(async (promise) => await promise)) stderr(green(`Success build in ${ms(Date.now() - st)}.`));
	}
}

export default Builder;
