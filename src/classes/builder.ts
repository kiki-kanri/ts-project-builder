import commonjs from '@rollup/plugin-commonjs';
import rollupPluginJson from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import { resolve } from 'path';
import ms from 'pretty-ms';
import { rollup } from 'rollup';
import type { OutputOptions, RollupBuild, RollupError, RollupOptions } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import ts from 'rollup-plugin-ts';
import { pathToFileURL } from 'url';

import { cyan, green } from '@/library/_rollup/colors';
import { handleError, stderr } from '@/library/_rollup/logging';
import { forceRmDir, isFile } from '@/library/utils';
import type { BuildOptions, ExtraOptions } from '@/types';

const defaultPackageOutputOptions = {
	externalLiveBindings: false,
	generatedCode: {
		arrowFunctions: true,
		constBindings: true,
		objectShorthand: true
	}
} as const;

export class Builder {
	#buildOptions: BuildOptions;

	constructor(buildOptions: BuildOptions) {
		this.#buildOptions = buildOptions;
		buildOptions.dist = resolve(buildOptions.dist);
		buildOptions.extraConfig = resolve(buildOptions.extraConfig);
	}

	async #getBaseRollupOptions() {
		// Get extra options
		const extraOptions = await this.#getExtraOptions();
		if (extraOptions === false) return;

		// Get output options
		const output: OutputOptions = {
			dir: this.#buildOptions.dist,
			format: this.#buildOptions.format,
			interop: 'compat'
		};

		if (this.#buildOptions.type === 'package') Object.assign(output, defaultPackageOutputOptions);
		if (this.#buildOptions.preserveModules) {
			output.exports = 'named';
			output.preserveModules = true;
		}

		// Get plugins
		const plugins = [
			externals(extraOptions?.builtinPluginOptions?.external),
			rollupPluginJson(extraOptions?.builtinPluginOptions?.json),
			ts({
				tsconfig: (config) => ({ ...config, declaration: this.#buildOptions.type === 'package' }),
				...extraOptions?.builtinPluginOptions?.ts
			}),
			nodeResolve(extraOptions?.builtinPluginOptions?.nodeResolve),
			commonjs(extraOptions?.builtinPluginOptions?.commonjs)
		];

		if (this.#buildOptions.strip) plugins.push(strip({ include: ['./src/**/*.ts'], ...extraOptions?.builtinPluginOptions?.strip }));
		if (this.#buildOptions.minify) plugins.push(minify(extraOptions?.builtinPluginOptions?.esbuildMinify));

		// Process options
		const rollupOptions = <RollupOptions>{
			output,
			plugins,
			strictDeprecations: true
		};

		if (extraOptions) {
			// Output options and plugins
			Object.assign(output, extraOptions.output || {});
			plugins.push(...(extraOptions.plugins?.after || []));
			plugins.unshift(...(extraOptions.plugins?.before || []));

			// Merge other options
			delete extraOptions.builtinPluginOptions;
			delete extraOptions.output;
			delete extraOptions.plugins;
			Object.assign(rollupOptions, extraOptions);
		}

		return rollupOptions;
	}

	async #getExtraOptions() {
		if (!(await isFile(this.#buildOptions.extraConfig))) return;
		try {
			const extraOptions = await import(pathToFileURL(this.#buildOptions.extraConfig).toString());
			return (extraOptions.default || extraOptions) as ExtraOptions;
		} catch (error) {
			handleError(error as RollupError);
		}

		return false;
	}

	async #rollupBuild(rollupOptions: RollupOptions) {
		let rollupBuild: RollupBuild | undefined;
		let successBuild = false;

		try {
			rollupBuild = await rollup(rollupOptions);
			(await rollupBuild.write(rollupOptions.output as OutputOptions)) && (successBuild = true);
		} catch (error) {
			handleError(error as RollupError);
		}

		await rollupBuild?.close();
		return successBuild;
	}

	async build(inputs: string[]) {
		const st = Date.now();
		stderr(cyan('Starting build...'));

		// Clear dist
		if (this.#buildOptions.clearDist) {
			const root = resolve();
			const distPath = resolve(this.#buildOptions.dist);
			if (!distPath.startsWith(root) && !this.#buildOptions.forceClearDist) throw new Error('Dist folder outside the project catalog must be deleted by force using the --force-clear-dist flag.');
			await forceRmDir(distPath);
		}

		// Get options and build
		const baseRollupOptions = await this.#getBaseRollupOptions();
		if (!baseRollupOptions) return;
		if (!inputs.length) inputs.push('./src/index.ts');
		const promises = inputs.map((input) => this.#rollupBuild({ ...baseRollupOptions, input: resolve(input) }));
		const results = await Promise.all(promises);
		if (results.every((result) => result)) return stderr(green(`Success build in ${ms(Date.now() - st)}.`)) || true;
	}
}

export default Builder;
