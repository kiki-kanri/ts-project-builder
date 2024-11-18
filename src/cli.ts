import { cli } from 'cleye';
import { exit } from 'node:process';
import type { ModuleFormat } from 'rollup';

import { name, version } from '../package.json';

import Builder, { defaultConfigFilePath, defaultOutputDir, defaultOutputPreserveModulesRoot } from './builder';
import type { NonNullableBuilderOutputOptions } from './types';
import { parseCLIArgString } from './utils';
import { handleError } from './utils/rollup/logging';

const BooleanOrModuleFormats = (value: string) => (value === '' ? true : new Set(value.split(',').map((value) => value.trim().toLowerCase()))) as boolean | Set<ModuleFormat>;

(async () => {
	const args = cli({
		flags: {
			clean: { description: 'Clean the target directory or files before output.', type: BooleanOrModuleFormats },
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
			exts: { description: 'The output file extensions.', type: String },
			files: { description: 'The output file paths.', type: String },
			forceClean: { description: 'Force clean the target directory or files before output.', type: BooleanOrModuleFormats },
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
			preserveModulesRoots: { default: defaultOutputPreserveModulesRoot, type: String },
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
				dirs: parseCLIArgString<NonNullableBuilderOutputOptions['dirs']>(args.flags.dirs),
				exts: parseCLIArgString<NonNullableBuilderOutputOptions['exts']>(args.flags.exts || ''),
				files: parseCLIArgString<NonNullableBuilderOutputOptions['files']>(args.flags.files || ''),
				forceClean: args.flags.forceClean,
				formats: new Set(args.flags.formats.split(',') as ModuleFormat[]),
				minify: args.flags.minify,
				preserveModules: args.flags.preserveModules,
				preserveModulesRoots: parseCLIArgString<NonNullableBuilderOutputOptions['preserveModulesRoots']>(args.flags.preserveModulesRoots),
			},
		}).build();
	} catch (error) {
		handleError(error as Error);
		exit(1);
	}
})();
