import { ModuleFormat, OutputOptions, Plugin } from 'rollup';

export type BuildType = 'node' | 'package';

export interface BuildConfig {
	dist: string;
	extraConfig: string;
	format: ModuleFormat;
	input: string;
	minify: boolean;
	preserveModules: boolean;
	strip: boolean;
	type: BuildType;
}

export interface ExtraConfig {
	output: Pick<OutputOptions, 'banner' | 'footer'>;
	plugins?: {
		after?: Plugin[];
		before?: Plugin[];
	}
}
