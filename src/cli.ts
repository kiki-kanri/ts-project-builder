import { cli } from 'cleye';
import type { ModuleFormat } from 'rollup';

import { version } from '../package.json';
import Builder, { defaultConfigFilePath, defaultOutputDir } from './builder';
import type { NonNullableBuilderOutputOptions } from './types';
import { parseCliArgString } from './utils';

const BooleanOrStringSet = (value: string) => (value === '' ? true : new Set(value.split(',').map((value) => value.trim())));

(async () => {
	const args = cli({
		flags: {
			config: {
				alias: 'c',
				default: defaultConfigFilePath,
				type: String
			},
			dirs: {
				alias: 'd',
				default: defaultOutputDir,
				type: String
			},
			exts: { alias: 'e', type: String },
			formats: {
				alias: 'f',
				default: 'cjs,esm',
				type: String
			},
			minify: { alias: 'm', type: BooleanOrStringSet },
			preserveModules: { type: BooleanOrStringSet },
			preserveModulesRoots: { default: './src', type: String }
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
			dirs: parseCliArgString<NonNullableBuilderOutputOptions['dirs']>(args.flags.dirs),
			exts: parseCliArgString<NonNullableBuilderOutputOptions['exts']>(args.flags.exts || ''),
			formats: args.flags.formats.split(',') as ModuleFormat[],
			minify: args.flags.minify as Set<ModuleFormat> | undefined,
			preserveModules: args.flags.preserveModules as Set<ModuleFormat> | undefined,
			preserveModulesRoots: parseCliArgString<NonNullableBuilderOutputOptions['preserveModulesRoots']>(args.flags.preserveModulesRoots)
		}
	});

	if (!(await builder.build())) process.exit(1);
})();
