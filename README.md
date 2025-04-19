# ts-project-builder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
<!-- [![codecov][codecov-src]][codecov-href] -->
[![License][license-src]][license-href]

Rollup-based TypeScript builder with multi-format output and built-in common plugins.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- 🛠️ Primarily operated through the CLI with various configurable flags and parameters
- 📦 Supports multiple output formats, including CommonJS, ESM, UMD, and more
- 🔧 Built-in support for TypeScript, JSON, and CommonJS modules
- 🧹 Automatically cleans output directories
- 💨 Minification support with esbuild
- 📂 Preserves module structure if required
- 🚀 Easy configuration through a config file
- 📜 Customizable Rollup plugins for input and output
- 🔄 Merges or replaces configurations for flexible build setups

## Requirements

- **Node.js** `>= 18.12.1`

## Installation

Using [pnpm](https://pnpm.io):

```bash
pnpm add -D ts-project-builder
```

You can also use `yarn`, `npm`, or `bun`.

## Usage

Use the `-h` flag to view usage and all available options:

```bash
ts-project-builder -h       # from package.json script
npx ts-project-builder -h   # directly from terminal
```

### Basic Usage

Run the builder with a single entry file:

```bash
ts-project-builder ./src/index.ts
```

By default, it outputs both CommonJS (`.cjs`) and ESM (`.mjs`) formats to the `./dist` directory.

### Multiple Inputs and Format Control

You can pass multiple inputs and specify desired output formats:

```bash
# Output as amd, cjs, and esm
ts-project-builder ./src/cli.ts ./src/index.ts -f amd,cjs,esm

# Use glob patterns (wrap in quotes!)
ts-project-builder './src/**/*.ts' -f cjs
```

> [!IMPORTANT]
> Input files must be listed **before** any flags to ensure correct parsing.

### Format Extensions

Each format will generate files with the following extensions:

| Format   | Extension |
| -------- | --------- |
| amd      | amd.js    |
| cjs      | cjs       |
| commonjs | cjs       |
| es       | mjs       |
| esm      | mjs       |
| iife     | iife.js   |
| module   | mjs       |
| system   | system.js |
| systemjs | system.js |
| umd      | umd.js    |

### Built-in Rollup Plugins

This builder uses the following Rollup input plugins (in order):

- [rollup-plugin-node-externals](https://github.com/Septh/rollup-plugin-node-externals)
- [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
- [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)
- [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)
- [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript)

For more options and advanced configuration, see the [CLI Flags](#cli-flags) section.

## CLI Flags

### `--clean`

Cleans the output directory or files **right before writing output files**.

- If used without a value, **all formats** will be cleaned.
- If specific formats are provided, only output files for the specified formats will be cleaned.
- If the build fails, nothing will be cleaned.
- Files or folders to be cleaned are determined by their output paths.

  👉 If multiple formats (e.g. CJS and ESM) share the same output directory (like `./dist`), using `--clean cjs` will still clean the **entire directory**.

```bash
# Clean all formats before output
ts-project-builder ./src/index.ts --clean

# Clean only CJS format before output
ts-project-builder ./src/index.ts --clean cjs
```

> [!IMPORTANT]
> An error will be thrown if the path to be cleaned is outside the current working directory.
>
> To bypass this check, use [`--force-clean`](#--force-clean).

### `-c`, `--config`

Specifies the path to the config file.

Only `.mjs` files are supported — the file must be an **ES module**, as it is loaded using `await import`.

**Default**: `./ts-project-builder.config.mjs`

### `--force-clean`

Forcibly cleans the target directory or files **before output**, even if they are outside the current working directory.

- Must be used **together with** the [`--clean`](#--clean) flag.
- Uses the same syntax and format as [`--clean`](#--clean).

> [!CAUTION]
>
> Use this flag with caution — it can delete files outside your project folder.

### `-f`, `--formats`

Specifies the output formats.

Multiple formats can be provided, separated by commas. Duplicate entries will be ignored.

**Default**: `cjs,esm`

### `-m`, `--minify`

Minifies the output using the `minify` option from [`rollup-plugin-esbuild`](https://github.com/egoist/rollup-plugin-esbuild).

- Uses the same configuration syntax as [`--clean`](#--clean).

### `--out-dirs`

Specifies the output directory path(s).

See [Rollup's `output.dir` documentation](https://rollupjs.org/configuration-options/#output-dir) for more details.

**Default**: `./dist`

You can define separate output directories for different formats using `<format>=<path>`, separated by commas.

- If only a path is provided (e.g. `./dist`), it will be used for **all formats**.
- If format-specific paths are provided, those formats will output to the corresponding directories.

```bash
# All formats output to ./dist
ts-project-builder ./src/index.ts --out-dirs ./dist

# CJS outputs to ./cjs, all others use default ./dist
ts-project-builder ./src/index.ts --out-dirs cjs=./cjs

# ESM outputs to ./dist, all others to ./output
ts-project-builder ./src/index.ts --out-dirs ./output,esm=./dist
```

### `--out-exts`

Specifies the output file extensions for each format.

- If not set, or if a specific format is not listed, the default extension from the [format table](#format-extensions) will be used.
- The priority order is **explicit per-format value > common extension value > default table value**.
- The syntax is the same as [`--out-dirs`](#--out-dirs), using `<format>=<ext>` and separating multiple values with commas.

```bash
# CJS uses `.cjs`, others use `.js`
ts-project-builder ./src/index.ts --out-exts cjs=cjs,js

# ESM uses `.js`, others use default extensions from the format table
ts-project-builder ./src/index.ts --out-exts esm=js
```

### `--out-files`

Specifies exact output file paths.

See the [Rollup documentation](https://rollupjs.org/configuration-options/#output-file) for more details.

- If this flag is set, it will override the [`--out-dirs`](#--out-dirs) flag.
- The format and syntax are the same as [`--out-dirs`](#--out-dirs), using `<format>=<path>`.

```bash
# CJS outputs to ./cjs.cjs, all other formats use ./dist
ts-project-builder ./src/index.ts --out-files cjs=./cjs.cjs

# - CJS outputs to ./cjs/index.cjs (from --out-files)
# - ESM outputs to ./esm (from --out-dirs)
# - All others output to ./dist (default)
ts-project-builder ./src/index.ts --out-dirs cjs=./cjs-dist,esm=./esm --out-files cjs=./cjs/index.cjs
```

### `--preserve-modules`

Preserves the module structure in the output (i.e., does not bundle into a single file).

See [Rollup documentation](https://rollupjs.org/configuration-options/#output-preservemodules) for details.

- Uses the same configuration syntax as [`--clean`](#--clean).

### `--preserve-modules-roots`

Specifies the root directory for preserved modules.

See [Rollup documentation](https://rollupjs.org/configuration-options/#output-preservemodulesroot) for details.

- **Default**: `./src`
- Uses the same configuration syntax as [`--out-dirs`](#--out-dirs).

### `--sourcemaps`

Enables or configures sourcemap output.

See the [Rollup documentation](https://rollupjs.org/configuration-options/#output-sourcemap) for more details.

- Supports values: `true`, `false`, `inline`, and `hidden`.
- Uses the same configuration syntax as [`--out-dirs`](#--out-dirs).
- If no format is specified, the setting applies to **all formats**.

```bash
# All formats use the 'true' setting (sourcemaps enabled)
ts-project-builder ./src/index.ts --sourcemaps

# ESM format uses 'inline', all others use 'false' (sourcemaps disabled)
ts-project-builder ./src/index.ts --sourcemaps false,esm=inline

# Only disable sourcemaps for the ESM format
ts-project-builder ./src/index.ts --sourcemaps esm=false
```

## Config File

If you need to customize plugin behavior, modify per-format output, or access advanced options, you can use a configuration file.

By default, the builder looks for `./ts-project-builder.config.mjs`.

You can override this using the [`-c`](#-c---config) flag.

### Example

Create a config file and start with the following template:

```js
import { defineConfig } from 'ts-project-builder';

export default defineConfig({});
```

For full type definitions and configuration options, refer to the `Config` interface in [./src/types.ts](./src/types.ts).

## Direct Import Usage

You can also use `ts-project-builder` as a library by directly importing the `Builder` class.

Create a builder instance and call the `build()` method:

```typescript
import { Builder } from 'ts-project-builder';

const builder = new Builder({
    inputs: ['./src/index.ts'],
    output: {
        formats: new Set([
            'cjs',
            'esm'
        ]),
    },
});

await builder.build();
```

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-href]: https://npmjs.com/package/ts-project-builder
[npm-version-src]: https://img.shields.io/npm/v/ts-project-builder/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/ts-project-builder
[npm-downloads-src]: https://img.shields.io/npm/dm/ts-project-builder.svg?style=flat&colorA=18181B&colorB=28CF8D

<!-- [codecov-href]: https://codecov.io/gh/kiki-kanri/ts-project-builder
[codecov-src]: https://codecov.io/gh/kiki-kanri/ts-project-builder/graph/badge.svg?token=RNU7FNG8HD -->

[license-href]: https://github.com/kiki-kanri/ts-project-builder/blob/main/LICENSE
[license-src]: https://img.shields.io/npm/l/ts-project-builder.svg?style=flat&colorA=18181B&colorB=28CF8D
