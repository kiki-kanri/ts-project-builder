# ts-project-builder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A powerful TypeScript project builder supporting multiple output formats, automatic cleaning, and customizable plugins.

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

## Environment Requirements

- Node.js version 18.12 or higher

## Installation

Add dependency (example using pnpm).

```bash
pnpm add -D ts-project-builder
```

You can also use yarn, npm, or bun to add the dependency.

That's it! You're ready to use this package for your project. Check out the [usage instructions](#usage) below ✨.

## Usage

Here is the most basic usage, using `./src/index.ts` as the entry point:

```bash
ts-project-builder ./src/index.ts # package.json script
npx ts-project-builder ./src/index.ts # terminal
```

By default, it will generate files in both CJS and ESM formats. The output directory is `./dist`, with file extensions `cjs` and `mjs` respectively.

You can also specify multiple inputs simultaneously and designate the output formats:

```bash
# amd, cjs, esm
ts-project-builder ./src/cli.ts ./src/index.ts -f amd,cjs,esm

# cjs
ts-project-builder "./src/**/*.ts" -f cjs
```

> [!IMPORTANT]
> Ensure that input parameters are specified before any other flags to avoid incorrect parsing.

By default, different formats will generate files with different extensions, as shown in the table below:

| Format   | Extension |
| -------- | --------- |
| amd      | amd.js    |
| cjs      | cjs       |
| commonjs | cjs       |
| es       | mjs       |
| esm      | mjs       |
| iife     | life.js   |
| module   | mjs       |
| system   | system.js |
| systemjs | system.js |
| umd      | umd.js    |

This builder includes the following Rollup input plugins (listed in execution order):

- [rollup-plugin-node-externals](https://github.com/Septh/rollup-plugin-node-externals)
- [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
- [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)
- [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)
- [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript)

For more flags and usage details, please refer to [flags](#flags).

## Flags

### --clean

Clean the target directory or files before output.

If the flag is used without any value, all formats will be enabled. If specific formats are provided, only the specified formats will be enabled.

```bash
# All formats will clean the target directory or files before output
ts-project-builder ./src/index.ts --clean

# Only the CJS format will clean the target directory or files before output
ts-project-builder ./src/index.ts --clean cjs
```

> [!IMPORTANT]
> An error will be thrown if the path to be cleaned is not under the directory where the builder is running. To force cleaning, please use [this flag](#--force-clean).

### -c, --config

The path to the config file. Only `.mjs` files are accepted.

**Default**: `./ts-project-builder.config.mjs`

### --dirs

The output directory paths. Refer to the [Rollup documentation](https://rollupjs.org/configuration-options/#output-dir) for more details.

**Default**: `./dist`

You can specify different output paths for different formats, separated by commas and designated using the `<format>=[path]` method. If there is no `<format>=` and only a path is provided, that path will be used as the common value for all formats.

```bash
# All formats are output to ./dist
ts-project-builder ./src/index.ts --dirs ./dist

# CJS output to ./cjs, others output to ./dist
ts-project-builder ./src/index.ts --dirs cjs=./cjs

# ESM output to ./dist, others output to ./output
ts-project-builder ./src/index.ts --dirs ./output,esm=./dist
```

### --exts

The output file extensions.

If not set, or if the corresponding format is not specified, the default file extension from the table above will be used.

The priority is: specified value > specified common value > table value.

The configuration method is the same as for the [`--dirs`](#--dirs) flag.

```bash
# CJS uses cjs, others use js
ts-project-builder ./src/index.ts --exts cjs=cjs,js

# ESM uses js, others use the corresponding values from the table
ts-project-builder ./src/index.ts --exts esm=js
```

### --files

The output file paths. Refer to the [Rollup documentation](https://rollupjs.org/configuration-options/#output-file) for more details.

If this flag is set, it will override the [`--dirs`](#--dirs) flag.

The configuration method is the same as for the [`--dirs`](#--dirs) flag.

```bash
# CJS output to ./cjs.cjs, others output to the ./dist directory
ts-project-builder ./src/index.ts --files cjs=./cjs.cjs

# CJS output to ./cjs/index.cjs, ESM output to the ./esm directory, others output to the ./dist directory
ts-project-builder ./src/index.ts --dirs cjs=./cjs-dist,esm=./esm --files cjs=./cjs/index.cjs
```

### --force-clean

Force clean the target directory or files before output. Must be used together with the [`--clean`](#--clean) flag.

The configuration method is the same as for the [`--clean`](#--clean) flag.

> [!CAUTION]
> Use this flag with caution.

### -f, --formats

The output formats. Can accept multiple formats, but duplicates will only be considered once.

**Default**: `cjs,esm`

### -m, --minify

Minify the code using the `minify` feature provided by [`rollup-plugin-esbuild`](https://github.com/egoist/rollup-plugin-esbuild) before the final output.

The configuration method is the same as for the [`--clean`](#--clean) flag.

### --preserve-modules

Refer to the [Rollup documentation](https://rollupjs.org/configuration-options/#output-preservemodules) for more details.

The configuration method is the same as for the [`--clean`](#--clean) flag.

### --preserve-modules-roots

Refer to the [Rollup documentation](https://rollupjs.org/configuration-options/#output-preservemodulesroot) for more details.

**Default**: `./src`

The configuration method is the same as for the [`--dirs`](#--dirs) flag.

## Config File

If you need to pass options to built-in plugins, modify the output of specific formats, or use other options, you can use a config file.

By default, the build process will attempt to read the `./ts-project-builder.config.mjs` file. You can use the [`-c`](#-c---config) flag to specify the config file path.

After creating the file, fill in the following code:

```javascript
import { defineConfig } from 'ts-project-builder';

export default defineConfig({});
```

For detailed config instructions, please refer to the `Config` interface in [this file](./src/types.ts).

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/ts-project-builder/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/ts-project-builder

[npm-downloads-src]: https://img.shields.io/npm/dm/ts-project-builder.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/ts-project-builder

[license-src]: https://img.shields.io/npm/l/ts-project-builder.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/kiki-kanri/ts-project-builder/blob/main/LICENSE
