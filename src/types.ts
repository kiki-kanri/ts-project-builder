import { RollupJsonOptions } from '@rollup/plugin-json';
import { RollupStripOptions } from '@rollup/plugin-strip';
import { ModuleFormat, OutputOptions, Plugin, RollupOptions } from 'rollup';
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

/**
 * Build extra options.
 *
 * Extends rollup options but without `input` option.
 *
 * @see {@link RollupOptions}
 * @see {@link https://rollupjs.org/configuration-options}
 */
export interface ExtraOptions extends Omit<RollupOptions, 'input' | 'output' | 'plugins'> {
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
	 * Rollup output options but without `dir`, `file`, `format` and `name` options.
	 */
	output?: Omit<OutputOptions, 'dir' | 'file' | 'format' | 'name'>;
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
