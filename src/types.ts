import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import type { RollupJsonOptions } from '@rollup/plugin-json';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import type { ModuleFormat, OutputOptions, OutputPlugin, Plugin, RollupOptions } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import type { ExternalsOptions } from 'rollup-plugin-node-externals';

type ConfigOutputOptions = { options: Omit<OutputOptions, 'format'>; processMethod?: 'assign' | 'lodash-merge' | 'replace' };
type MinifyOptions = Parameters<typeof minify>[0];
export type NonNullableBuilderOutputOptions = NonNullable<Required<BuilderOptions['output']>>;
type PartialModuleFormatDict<T, K extends string = never> = Partial<Record<ModuleFormat | K, T>>;

export interface BaseBuilderOutputOptions extends OutputOptions {
	ext?: string;
	minify: boolean;
}

export interface BuilderOptions {
	configFilePath?: string;
	inputs: string[];
	output: {
		dirs?: PartialModuleFormatDict<string, 'default'>;
		exts?: PartialModuleFormatDict<string, 'default'>;
		formats: ModuleFormat[] | Set<ModuleFormat>;
		minify?: boolean | ModuleFormat[] | Set<ModuleFormat>;
		preserveModules?: boolean | ModuleFormat[] | Set<ModuleFormat>;
		preserveModulesRoots?: PartialModuleFormatDict<string, 'default'>;
	};
}

export interface Config {
	additionalInputPlugins?: { afterBuiltins?: Plugin[]; beforeBuiltins?: Plugin[] };
	additionalOutputPlugins?: PartialModuleFormatDict<{ afterBuiltins?: OutputPlugin[]; beforeBuiltins?: OutputPlugin[] }, 'default'>;
	builtinInputPluginOptions?: {
		commonjs?: RollupCommonJSOptions;
		json?: RollupJsonOptions;
		nodeExternal?: ExternalsOptions;
		nodeResolve?: RollupNodeResolveOptions;
		typescript?: RollupTypescriptOptions;
	};

	builtinOutputPluginOptions?: { minify?: PartialModuleFormatDict<MinifyOptions, 'default'> };
	outputOptions?: PartialModuleFormatDict<ConfigOutputOptions, 'default'>;
	rollupOptions?: Omit<RollupOptions, 'input' | 'output' | 'plugins'>;
}
