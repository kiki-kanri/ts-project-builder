import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import type { RollupJsonOptions } from '@rollup/plugin-json';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import type {
    ModuleFormat,
    OutputOptions,
    OutputPlugin,
    Plugin,
    RollupOptions,
} from 'rollup';
import type { minify } from 'rollup-plugin-esbuild';
import type { ExternalsOptions } from 'rollup-plugin-node-externals';
import type { Except } from 'type-fest';

export type MinifyOptions = Parameters<typeof minify>[0];
export type NonNullableBuilderOutputOptions = NonNullable<Required<BuilderOptions['output']>>;
export type PartialModuleFormatWithDefaultDict<T> = Partial<Record<'default' | ModuleFormat, T>>;

export interface BuilderOptions {
    configFilePath?: string;
    inputs: string[];
    output: {
        clean?: boolean | Set<ModuleFormat>;
        dirs?: PartialModuleFormatWithDefaultDict<string>;
        exts?: PartialModuleFormatWithDefaultDict<string>;
        files?: PartialModuleFormatWithDefaultDict<string>;
        forceClean?: boolean | Set<ModuleFormat>;
        formats: Set<ModuleFormat>;
        minify?: boolean | Set<ModuleFormat>;
        preserveModules?: boolean | Set<ModuleFormat>;
        preserveModulesRoots?: PartialModuleFormatWithDefaultDict<string>;
        sourcemaps?: PartialModuleFormatWithDefaultDict<'hidden' | 'inline' | boolean>;
    };
}

export interface Config {
    /**
     * Additional input plugins.
     */
    additionalInputPlugins?: {
        /**
         * Plugins to insert after the built-in plugins.
         */
        afterBuiltIns?: Plugin[];

        /**
         * Plugins to insert before the built-in plugins.
         */
        beforeBuiltIns?: Plugin[];
    };

    /**
     * You can specify additional output plugins. The logic for handling these plugins is as follows:
     *
     * - If a corresponding value for a format is set, only the specified value will be used for that format.
     * Other formats that are not set will use the default value.
     *
     * For example, when outputting CJS and ESM formats, if `default.afterBuiltIns` and `esm.afterBuiltIns` are set,
     * ESM will use only `esm.afterBuiltIns`, while CJS will use `default.afterBuiltIns`.
     */
    additionalOutputPlugins?: PartialModuleFormatWithDefaultDict<{
        /**
         * Plugins to insert after the built-in plugins.
         */
        afterBuiltIns?: OutputPlugin[];

        /**
         * Plugins to insert before the built-in plugins.
         */
        beforeBuiltIns?: OutputPlugin[];
    }>;

    /**
     * Whether to enable built-in input plugins.
     */
    enableBuiltInInputPlugins?: {
        /**
         * @default true
         */
        commonjs?: boolean;

        /**
         * @default true
         */
        json?: boolean;

        /**
         * @default true
         */
        nodeExternal?: boolean;

        /**
         * @default true
         */
        nodeResolve?: boolean;

        /**
         * @default true
         */
        typescript?: boolean;
    };

    /**
     * Options for built-in input plugins.
     */
    builtInInputPluginOptions?: {
        commonjs?: RollupCommonJSOptions;
        json?: RollupJsonOptions;
        nodeExternal?: ExternalsOptions;
        nodeResolve?: RollupNodeResolveOptions;
        typescript?: RollupTypescriptOptions;
    };

    /**
     * Options for built-in output plugins.
     *
     * The same handling logic applies to `additionalOutputPlugins`.
     */
    builtInOutputPluginOptions?: { minify?: PartialModuleFormatWithDefaultDict<MinifyOptions> };

    /**
     * Output options for different formats.
     *
     * The same handling logic applies to `additionalOutputPlugins`.
     */
    outputOptions?: PartialModuleFormatWithDefaultDict<ConfigOutputOptions>;
    rollupOptions?: Except<RollupOptions, 'input' | 'output' | 'plugins'>;
}

export interface ConfigOutputOptions {
    /**
     * Rollup's output options. The options will be processed based on the value of `processMethod` before the build.
     */
    options: Except<OutputOptions, 'format'>;

    /**
     * Methods for handling options:
     *
     * - assign: Use Object.assign to combine custom options with the CLI-parsed and processed options.
     * - lodash-merge (default): Use lodash's merge to combine custom options with the CLI-parsed and processed options.
     * - replace: Completely replace CLI and default options with custom options.
     */
    processMethod?: 'assign' | 'lodash-merge' | 'replace';
}
