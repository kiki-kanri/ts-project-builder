import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import { cloneDeep, merge } from 'lodash-es';
import { resolve } from 'path';
import prettyMilliseconds from 'pretty-ms';
import { rollup } from 'rollup';
import type { ModuleFormat, OutputOptions, OutputPlugin, Plugin, RollupOptions } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import nodeExternals from 'rollup-plugin-node-externals';
import { pathToFileURL } from 'url';

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

export const defaultConfigFilePath = './ts-project-builder.config.mjs' as const;
export const defaultOutputDir = './dist' as const;
const outputFormatToExtMap: Partial<Record<ModuleFormat, string>> = {
	amd: 'amd.js',
	cjs: 'cjs',
	commonjs: 'cjs',
	es: 'mjs',
	esm: 'mjs',
	iife: 'life.js',
	module: 'mjs',
	system: 'system.js',
	systemjs: 'system.js',
	umd: 'umd.js'
};

export class Builder {
	#configFilePath: string;
	#options: BuilderOptions;

	constructor(options: BuilderOptions) {
		options = cloneDeep(options);
		if (!options.inputs.length) throw new Error('No inputs specified');
		options.output.formats = new Set(options.output.formats);
		if (!options.output.formats.size) throw new Error('No output formats specified');
		this.#configFilePath = options.configFilePath || defaultConfigFilePath;
		this.#options = options;
	}

	async #getConfig() {
		if (!this.#configFilePath) return {};
		try {
			if (!(await pathIsFile(this.#configFilePath))) {
				if (this.#configFilePath !== defaultConfigFilePath) throw new Error(`Config file not found: ${this.#configFilePath}`);
				return {};
			}

			const config = await import(pathToFileURL(resolve(this.#configFilePath)).toString());
			return (config && typeof config === 'object' && 'default' in config ? config.default : config) as Config;
		} catch (error) {
			handleError(error as Error);
		}
	}

	async build() {
		stderr(cyan('Starting build...'));
		const startAt = Date.now();
		const config = await this.#getConfig();
		if (!config) return false;
		const baseOutputOptions: BaseBuilderOutputOptions = {
			dir: this.#options.output.dirs?.default || defaultOutputDir,
			ext: this.#options.output.exts?.default,
			file: this.#options.output.files?.default,
			minify: this.#options.output.minify === true,
			preserveModules: this.#options.output.preserveModules === true,
			preserveModulesRoot: this.#options.output.preserveModulesRoots?.default || './src'
		};

		const enabledOutputMinifyFormats = new Set(typeof this.#options.output.minify === 'object' ? this.#options.output.minify : []);
		const enabledOutputPreserveModulesFormats = new Set(typeof this.#options.output.preserveModules === 'object' ? this.#options.output.preserveModules : []);
		const logOutputTargetsStrings: string[] = [];
		const rollupInputPlugins: Plugin[] = [
			...(config?.additionalInputPlugins?.beforeBuiltins || []),
			nodeExternals(config?.builtinInputPluginOptions?.nodeExternal),
			nodeResolve(config?.builtinInputPluginOptions?.nodeResolve),
			commonjs(config?.builtinInputPluginOptions?.commonjs),
			json(config?.builtinInputPluginOptions?.json),
			typescript(config?.builtinInputPluginOptions?.typescript),
			...(config?.additionalInputPlugins?.afterBuiltins || [])
		];

		// prettier-ignore
		const rollupOptions: RollupOptions = { ...config?.rollupOptions, input: [...new Set(this.#options.inputs)].map((input) => globSync(input)).flat().sort() };
		const rollupOutputs: OutputOptions[] = [];
		for (const format of this.#options.output.formats) {
			if (!availableOutputFormats.has(format)) throw new Error(`Invalid output format: ${format}`);
			const configOutputOptions = config?.outputOptions?.[format] || config?.outputOptions?.default;
			let outputOptions: Omit<OutputOptions, 'plugins'> & { plugins: OutputPlugin[] };
			if (configOutputOptions?.processMethod === 'replace') outputOptions = configOutputOptions.options as typeof outputOptions;
			else {
				outputOptions = {
					dir: this.#options.output.dirs?.[format] || baseOutputOptions.dir,
					entryFileNames: `[name].${this.#options.output.exts?.[format] || baseOutputOptions.ext || outputFormatToExtMap[format]}`,
					exports: 'named',
					externalLiveBindings: false,
					file: this.#options.output.files?.[format] || baseOutputOptions.file,
					generatedCode: {
						arrowFunctions: true,
						constBindings: true,
						objectShorthand: true
					},
					interop: 'compat',
					plugins: [],
					preserveModules: enabledOutputPreserveModulesFormats.has(format) || baseOutputOptions.preserveModules,
					preserveModulesRoot: this.#options.output.preserveModulesRoots?.[format] || baseOutputOptions.preserveModulesRoot
				};

				if (enabledOutputMinifyFormats.has(format) || baseOutputOptions.minify) outputOptions.plugins.push(minify(config?.builtinOutputPluginOptions?.minify?.[format] || config?.builtinOutputPluginOptions?.minify?.default));
				outputOptions.plugins.push(...(config?.additionalOutputPlugins?.[format]?.afterBuiltins || config?.additionalOutputPlugins?.default?.afterBuiltins || []));
				outputOptions.plugins.unshift(...(config?.additionalOutputPlugins?.[format]?.beforeBuiltins || config?.additionalOutputPlugins?.default?.beforeBuiltins || []));
				if (configOutputOptions?.processMethod === 'assign') Object.assign(outputOptions, configOutputOptions.options);
				else merge(outputOptions, configOutputOptions?.options);
			}

			outputOptions.format = format;
			if (outputOptions.file !== undefined) delete outputOptions.dir;
			if (outputOptions.dir) logOutputTargetsStrings.push(`${outputOptions.dir} (${format})`);
			if (outputOptions.file) logOutputTargetsStrings.push(`${outputOptions.file} (${format})`);
			rollupOutputs.push(outputOptions);
		}

		const logOutputTargetsString = bold(logOutputTargetsStrings.join(', ').trim());
		stderr(cyan(`${bold((rollupOptions.input as string[]).join(', ').trim())} → ${logOutputTargetsString}...`));
		try {
			const rollupResult = await rollup({ ...rollupOptions, plugins: rollupInputPlugins });
			await Promise.all(rollupOutputs.map((outputOptions) => rollupResult.write(outputOptions)));
		} catch (error) {
			handleError(error as Error);
			return false;
		}

		stderr(green(`Created ${logOutputTargetsString} in ${bold(prettyMilliseconds(Date.now() - startAt))}`));
		return true;
	}
}

export default Builder;
