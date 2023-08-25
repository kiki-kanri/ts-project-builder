import { cli } from 'cleye';
import { ModuleFormat } from 'rollup';

import { version } from '../package.json';
import { BuildConfig, BuildType, build } from './build';

const cliArgs = cli({
	flags: {
		buildType: {
			default: 'node' as BuildType,
			description: 'Build target type.',
			type: (type: BuildType) => {
				if (!['node', 'package'].includes(type)) throw new Error(`Invalid build type: "${type}".`);
				return type;
			}
		},
		clean: {
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
			default: './ts-project-builder.config.js',
			description: 'Set extra config js file path.',
			type: String
		},
		format: {
			alias: 'f',
			description: 'Rollup output module format. Default is es if --build-type is node; cjs otherwise.',
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
		}
	},
	name: 'ts-project-builder',
	parameters: [
		'[input]'
	],
	version
});

async function main() {
	const flags = cliArgs.flags;
	flags.format = flags.format || flags.buildType === 'node' ? 'es' : 'cjs';
	flags.minify = flags.noMinify ? false : flags.buildType === 'node';
	flags.preserveModules = flags.noPreserveModules ? false : flags.buildType === 'package';
	const buildConfig: BuildConfig = {
		clean: flags.clean,
		dist: flags.dist,
		extraConfig: flags.extraConfig,
		format: flags.format,
		input: cliArgs._.input || './src/index.ts',
		minify: flags.minify,
		preserveModules: flags.preserveModules,
		strip: !flags.noStrip,
		type: flags.buildType
	};

	await build(buildConfig);
}

(async () => await main())();
