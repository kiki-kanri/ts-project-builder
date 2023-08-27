import { ModuleFormat, OutputOptions, Plugin } from 'rollup';

export type BuildType = 'node' | 'package';

export interface BuildOptions {
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
	output?: Pick<OutputOptions, 'banner' | 'footer'>;
	plugins?: {
		after?: ((...args: any[]) => Plugin)[];
		before?: ((...args: any[]) => Plugin)[];
	}
}
