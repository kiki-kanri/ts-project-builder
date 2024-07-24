import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import { cloneDeep } from 'lodash-es';
import { resolve } from 'path';
import prettyMilliseconds from 'pretty-ms';
import { rollup } from 'rollup';
import type { InputPluginOption, ModuleFormat, OutputOptions, OutputPlugin, RollupOptions } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import nodeExternals from 'rollup-plugin-node-externals';

import type { BaseBuilderOutputOptions, BuilderOptions, Config } from './types';
import { pathIsFile } from './utils';
import { bold, cyan, green } from './utils/rollup/colors';
import { handleError, stderr } from './utils/rollup/logging';

const availableOutputFormats = new Set<ModuleFormat>([
	'amd',
	'cjs',
	'commonjs',
	'es',
	'esm',
	'iife',
	'module',
	'system',
	'systemjs',
	'umd'
]);

const outputFormatToExtMap: Partial<Record<ModuleFormat, string>> = {
	amd: '.amd.js',
	cjs: 'cjs',
	commonjs: 'cjs',
	es: 'mjs',
	esm: 'mjs',
	iife: '.life.js',
	module: 'mjs',
	system: '.system.js',
	systemjs: '.system.js',
	umd: '.umd.js'
};

export class Builder {
	#configFilePath?: string;
	#options: BuilderOptions;

	constructor(options: BuilderOptions) {
		options = cloneDeep(options);
		if (!options.inputs.length) throw new Error('No inputs specified');
		options.output.formats = new Set(options.output.formats);
		if (!options.output.formats.size) throw new Error('No output formats specified');
		this.#configFilePath = options.configFilePath;
		this.#options = options;
	}

	async #getConfig() {
		if (!this.#configFilePath || !(await pathIsFile(this.#configFilePath))) return;
		try {
			const config = await import(resolve(this.#configFilePath));
			return config as Config;
		} catch (error) {
			handleError(error as Error);
		}

		return false;
	}

	async build() {
		stderr(cyan('Start build...'));
		const startAt = Date.now();
		const config = await this.#getConfig();
		const baseOutputOptions: BaseBuilderOutputOptions = {
			dir: this.#options.output.dirs?.default || './dist',
			ext: this.#options.output.exts?.default,
			minify: this.#options.output.minify === true,
			preserveModules: this.#options.output.preserveModules === true,
			preserveModulesRoot: this.#options.output.preserveModulesRoots?.default || './src'
		};

		const enabledOutputMinifyFormats = new Set(typeof this.#options.output.minify === 'object' ? this.#options.output.minify : []);
		const enabledOutputPreserveModulesFormats = new Set(typeof this.#options.output.preserveModules === 'object' ? this.#options.output.preserveModules : []);
		let logOutputDirsStrings: string[] = [];
		const rollupInputPlugins: InputPluginOption = [
			json(),
			nodeResolve(),
			nodeExternals(),
			commonjs(),
			typescript()
		];

		// prettier-ignore
		const rollupOptions: RollupOptions = { input: [...new Set(this.#options.inputs)].map((input) => globSync(input)).flat().sort() };
		const rollupOutputs: OutputOptions[] = [];
		for (const format of this.#options.output.formats) {
			if (!availableOutputFormats.has(format)) throw new Error(`Invalid output format: ${format}`);
			const outputOptions: Omit<OutputOptions, 'plugins'> & { plugins: OutputPlugin[] } = {
				dir: this.#options.output.dirs?.[format] ?? baseOutputOptions.dir,
				entryFileNames: `[name].${this.#options.output.exts?.[format] || baseOutputOptions.ext || outputFormatToExtMap[format] || 'js'}`,
				exports: 'named',
				externalLiveBindings: false,
				format,
				generatedCode: {
					arrowFunctions: true,
					constBindings: true,
					objectShorthand: true
				},
				interop: 'compat',
				plugins: [],
				preserveModules: enabledOutputPreserveModulesFormats.has(format) || baseOutputOptions.preserveModules,
				preserveModulesRoot: this.#options.output.preserveModulesRoots?.[format] ?? baseOutputOptions.preserveModulesRoot
			};

			if (enabledOutputMinifyFormats.has(format) || baseOutputOptions.minify) outputOptions.plugins.push(minify());
			logOutputDirsStrings.push(`${outputOptions.dir!} (${format})`);
			rollupOutputs.push(outputOptions);
		}

		stderr(cyan(`\n${bold((rollupOptions.input as string[]).join(', '))}  → ${bold(logOutputDirsStrings.join(', '))}...`));
		try {
			const rollupResult = await rollup({ ...rollupOptions, plugins: rollupInputPlugins });
			await Promise.all(rollupOutputs.map((outputOptions) => rollupResult.write(outputOptions)));
		} catch (error) {
			handleError(error as Error);
			return false;
		}

		stderr(green(`created ${bold(logOutputDirsStrings.join(', '))} in ${bold(prettyMilliseconds(Date.now() - startAt))}`));
		return true;
	}
}

export default Builder;
