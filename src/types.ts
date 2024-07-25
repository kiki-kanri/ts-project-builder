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

export interface BuilderOptions {
	configFilePath?: string;
	inputs: string[];
	output: {
		clean?: boolean | Set<ModuleFormat>;
		dirs?: PartialModuleFormatDict<string, 'default'>;
		exts?: PartialModuleFormatDict<string, 'default'>;
		files?: PartialModuleFormatDict<string, 'default'>;
		forceClean?: boolean | Set<ModuleFormat>;
		formats: Set<ModuleFormat>;
		minify?: boolean | Set<ModuleFormat>;
		preserveModules?: boolean | Set<ModuleFormat>;
		preserveModulesRoots?: PartialModuleFormatDict<string, 'default'>;
	};
}

export interface Config {
	additionalInputPlugins?: { afterBuiltIns?: Plugin[]; beforeBuiltIns?: Plugin[] };
	additionalOutputPlugins?: PartialModuleFormatDict<{ afterBuiltIns?: OutputPlugin[]; beforeBuiltIns?: OutputPlugin[] }, 'default'>;
	builtInInputPluginOptions?: {
		commonjs?: RollupCommonJSOptions;
		json?: RollupJsonOptions;
		nodeExternal?: ExternalsOptions;
		nodeResolve?: RollupNodeResolveOptions;
		typescript?: RollupTypescriptOptions;
	};

	builtInOutputPluginOptions?: { minify?: PartialModuleFormatDict<MinifyOptions, 'default'> };
	outputOptions?: PartialModuleFormatDict<ConfigOutputOptions, 'default'>;
	rollupOptions?: Omit<RollupOptions, 'input' | 'output' | 'plugins'>;
}
