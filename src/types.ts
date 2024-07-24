import type { ModuleFormat, OutputOptions } from 'rollup';

export type NonNullableBuilderOutputOptions = NonNullable<Required<BuilderOptions['output']>>;
type PartialModuleFormatDict<T> = Partial<Record<ModuleFormat, T>>;

export interface BaseBuilderOutputOptions extends OutputOptions {
	ext?: string;
	minify: boolean;
}

export interface BuilderOptions {
	configFilePath?: string;
	inputs: string[];
	output: {
		dirs?: { default?: string } & PartialModuleFormatDict<string>;
		exts?: { default?: string } & PartialModuleFormatDict<string>;
		formats: ModuleFormat[] | Set<ModuleFormat>;
		minify?: boolean | ModuleFormat[] | Set<ModuleFormat>;
		preserveModules?: boolean | ModuleFormat[] | Set<ModuleFormat>;
		preserveModulesRoots?: { default?: string } & PartialModuleFormatDict<string>;
	};
}

export interface Config {}
