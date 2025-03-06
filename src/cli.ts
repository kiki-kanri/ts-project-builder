import { cli } from 'cleye';
import type { ModuleFormat } from 'rollup';

import {
    name,
    version,
} from '../package.json';

import Builder, {
    defaultConfigFilePath,
    defaultOutputDir,
    defaultOutputPreserveModulesRoot,
} from './builder';
import type { NonNullableBuilderOutputOptions } from './types';
import { parseCliArgString } from './utils';
import { handleError } from './utils/rollup/logging';

const BooleanOrModuleFormats = (value: string) => (value === '' ? true : new Set(value.split(',').map((value) => value.trim().toLowerCase()))) as boolean | Set<ModuleFormat>;

function parseSourcemapFlagValue(value?: string) {
    if (!value || value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'hidden' || value === 'inline') return value;
    throw new Error(`Invalid sourcemap option: '${value}'. Valid options are 'true', 'false', 'hidden', or 'inline'.`);
}

(async () => {
    const args = cli({
        flags: {
            clean: {
                description: 'Clean the target directory or files before output.',
                type: BooleanOrModuleFormats,
            },
            config: {
                alias: 'c',
                default: defaultConfigFilePath,
                description: 'The path to the config file.',
                type: String,
            },
            dirs: {
                default: defaultOutputDir,
                description: 'The output directory paths.',
                type: String,
            },
            exts: {
                description: 'The output file extensions.',
                type: String,
            },
            files: {
                description: 'The output file paths.',
                type: String,
            },
            forceClean: {
                description: 'Force clean the target directory or files before output.',
                type: BooleanOrModuleFormats,
            },
            formats: {
                alias: 'f',
                default: 'cjs,esm',
                description: 'The output formats.',
                type: String,
            },
            minify: {
                alias: 'm',
                description: 'Enable minify output.',
                type: BooleanOrModuleFormats,
            },
            preserveModules: { type: BooleanOrModuleFormats },
            preserveModulesRoots: {
                default: defaultOutputPreserveModulesRoot,
                type: String,
            },
            sourcemaps: {
                description: 'The output sourcemap options.',
                type: String,
            },
        },
        help: { usage: `${name} <inputs...> [flags...]` },
        name,
        parameters: ['<inputs...>'],
        version,
    });

    const inputs = args._.inputs;
    if (!inputs.length) inputs.push('./src/index.ts');
    try {
        await new Builder({
            configFilePath: args.flags.config,
            inputs,
            output: {
                clean: args.flags.clean,
                dirs: parseCliArgString<NonNullableBuilderOutputOptions['dirs']>(args.flags.dirs),
                exts: parseCliArgString<NonNullableBuilderOutputOptions['exts']>(args.flags.exts || ''),
                files: parseCliArgString<NonNullableBuilderOutputOptions['files']>(args.flags.files || ''),
                forceClean: args.flags.forceClean,
                formats: new Set(args.flags.formats.split(',') as ModuleFormat[]),
                minify: args.flags.minify,
                preserveModules: args.flags.preserveModules,
                preserveModulesRoots: parseCliArgString<NonNullableBuilderOutputOptions['preserveModulesRoots']>(args.flags.preserveModulesRoots),
                sourcemaps: (() => {
                    if (args.flags.sourcemaps === undefined) return;
                    const parseResult = parseCliArgString(args.flags.sourcemaps);
                    const sourcemaps: NonNullableBuilderOutputOptions['sourcemaps'] = {};
                    for (const key in parseResult) sourcemaps[key as keyof NonNullableBuilderOutputOptions['sourcemaps']] = parseSourcemapFlagValue(parseResult[key]);
                    sourcemaps.default ??= true;
                    return sourcemaps;
                })(),
            },
        }).build();
    } catch (error) {
        handleError(error as Error);
        process.exit(1);
    }
})();
