import { cli } from 'cleye';
import { ModuleFormat } from 'rollup';

import { version } from '../package.json';
import Builder from '@/classes/builder';
import { getPackageJson } from '@/library/utils';
import { BuildOptions, BuildType } from '@/types';

const cliArgs = cli({
	flags: {
		clearDist: {
			alias: 'c',
			default: false,
			description: 'Clear dist dir when build.',
			type: Boolean
		},
		dist: {
			alias: 'd',
			default: './dist',
			description: 'Output dir.',
			type: String
		},
		extraConfig: {
			default: './ts-project-builder.config.mjs',
			description: 'Set extra config mjs file path.',
			type: String
		},
		forceClearDist: {
			default: false,
			description: 'Forced deletion of the dist folder regardless of whether it is in the project directory or not.',
			type: Boolean
		},
		format: {
			alias: 'f',
			description: 'Rollup output module format. Default is es if package.json type value is module; cjs otherwise.',
			type: (format: ModuleFormat) => {
				const allowFormats = ['amd', 'cjs', 'commonjs', 'es', 'esm', 'iife', 'module', 'system', 'systemjs', 'umd'];
				if (!allowFormats.includes(format)) throw new Error(`Invalid module format: "${format}".`);
				return format;
			}
		},
		minify: {
			alias: 'm',
			description: 'Minify output code. Default is enable if --build-type is node.',
			type: Boolean
		},
		noMinify: {
			description: 'Disable minify output code.',
			type: Boolean
		},
		noPreserveModules: {
			description: 'Disable rollup output preserveModules.',
			type: Boolean
		},
		noStrip: {
			default: false,
			description: 'Disable rollup strip plugin.',
			type: Boolean
		},
		preserveModules: {
			description: 'Enable rollup output preserveModules. Default is enable if --build-type is package.',
			type: Boolean
		},
		type: {
			alias: 't',
			default: 'node' as BuildType,
			description: 'Build target type.',
			type: (value: BuildType) => {
				if (!value.match(/node|package/)) throw new Error(`Invalid build type: "${value}".`);
				return value;
			}
		}
	},
	name: 'ts-project-builder',
	parameters: [
		'[inputs...]'
	],
	version
});

async function main() {
	// Get package.json data
	const packageJson = await getPackageJson();

	// Process args default value
	const flags = cliArgs.flags;
	if (!flags.format) flags.format = packageJson?.type === 'module' ? 'es' : 'cjs';
	flags.minify = flags.noMinify ? false : flags.type === 'node' || flags.minify || false;
	flags.preserveModules = flags.noPreserveModules ? false : flags.type === 'package' || flags.preserveModules || false;
	const buildOptions: BuildOptions = {
		clearDist: flags.clearDist,
		dist: flags.dist,
		extraConfig: flags.extraConfig,
		forceClearDist: flags.forceClearDist,
		format: flags.format,
		minify: flags.minify,
		preserveModules: flags.preserveModules,
		strip: !flags.noStrip,
		type: flags.type
	};

	const builder = new Builder(buildOptions);
	await builder.build(cliArgs._.inputs);
}

(async () => await main())();
