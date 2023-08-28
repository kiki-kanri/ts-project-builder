import { RollupJsonOptions } from '@rollup/plugin-json';
import { RollupStripOptions } from '@rollup/plugin-strip';
import { ModuleFormat, OutputOptions, Plugin } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import { ExternalsOptions } from 'rollup-plugin-node-externals';
import { TypescriptPluginOptions } from 'rollup-plugin-ts';

export type BuildType = 'node' | 'package';

export interface BuildOptions {
	clearDist: boolean;
	dist: string;
	extraConfig: string;
	forceClearDist: boolean;
	format: ModuleFormat;
	minify: boolean;
	preserveModules: boolean;
	strip: boolean;
	type: BuildType;
}

export interface ExtraOptions {
	/**
	 * Builtin plugins options.
	 */
	builtinPluginOptions?: {
		esbuildMinify?: Parameters<typeof minify>[0];
		external?: ExternalsOptions;
		json?: RollupJsonOptions;
		strip?: RollupStripOptions;
		ts?: Partial<TypescriptPluginOptions>;
	}

	/**
	 * Rollup output options.
	 *
	 * Not all options can be entered.
	 */
	output?: Pick<OutputOptions, 'banner' | 'footer'>;
	plugins?: {
		/**
		 * Insert plugins after builtins.
		 */
		after?: Plugin[];

		/**
		 * Insert plugins before builtins.
		 */
		before?: Plugin[];
	}
}
