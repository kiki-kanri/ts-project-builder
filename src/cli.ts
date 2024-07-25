import { cli } from 'cleye';
import type { ModuleFormat } from 'rollup';

import { version } from '../package.json';
import Builder, { defaultConfigFilePath, defaultOutputDir, defaultOutputPreserveModulesRoot } from './builder';
import type { NonNullableBuilderOutputOptions } from './types';
import { parseCliArgString } from './utils';

const BooleanOrModuleFormats = (value: string) => (value === '' ? true : new Set(value.split(',').map((value) => value.trim().toLowerCase()))) as boolean | Set<ModuleFormat>;

(async () => {
	const args = cli({
		flags: {
			clean: { type: BooleanOrModuleFormats },
			config: {
				alias: 'c',
				default: defaultConfigFilePath,
				type: String
			},
			dirs: { default: defaultOutputDir, type: String },
			exts: { type: String },
			files: { type: String },
			forceClean: { type: BooleanOrModuleFormats },
			formats: {
				alias: 'f',
				default: 'cjs,esm',
				type: String
			},
			minify: { alias: 'm', type: BooleanOrModuleFormats },
			preserveModules: { type: BooleanOrModuleFormats },
			preserveModulesRoots: { default: defaultOutputPreserveModulesRoot, type: String }
		},
		name: 'ts-project-builder',
		parameters: ['[inputs...]'],
		version
	});

	const inputs = args._.inputs;
	if (!inputs.length) inputs.push('./src/index.ts');
	const builder = new Builder({
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
			preserveModulesRoots: parseCliArgString<NonNullableBuilderOutputOptions['preserveModulesRoots']>(args.flags.preserveModulesRoots)
		}
	});

	if (!(await builder.build())) process.exit(1);
})();
