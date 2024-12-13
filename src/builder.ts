import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import {
    cloneDeep,
    merge,
} from 'lodash-es';
import { rm } from 'node:fs/promises';
import {
    isAbsolute,
    relative,
    resolve,
} from 'node:path';
import { pathToFileURL } from 'node:url';
import prettyMilliseconds from 'pretty-ms';
import { rollup } from 'rollup';
import type {
    ModuleFormat,
    OutputOptions,
    OutputPlugin,
    Plugin,
    RollupOptions,
} from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import nodeExternals from 'rollup-plugin-node-externals';
import type { SetFieldType } from 'type-fest';

import type {
    BuilderOptions,
    Config,
} from './types';
import { pathIsFile } from './utils';
import {
    bold,
    cyan,
    green,
} from './utils/rollup/colors';
import { stderr } from './utils/rollup/logging';

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
    'umd',
]);

export const defaultConfigFilePath = './ts-project-builder.config.mjs' as const;
export const defaultOutputDir = './dist' as const;
export const defaultOutputPreserveModulesRoot = './src' as const;
const outputFormatToExtMap = Object.freeze<Record<ModuleFormat, string>>({
    amd: 'amd.js',
    cjs: 'cjs',
    commonjs: 'cjs',
    es: 'mjs',
    esm: 'mjs',
    iife: 'iife.js',
    module: 'mjs',
    system: 'system.js',
    systemjs: 'system.js',
    umd: 'umd.js',
});

export class Builder {
    #configFilePath: string;
    #options: BuilderOptions;

    constructor(options: BuilderOptions) {
        options = cloneDeep(options);
        if (!options.inputs.length) throw new Error('No inputs specified');
        if (!options.output.formats.size) throw new Error('No output formats specified');
        this.#configFilePath = resolve(options.configFilePath || defaultConfigFilePath);
        this.#options = options;
    }

    async #getConfig() {
        if (!this.#configFilePath) return {};
        if (!await pathIsFile(this.#configFilePath)) {
            if (relative(this.#configFilePath, resolve(defaultConfigFilePath)) !== '') throw new Error(`Config file not found: ${this.#configFilePath}`);
            return {};
        }

        const config = await import(pathToFileURL(resolve(this.#configFilePath)).toString());
        return (config && typeof config === 'object' && 'default' in config ? config.default : config) as Config;
    }

    #isOutputOptionEnabled(format: ModuleFormat, optionKey: 'clean' | 'forceClean' | 'minify' | 'preserveModules') {
        if (!this.#options.output[optionKey]) return;
        return this.#options.output[optionKey] === true || this.#options.output[optionKey].has(format);
    }

    async build() {
        stderr(cyan('Starting build...'));
        const startAt = Date.now();
        const config = await this.#getConfig();
        const baseOutputOptions: OutputOptions & { ext?: string } = {
            dir: this.#options.output.dirs?.default || defaultOutputDir,
            ext: this.#options.output.exts?.default,
            file: this.#options.output.files?.default,
            preserveModulesRoot: this.#options.output.preserveModulesRoots?.default || defaultOutputPreserveModulesRoot,
        };

        const logOutputTargetsStrings: string[] = [];
        const rollupInputPlugins: Plugin[] = [
            ...config?.additionalInputPlugins?.beforeBuiltIns || [],
            nodeExternals(config?.builtInInputPluginOptions?.nodeExternal),
            nodeResolve(config?.builtInInputPluginOptions?.nodeResolve),
            commonjs(config?.builtInInputPluginOptions?.commonjs),
            json(config?.builtInInputPluginOptions?.json),
            typescript(config?.builtInInputPluginOptions?.typescript),
            ...config?.additionalInputPlugins?.afterBuiltIns || [],
        ];

        const rollupOptions: RollupOptions = {
            ...config?.rollupOptions,
            input: [...new Set(this.#options.inputs)].map((input) => globSync(input)).flat().sort(),
        };

        const rollupOutputs: OutputOptions[] = [];
        const rootPath = resolve();
        const toRemovePaths = new Set<string>();
        for (const format of this.#options.output.formats) {
            if (!availableOutputFormats.has(format)) throw new Error(`Invalid output format: ${format}`);
            const configOutputOptions = config?.outputOptions?.[format] || config?.outputOptions?.default;
            let outputOptions: SetFieldType<OutputOptions, 'plugins', OutputPlugin[]>;
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
                        objectShorthand: true,
                    },
                    interop: 'compat',
                    plugins: [],
                    preserveModules: this.#isOutputOptionEnabled(format, 'preserveModules'),
                    preserveModulesRoot: this.#options.output.preserveModulesRoots?.[format] || baseOutputOptions.preserveModulesRoot,
                };

                if (this.#isOutputOptionEnabled(format, 'minify')) outputOptions.plugins.push(minify(config?.builtInOutputPluginOptions?.minify?.[format] || config?.builtInOutputPluginOptions?.minify?.default));
                outputOptions.plugins.push(...config?.additionalOutputPlugins?.[format]?.afterBuiltIns || config?.additionalOutputPlugins?.default?.afterBuiltIns || []);
                outputOptions.plugins.unshift(...config?.additionalOutputPlugins?.[format]?.beforeBuiltIns || config?.additionalOutputPlugins?.default?.beforeBuiltIns || []);
                if (configOutputOptions?.processMethod === 'assign') Object.assign(outputOptions, configOutputOptions.options);
                else merge(outputOptions, configOutputOptions?.options);
            }

            outputOptions.format = format;
            if (outputOptions.file) {
                delete outputOptions.dir;
                logOutputTargetsStrings.push(`${outputOptions.file} (${format})`);
            } else if (outputOptions.dir) {
                delete outputOptions.file;
                logOutputTargetsStrings.push(`${outputOptions.dir} (${format})`);
            }

            if (this.#isOutputOptionEnabled(format, 'clean')) {
                const outputPath = outputOptions.dir || outputOptions.file;
                if (outputPath) {
                    const absoluteOutputPath = resolve(outputPath);
                    const relativePath = relative(rootPath, absoluteOutputPath);
                    if (relativePath === '') throw new Error('The directory to be cleared is the same as the running directory.');
                    if (!(!isAbsolute(relativePath) && !relativePath.startsWith('..')) && !this.#isOutputOptionEnabled(format, 'forceClean')) {
                        throw new Error(`The path "${absoluteOutputPath}" to be cleaned is not under the running directory. To force clean, please add the --force-clean parameter.`);
                    }

                    toRemovePaths.add(absoluteOutputPath);
                }
            }

            rollupOutputs.push(outputOptions);
        }

        const logOutputTargetsString = bold(logOutputTargetsStrings.join(', ').trim());
        stderr(cyan(`${bold((rollupOptions.input as string[]).join(', ').trim())} → ${logOutputTargetsString}...`));
        const rollupResult = await rollup({
            ...rollupOptions,
            plugins: rollupInputPlugins,
        });

        await Promise.all(
            [...toRemovePaths].map(async (path) => rm(
                path,
                {
                    force: true,
                    recursive: true,
                },
            )),
        );

        await Promise.all(rollupOutputs.map((outputOptions) => rollupResult.write(outputOptions)));
        stderr(green(`Created ${logOutputTargetsString} in ${bold(prettyMilliseconds(Date.now() - startAt))}`));
    }
}

export default Builder;
