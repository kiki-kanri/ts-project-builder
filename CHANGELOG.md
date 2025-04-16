# Changelog

## v5.0.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v4.0.1...v5.0.0)

### 🚀 Enhancements

- Add `enableBuiltInInputPlugins` option to toggle built-in plugin activation ([b9b2fc9](https://github.com/kiki-kanri/ts-project-builder/commit/b9b2fc9))

### 🩹 Fixes

- Avoid applying glob to non-glob input paths to properly detect invalid paths ([f89c470](https://github.com/kiki-kanri/ts-project-builder/commit/f89c470))

### 💅 Refactors

- Replace `Object.freeze` with readonly type definitions for constants and variables ([5ac0627](https://github.com/kiki-kanri/ts-project-builder/commit/5ac0627))
- Extract `rollupInputPlugins` creation to a separate method ([06861fd](https://github.com/kiki-kanri/ts-project-builder/commit/06861fd))
- Remove explicit return types from some functions ([ed5761b](https://github.com/kiki-kanri/ts-project-builder/commit/ed5761b))
- ⚠️ Rename CLI flags ([dde1bfd](https://github.com/kiki-kanri/ts-project-builder/commit/dde1bfd))

### 📖 Documentation

- Update CHANGELOG ([783ad48](https://github.com/kiki-kanri/ts-project-builder/commit/783ad48))
- Update README, package description and keywords ([199e37b](https://github.com/kiki-kanri/ts-project-builder/commit/199e37b))

### 🏡 Chore

- Upgrade dependencies ([bd6b2b0](https://github.com/kiki-kanri/ts-project-builder/commit/bd6b2b0))
- Remove unused code ([cb2803d](https://github.com/kiki-kanri/ts-project-builder/commit/cb2803d))
- Set "sideEffects" field in package.json ([4c50b07](https://github.com/kiki-kanri/ts-project-builder/commit/4c50b07))
- Update `bin` field configuration in package.json ([0fe36e4](https://github.com/kiki-kanri/ts-project-builder/commit/0fe36e4))
- Format code ([5734074](https://github.com/kiki-kanri/ts-project-builder/commit/5734074))
- Upgrade dependencies ([5d5e123](https://github.com/kiki-kanri/ts-project-builder/commit/5d5e123))

#### ⚠️ Breaking Changes

- ⚠️ Rename CLI flags ([dde1bfd](https://github.com/kiki-kanri/ts-project-builder/commit/dde1bfd))

### ❤️ Contributors

- kiki-kanri

## v4.0.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v4.0.0...v4.0.1)

### 🏡 Chore

- Remove `resolveJsonModule` from `tsconfig.json` ([38080dd](https://github.com/kiki-kanri/ts-project-builder/commit/38080dd))

### ❤️ Contributors

- kiki-kanri

## v4.0.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.4.4...v4.0.0)

### 💅 Refactors

- ⚠️ Remove all default export ([8f3de1a](https://github.com/kiki-kanri/ts-project-builder/commit/8f3de1a))

#### ⚠️ Breaking Changes

- ⚠️ Remove all default export ([8f3de1a](https://github.com/kiki-kanri/ts-project-builder/commit/8f3de1a))

### ❤️ Contributors

- kiki-kanri

## v3.4.4

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.4.3...v3.4.4)

### 💅 Refactors

- Replace `globSync` with native node:fs functionality ([1e56a53](https://github.com/kiki-kanri/ts-project-builder/commit/1e56a53))
- Update import style for some modules ([5789fba](https://github.com/kiki-kanri/ts-project-builder/commit/5789fba))

### 🏡 Chore

- Upgrade dependencies ([fddcb35](https://github.com/kiki-kanri/ts-project-builder/commit/fddcb35))
- Format and lint code ([d81d425](https://github.com/kiki-kanri/ts-project-builder/commit/d81d425))
- Upgrade dependencies ([4935add](https://github.com/kiki-kanri/ts-project-builder/commit/4935add))

### ❤️ Contributors

- kiki-kanri

## v3.4.3

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.4.2...v3.4.3)

### 🩹 Fixes

- Resolve incorrect remaining file count in truncated display for many input files ([feeedfb](https://github.com/kiki-kanri/ts-project-builder/commit/feeedfb))

### ❤️ Contributors

- kiki-kanri

## v3.4.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.4.1...v3.4.2)

### 💅 Refactors

- Simplify `pathIsFile` definition ([6aef489](https://github.com/kiki-kanri/ts-project-builder/commit/6aef489))

### 🏡 Chore

- Upgrade dependencies ([79701ad](https://github.com/kiki-kanri/ts-project-builder/commit/79701ad))
- Set `hideAuthorEmail` arg in changelogen command ([169cce4](https://github.com/kiki-kanri/ts-project-builder/commit/169cce4))
- Upgrade dependencies ([6e2aeb3](https://github.com/kiki-kanri/ts-project-builder/commit/6e2aeb3))
- Format and lint codes ([b586ace](https://github.com/kiki-kanri/ts-project-builder/commit/b586ace))
- Upgrade dependencies ([5dbb5f8](https://github.com/kiki-kanri/ts-project-builder/commit/5dbb5f8))
- Truncate file list display when logging too many files ([b13b646](https://github.com/kiki-kanri/ts-project-builder/commit/b13b646))

### ❤️ Contributors

- kiki-kanri

## v3.4.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.4.0...v3.4.1)

### 💅 Refactors

- Replace `string[0] ===` with `string.startsWith` ([8d9e4be](https://github.com/kiki-kanri/ts-project-builder/commit/8d9e4be))
- Rename `parseCLIArgString` to `parseCliArgString` ([81b8751](https://github.com/kiki-kanri/ts-project-builder/commit/81b8751))

### 🏡 Chore

- Upgrade dependencies and add `pnpm.onlyBuiltDependencies` setting to package.json ([b9d1130](https://github.com/kiki-kanri/ts-project-builder/commit/b9d1130))

### ❤️ Contributors

- kiki-kanri

## v3.4.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.3.4...v3.4.0)

### 🚀 Enhancements

- Add CLI option to enable sourcemap output ([2adbd2d](https://github.com/kiki-kanri/ts-project-builder/commit/2adbd2d))

### 🩹 Fixes

- Remove unnecessary ? operator and fix type errors ([e94f38d](https://github.com/kiki-kanri/ts-project-builder/commit/e94f38d))

### 📦 Build

- Enable sourcemap output in build process ([a772adb](https://github.com/kiki-kanri/ts-project-builder/commit/a772adb))

### 🏡 Chore

- Upgrade dependencies ([bde0392](https://github.com/kiki-kanri/ts-project-builder/commit/bde0392))
- Include src folder in the package published to npm ([2469c2d](https://github.com/kiki-kanri/ts-project-builder/commit/2469c2d))

### ❤️ Contributors

- kiki-kanri

## v3.3.4

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.3.3...v3.3.4)

### 💅 Refactors

- Remove process import statement ([b9f2b85](https://github.com/kiki-kanri/ts-project-builder/commit/b9f2b85))

### 🏡 Chore

- Upgrade dependencies ([c59f586](https://github.com/kiki-kanri/ts-project-builder/commit/c59f586))
- Upgrade dependencies ([32edc17](https://github.com/kiki-kanri/ts-project-builder/commit/32edc17))

### 🎨 Styles

- Format and lint all files ([23dcb00](https://github.com/kiki-kanri/ts-project-builder/commit/23dcb00))

### ❤️ Contributors

- kiki-kanri

## v3.3.3

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.3.2...v3.3.3)

### 💅 Refactors

- Change for const to forEach inside `parseCLIArgString` ([bd05ab4](https://github.com/kiki-kanri/ts-project-builder/commit/bd05ab4))

### 🏡 Chore

- Update eslint-config and format codes ([126b8fd](https://github.com/kiki-kanri/ts-project-builder/commit/126b8fd))
- Modify `eslint-disable-next-line` comment style ([4ec782b](https://github.com/kiki-kanri/ts-project-builder/commit/4ec782b))
- Upgrade dependencies ([b141e28](https://github.com/kiki-kanri/ts-project-builder/commit/b141e28))
- Upgrade dependencies ([0c5aac8](https://github.com/kiki-kanri/ts-project-builder/commit/0c5aac8))

### 🎨 Styles

- Change all indentation to 4 spaces ([361e163](https://github.com/kiki-kanri/ts-project-builder/commit/361e163))
- Format and lint files ([2280c72](https://github.com/kiki-kanri/ts-project-builder/commit/2280c72))

### ❤️ Contributors

- kiki-kanri

## v3.3.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.3.1...v3.3.2)

### 💅 Refactors

- Replace `Omit` type with type-fest's `Except` type ([a3c1ffb](https://github.com/kiki-kanri/ts-project-builder/commit/a3c1ffb))
- Change `outputOptions` type in `builder.build` method to use `SetFieldType` definition ([8021fd4](https://github.com/kiki-kanri/ts-project-builder/commit/8021fd4))

### 🏡 Chore

- Upgrade dependencies ([5a64c5c](https://github.com/kiki-kanri/ts-project-builder/commit/5a64c5c))
- Replace Prettier with ESLint, add related files, and update VSCode settings ([c2c279f](https://github.com/kiki-kanri/ts-project-builder/commit/c2c279f))
- Modify scripts in package.json ([9b0b9e4](https://github.com/kiki-kanri/ts-project-builder/commit/9b0b9e4))

### 🎨 Styles

- Format and lint all files ([899caf4](https://github.com/kiki-kanri/ts-project-builder/commit/899caf4))

### ❤️ Contributors

- kiki-kanri

## v3.3.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.3.0...v3.3.1)

### 📖 Documentation

- Update README ([ce5f146](https://github.com/kiki-kanri/ts-project-builder/commit/ce5f146))

### 🏡 Chore

- Update minimum Node.js version ([e5451e6](https://github.com/kiki-kanri/ts-project-builder/commit/e5451e6))
- Modify release script in package.json ([bacd2a8](https://github.com/kiki-kanri/ts-project-builder/commit/bacd2a8))
- Upgrade dependencies ([1d8dfbd](https://github.com/kiki-kanri/ts-project-builder/commit/1d8dfbd))
- Change from tsx to jiti ([3ba4113](https://github.com/kiki-kanri/ts-project-builder/commit/3ba4113))

### ❤️ Contributors

- kiki-kanri

## v3.3.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.2.4...v3.3.0)

### 🚀 Enhancements

- Export all types from entry point ([65b830d](https://github.com/kiki-kanri/ts-project-builder/commit/65b830d))

### 🏡 Chore

- Move tslib to devDependencies ([93ff7d6](https://github.com/kiki-kanri/ts-project-builder/commit/93ff7d6))
- Upgrade dependencies and modify release script ([a5a12bd](https://github.com/kiki-kanri/ts-project-builder/commit/a5a12bd))

### ❤️ Contributors

- kiki-kanri

## v3.2.4

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.2.3...v3.2.4)

### 🏡 Chore

- Replace lodash package with lodash-es ([a907582](https://github.com/kiki-kanri/ts-project-builder/commit/a907582))
- Disable CJS build output ([f47047e](https://github.com/kiki-kanri/ts-project-builder/commit/f47047e))
- Add missing types field in package.json ([b295591](https://github.com/kiki-kanri/ts-project-builder/commit/b295591))

### ❤️ Contributors

- kiki-kanri

## v3.2.3

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.2.2...v3.2.3)

### 🏡 Chore

- Modify release script ([db8e42b](https://github.com/kiki-kanri/ts-project-builder/commit/db8e42b))
- Move tslib to dependencies ([60f3dc1](https://github.com/kiki-kanri/ts-project-builder/commit/60f3dc1))

### ❤️ Contributors

- kiki-kanri

## v3.2.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.2.1...v3.2.2)

### 🏡 Chore

- Replace lodash-es with lodash ([e6d7119](https://github.com/kiki-kanri/ts-project-builder/commit/e6d7119))
- Remove main, module, and types fields from package.json and add exports configuration ([c67d788](https://github.com/kiki-kanri/ts-project-builder/commit/c67d788))

### ❤️ Contributors

- kiki-kanri

## v3.2.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.2.0...v3.2.1)

### 🩹 Fixes

- Update all imports in types files to use import type ([a5d7857](https://github.com/kiki-kanri/ts-project-builder/commit/a5d7857))
- Resolve missing `#!/usr/bin/env node` at the start of cli.cjs ([e672e52](https://github.com/kiki-kanri/ts-project-builder/commit/e672e52))

### 💅 Refactors

- Improve readability of parts of the code ([3b184e5](https://github.com/kiki-kanri/ts-project-builder/commit/3b184e5))

### 🏡 Chore

- Modify release script ([98171e6](https://github.com/kiki-kanri/ts-project-builder/commit/98171e6))

### ❤️ Contributors

- kiki-kanri

## v3.2.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.1.2...v3.2.0)

### 🚀 Enhancements

- Export all types ([074b7ab](https://github.com/kiki-kanri/ts-project-builder/commit/074b7ab))
- Modify build process and output files ([0ed1ec0](https://github.com/kiki-kanri/ts-project-builder/commit/0ed1ec0))
- Add release script to package.json ([b0665d1](https://github.com/kiki-kanri/ts-project-builder/commit/b0665d1))

### 💅 Refactors

- Rename `parseCliArgString` to `parseCLIArgString` ([b6a0136](https://github.com/kiki-kanri/ts-project-builder/commit/b6a0136))

### 🏡 Chore

- Upgrade dependencies ([019449c](https://github.com/kiki-kanri/ts-project-builder/commit/019449c))
- Switch changelog generation package ([6b30966](https://github.com/kiki-kanri/ts-project-builder/commit/6b30966))

### ❤️ Contributors

- kiki-kanri

## v3.1.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.1.1...v3.1.2)

### 🩹 Fixes

- Resolve IIFE format corresponding extension error ([3447401](https://github.com/kiki-kanri/ts-project-builder/commit/3447401))

### 🏡 Chore

- Upgrade dependencies ([8d6c258](https://github.com/kiki-kanri/ts-project-builder/commit/8d6c258))

### ❤️ Contributors

- kiki-kanri

## v3.1.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.1.0...v3.1.1)

### 🩹 Fixes

- Add missing main field in package.json ([78e373c](https://github.com/kiki-kanri/ts-project-builder/commit/78e373c))

### ❤️ Contributors

- kiki-kanri

## v3.1.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.0.1...v3.1.0)

### 🚀 Enhancements

- Add `Builder` class and related constants export to entry point ([23bc390](https://github.com/kiki-kanri/ts-project-builder/commit/23bc390))

### 💅 Refactors

- Freeze `outputFormatToExtMap` constant ([f565ba9](https://github.com/kiki-kanri/ts-project-builder/commit/f565ba9))

### 🏡 Chore

- Upgrade dependencies ([0e4ce46](https://github.com/kiki-kanri/ts-project-builder/commit/0e4ce46))

### ❤️ Contributors

- kiki-kanri

## v3.0.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.0.0...v3.0.1)

### 💅 Refactors

- Remove all try-catch blocks in builder and throw all errors ([f4ed061](https://github.com/kiki-kanri/ts-project-builder/commit/f4ed061))
- Use try-catch when instantiating Builder class and calling build method after cli parses parameters ([ed48ee4](https://github.com/kiki-kanri/ts-project-builder/commit/ed48ee4))

### 📖 Documentation

- Update README ([34bab78](https://github.com/kiki-kanri/ts-project-builder/commit/34bab78))

### 🏡 Chore

- Make cli input parameter mandatory and update usage in help ([38c3f05](https://github.com/kiki-kanri/ts-project-builder/commit/38c3f05))
- Upgrade dependencies ([a874e92](https://github.com/kiki-kanri/ts-project-builder/commit/a874e92))

### ❤️ Contributors

- kiki-kanri

## v3.0.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.0.0-rc.1...v3.0.0)

### 💅 Refactors

- Clean up and optimize code ([23b324f](https://github.com/kiki-kanri/ts-project-builder/commit/23b324f))
- ⚠️ Rename builtin to builtIn ([d024abb](https://github.com/kiki-kanri/ts-project-builder/commit/d024abb))

### 📖 Documentation

- Update CHANGELOG, package.json, and README ([cc5a0b3](https://github.com/kiki-kanri/ts-project-builder/commit/cc5a0b3))
- Add comments and descriptions to properties in Config ([c019e6e](https://github.com/kiki-kanri/ts-project-builder/commit/c019e6e))
- Add descriptions to some flags in cli ([c0ed863](https://github.com/kiki-kanri/ts-project-builder/commit/c0ed863))

#### ⚠️ Breaking Changes

- ⚠️ Rename builtin to builtIn ([d024abb](https://github.com/kiki-kanri/ts-project-builder/commit/d024abb))

### ❤️ Contributors

- kiki-kanri

## v3.0.0-rc.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v3.0.0-rc.0...v3.0.0-rc.1)

### 🚀 Enhancements

- Add functionality to specify rollup output.file option ([7ef69e7](https://github.com/kiki-kanri/ts-project-builder/commit/7ef69e7))
- Add functionality to clean output directory or files before build ([32f3945](https://github.com/kiki-kanri/ts-project-builder/commit/32f3945))

### 🩹 Fixes

- Specify entry point in package.json ([9043e71](https://github.com/kiki-kanri/ts-project-builder/commit/9043e71))

### 💅 Refactors

- ⚠️ Remove aliases for dirs and exts cli args ([a937fe4](https://github.com/kiki-kanri/ts-project-builder/commit/a937fe4))

#### ⚠️ Breaking Changes

- ⚠️ Remove aliases for dirs and exts cli args ([a937fe4](https://github.com/kiki-kanri/ts-project-builder/commit/a937fe4))

### ❤️ Contributors

- kiki-kanri

## v3.0.0-rc.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v2.0.5...v3.0.0-rc.0)

### 🚀 Enhancements

- Add files for rollup cli logger functionality ([80d909b](https://github.com/kiki-kanri/ts-project-builder/commit/80d909b))
- Add utils file ([7c21159](https://github.com/kiki-kanri/ts-project-builder/commit/7c21159))
- Complete initial implementation of main functionality ([c7edfa7](https://github.com/kiki-kanri/ts-project-builder/commit/c7edfa7))
- Add functionality to modify options using config file ([12f2f39](https://github.com/kiki-kanri/ts-project-builder/commit/12f2f39))

### 🏡 Chore

- Rename script file ([97dc82f](https://github.com/kiki-kanri/ts-project-builder/commit/97dc82f))
- Update .gitignore ([4095a64](https://github.com/kiki-kanri/ts-project-builder/commit/4095a64))
- Remove all code and non-development dependencies and files ([65e806c](https://github.com/kiki-kanri/ts-project-builder/commit/65e806c))
- Add required dependencies ([912b7f5](https://github.com/kiki-kanri/ts-project-builder/commit/912b7f5))
- Update tsconfig ([b4f05f5](https://github.com/kiki-kanri/ts-project-builder/commit/b4f05f5))
- Insert required string at the beginning of cli.mjs file ([90a7388](https://github.com/kiki-kanri/ts-project-builder/commit/90a7388))
- Update package.json ([89c5afe](https://github.com/kiki-kanri/ts-project-builder/commit/89c5afe))

### ❤️ Contributors

- kiki-kanri

## v2.0.5

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v2.0.4...v2.0.5)

### 🏡 Chore

- Update author field in package.json ([5ebe4fd](https://github.com/kiki-kanri/ts-project-builder/commit/5ebe4fd))
- Upgrade dependencies ([f91d755](https://github.com/kiki-kanri/ts-project-builder/commit/f91d755))

### ❤️ Contributors

- kiki-kanri

## v2.0.4

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v2.0.3...v2.0.4)

### 🩹 Fixes

- Correct loading of extraOptions config on Windows ([43dca62](https://github.com/kiki-kanri/ts-project-builder/commit/43dca62))

### 🏡 Chore

- Upgrade dependencies ([03c9138](https://github.com/kiki-kanri/ts-project-builder/commit/03c9138))

### 🎨 Styles

- Reorder import statements ([5944f33](https://github.com/kiki-kanri/ts-project-builder/commit/5944f33))

### ❤️ Contributors

- kiki-kanri

## v2.0.3

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v2.0.2...v2.0.3)

### 🩹 Fixes

- Use npm pkg fix to fix package.json errors ([af847b4](https://github.com/kiki-kanri/ts-project-builder/commit/af847b4))

### 💅 Refactors

- Use 'import type' for type-only imports ([56905e3](https://github.com/kiki-kanri/ts-project-builder/commit/56905e3))

### 🏡 Chore

- Upgrade dependencies ([6d180ae](https://github.com/kiki-kanri/ts-project-builder/commit/6d180ae))
- Add author field in package.json ([4d32363](https://github.com/kiki-kanri/ts-project-builder/commit/4d32363))

### ❤️ Contributors

- kiki-kanri

## v2.0.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v2.0.1...v2.0.2)

### 🏡 Chore

- Upgrade dependencies ([be4eee9](https://github.com/kiki-kanri/ts-project-builder/commit/be4eee9))

### 🎨 Styles

- Format codes and package.json ([7a83ddb](https://github.com/kiki-kanri/ts-project-builder/commit/7a83ddb))

### ❤️ Contributors

- kiki-kanri

## v2.0.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v2.0.0...v2.0.1)

### 🏡 Chore

- Upgrade dependencies ([d101d96](https://github.com/kiki-kanri/ts-project-builder/commit/d101d96))
- Add prettier ([e468eaf](https://github.com/kiki-kanri/ts-project-builder/commit/e468eaf))

### 🎨 Styles

- Format codes ([acb7b7b](https://github.com/kiki-kanri/ts-project-builder/commit/acb7b7b))

### ❤️ Contributors

- kiki-kanri

## v2.0.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v1.1.1...v2.0.0)

### 📖 Documentation

- Edit readme ([7b8fa4b](https://github.com/kiki-kanri/ts-project-builder/commit/7b8fa4b))

### 🏡 Chore

- ⚠️ Upgrade rollup to v4 ([50cacfb](https://github.com/kiki-kanri/ts-project-builder/commit/50cacfb))
- Change tsconfig target to es2022 ([8fa4e12](https://github.com/kiki-kanri/ts-project-builder/commit/8fa4e12))

#### ⚠️ Breaking Changes

- ⚠️ Upgrade rollup to v4 ([50cacfb](https://github.com/kiki-kanri/ts-project-builder/commit/50cacfb))

### ❤️ Contributors

- kiki-kanri

## v1.1.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v1.1.0...v1.1.1)

### 📖 Documentation

- Edit builtin plugins list ([064eb2b](https://github.com/kiki-kanri/ts-project-builder/commit/064eb2b))

### 🏡 Chore

- Upgrade dependencies ([97f5f63](https://github.com/kiki-kanri/ts-project-builder/commit/97f5f63))
- Using tsx instead of @esbuild-kit/esm-loader ([50262bd](https://github.com/kiki-kanri/ts-project-builder/commit/50262bd))

### ❤️ Contributors

- kiki-kanri

## v1.1.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v1.0.3...v1.1.0)

### 🚀 Enhancements

- Add commonjs and resolve rollup plugins ([b185b37](https://github.com/kiki-kanri/ts-project-builder/commit/b185b37))

### ❤️ Contributors

- kiki-kanri

## v1.0.3

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v1.0.2...v1.0.3)

### 💅 Refactors

- Replace private keyword with # for class members ([9bb27c3](https://github.com/kiki-kanri/ts-project-builder/commit/9bb27c3))

### 🏡 Chore

- Upgrade dependencies ([21bfa4f](https://github.com/kiki-kanri/ts-project-builder/commit/21bfa4f))

### ❤️ Contributors

- kiki-kanri

## v1.0.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v1.0.1...v1.0.2)

### 🩹 Fixes

- Correct exit code for build error ([eb25390](https://github.com/kiki-kanri/ts-project-builder/commit/eb25390))

### 🏡 Chore

- Upgrade dependencies ([adc3bd4](https://github.com/kiki-kanri/ts-project-builder/commit/adc3bd4))

### ❤️ Contributors

- kiki-kanri

## v1.0.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v1.0.0...v1.0.1)

### 🏡 Chore

- Upgrade dependencies ([18094ae](https://github.com/kiki-kanri/ts-project-builder/commit/18094ae))

### ❤️ Contributors

- kiki-kanri

## v1.0.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.9.1...v1.0.0)

### 🩹 Fixes

- ⚠️ Change build type flag name to type ([6bfbc56](https://github.com/kiki-kanri/ts-project-builder/commit/6bfbc56))

### 📖 Documentation

- Edit readme ([5c5b3f1](https://github.com/kiki-kanri/ts-project-builder/commit/5c5b3f1))

### 🏡 Chore

- Remove empty gitmodules file ([f7e3b48](https://github.com/kiki-kanri/ts-project-builder/commit/f7e3b48))
- Upgrade dependencies ([35fae86](https://github.com/kiki-kanri/ts-project-builder/commit/35fae86))

#### ⚠️ Breaking Changes

- ⚠️ Change build type flag name to type ([6bfbc56](https://github.com/kiki-kanri/ts-project-builder/commit/6bfbc56))

### ❤️ Contributors

- kiki-kanri

## v0.9.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.9.0...v0.9.1)

### 🩹 Fixes

- Set package.json engines field value ([6b1d715](https://github.com/kiki-kanri/ts-project-builder/commit/6b1d715))

### ❤️ Contributors

- kiki-kanri

## v0.9.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.8.0...v0.9.0)

### 🚀 Enhancements

- Extra config can set rollup options ([1e72d92](https://github.com/kiki-kanri/ts-project-builder/commit/1e72d92))

### 🔥 Performance

- Simplified way to get extra config data ([c095454](https://github.com/kiki-kanri/ts-project-builder/commit/c095454))

### 📖 Documentation

- Edit readme ([59e6408](https://github.com/kiki-kanri/ts-project-builder/commit/59e6408))

### 🏡 Chore

- Upgrade dependencies ([57a4ddc](https://github.com/kiki-kanri/ts-project-builder/commit/57a4ddc))

### ❤️ Contributors

- kiki-kanri

## v0.8.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.7.0...v0.8.0)

### 🔥 Performance

- Remove unused code ([190f50f](https://github.com/kiki-kanri/ts-project-builder/commit/190f50f))

### 🩹 Fixes

- Edit error log to locating the wrong point ([2df7fb8](https://github.com/kiki-kanri/ts-project-builder/commit/2df7fb8))

### 💅 Refactors

- Edit origin rollup methods ([c4a914f](https://github.com/kiki-kanri/ts-project-builder/commit/c4a914f))
- Merge path files ([f244ce7](https://github.com/kiki-kanri/ts-project-builder/commit/f244ce7))

### 📖 Documentation

- Edit readme ([cad73ac](https://github.com/kiki-kanri/ts-project-builder/commit/cad73ac))

### ❤️ Contributors

- kiki-kanri

## v0.7.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.6.2...v0.7.0)

### 🚀 Enhancements

- Stop build when extra config build error ([e218ec8](https://github.com/kiki-kanri/ts-project-builder/commit/e218ec8))

### 🩹 Fixes

- Add interop to output options to fix some cjs error ([b89258c](https://github.com/kiki-kanri/ts-project-builder/commit/b89258c))

### 📖 Documentation

- Add extra options comments ([7cbdf63](https://github.com/kiki-kanri/ts-project-builder/commit/7cbdf63))

### ❤️ Contributors

- kiki-kanri

## v0.6.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.6.1...v0.6.2)

### 🩹 Fixes

- Fixed rollup method error not handle ([76a36ac](https://github.com/kiki-kanri/ts-project-builder/commit/76a36ac))
- Fixed log success message if an error occurred ([f80dea4](https://github.com/kiki-kanri/ts-project-builder/commit/f80dea4))

### ❤️ Contributors

- kiki-kanri

## v0.6.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.6.0...v0.6.1)

### 🚀 Enhancements

- Make build extra config all imports is external ([04b48f1](https://github.com/kiki-kanri/ts-project-builder/commit/04b48f1))

### 🩹 Fixes

- Fixed tmp config file import error ([587c9b2](https://github.com/kiki-kanri/ts-project-builder/commit/587c9b2))

### ❤️ Contributors

- kiki-kanri

## v0.6.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.5.0...v0.6.0)

### 🚀 Enhancements

- Add log and handle rollup error ([8711349](https://github.com/kiki-kanri/ts-project-builder/commit/8711349))
- Build time use pretty-ms to log ([c5baeca](https://github.com/kiki-kanri/ts-project-builder/commit/c5baeca))

### 💅 Refactors

- ⚠️ Migrate to esm ([260ebb3](https://github.com/kiki-kanri/ts-project-builder/commit/260ebb3))

### 🏡 Chore

- Upgrade dependencies ([55318c9](https://github.com/kiki-kanri/ts-project-builder/commit/55318c9))
- Upgrade dependencies ([1fd918c](https://github.com/kiki-kanri/ts-project-builder/commit/1fd918c))
- Remove dev script in package.json ([0e9d9d1](https://github.com/kiki-kanri/ts-project-builder/commit/0e9d9d1))
- Remove dev dependencies ([13ff773](https://github.com/kiki-kanri/ts-project-builder/commit/13ff773))
- Remove rollup submodule ([bc2a462](https://github.com/kiki-kanri/ts-project-builder/commit/bc2a462))

#### ⚠️ Breaking Changes

- ⚠️ Migrate to esm ([260ebb3](https://github.com/kiki-kanri/ts-project-builder/commit/260ebb3))

### ❤️ Contributors

- kiki-kanri

## v0.5.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.4.2...v0.5.0)

### 🚀 Enhancements

- Use extra config set builtin plugin options ([9c25e85](https://github.com/kiki-kanri/ts-project-builder/commit/9c25e85))

### 🩹 Fixes

- ⚠️ Edit extra options plugins type ([5f2ac79](https://github.com/kiki-kanri/ts-project-builder/commit/5f2ac79))
- Fixed always clear dist dir error ([b479ad7](https://github.com/kiki-kanri/ts-project-builder/commit/b479ad7))

### 💅 Refactors

- Refactor code ([4081ccd](https://github.com/kiki-kanri/ts-project-builder/commit/4081ccd))

### 🏡 Chore

- Upgrade dependencies ([127670c](https://github.com/kiki-kanri/ts-project-builder/commit/127670c))

### 🎨 Styles

- Edit import sort ([bc09400](https://github.com/kiki-kanri/ts-project-builder/commit/bc09400))

#### ⚠️ Breaking Changes

- ⚠️ Edit extra options plugins type ([5f2ac79](https://github.com/kiki-kanri/ts-project-builder/commit/5f2ac79))

### ❤️ Contributors

- kiki-kanri

## v0.4.2

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.4.1...v0.4.2)

### 🩹 Fixes

- Fixed extra config tmp name ext is not cjs ([49e1a98](https://github.com/kiki-kanri/ts-project-builder/commit/49e1a98))
- Fixed extra config plugin not work ([76fb65b](https://github.com/kiki-kanri/ts-project-builder/commit/76fb65b))

### ❤️ Contributors

- kiki-kanri

## v0.4.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.4.0...v0.4.1)

### 🩹 Fixes

- Make ExtraConfig params optional ([746d494](https://github.com/kiki-kanri/ts-project-builder/commit/746d494))

### ❤️ Contributors

- kiki-kanri

## v0.4.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.3.1...v0.4.0)

### 🚀 Enhancements

- Add isFile and randomStr utils ([d81e532](https://github.com/kiki-kanri/ts-project-builder/commit/d81e532))
- Add rmFile utils ([f6d9057](https://github.com/kiki-kanri/ts-project-builder/commit/f6d9057))
- Preprocessing extra config file ([7ef93d8](https://github.com/kiki-kanri/ts-project-builder/commit/7ef93d8))
- Use flag to switch force clear dist dir ([5349e41](https://github.com/kiki-kanri/ts-project-builder/commit/5349e41))
- Supports multiple inputs ([f3fbc4f](https://github.com/kiki-kanri/ts-project-builder/commit/f3fbc4f))

### 💅 Refactors

- Move interfaces and types to types.ts ([011a7ca](https://github.com/kiki-kanri/ts-project-builder/commit/011a7ca))
- Use fs rm method to remove dist dir ([fc8623d](https://github.com/kiki-kanri/ts-project-builder/commit/fc8623d))
- Move clear dist code block ([4ab497b](https://github.com/kiki-kanri/ts-project-builder/commit/4ab497b))

### 📦 Build

- Edit command to build index.ts ([5da847d](https://github.com/kiki-kanri/ts-project-builder/commit/5da847d))

### 🏡 Chore

- Upgrade dependencies ([e56a65e](https://github.com/kiki-kanri/ts-project-builder/commit/e56a65e))

### ❤️ Contributors

- kiki-kanri

## v0.3.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.3.0...v0.3.1)

### 🩹 Fixes

- Fixed incorrect url in package.json ([7051b98](https://github.com/kiki-kanri/ts-project-builder/commit/7051b98))

### 🏡 Chore

- Explicitly specify type in package.json ([3a0e85d](https://github.com/kiki-kanri/ts-project-builder/commit/3a0e85d))

### ❤️ Contributors

- kiki-kanri

## v0.3.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.2.1...v0.3.0)

### 🚀 Enhancements

- Auto enable .d.ts output when buile type is package ([26119e9](https://github.com/kiki-kanri/ts-project-builder/commit/26119e9))
- ⚠️ Rename flag --clean to --clear-dist ([666cd5f](https://github.com/kiki-kanri/ts-project-builder/commit/666cd5f))
- Use rollup cli handleError to log error ([1c49487](https://github.com/kiki-kanri/ts-project-builder/commit/1c49487))

### 🏡 Chore

- Upgrade dependencies and edit tsconfig ([8b358b9](https://github.com/kiki-kanri/ts-project-builder/commit/8b358b9))
- Add rollup submodule ([44023a8](https://github.com/kiki-kanri/ts-project-builder/commit/44023a8))

#### ⚠️ Breaking Changes

- ⚠️ Rename flag --clean to --clear-dist ([666cd5f](https://github.com/kiki-kanri/ts-project-builder/commit/666cd5f))

### ❤️ Contributors

- kiki-kanri

## v0.2.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.2.0...v0.2.1)

### 📖 Documentation

- Edit readme ([3b713c6](https://github.com/kiki-kanri/ts-project-builder/commit/3b713c6))

### ❤️ Contributors

- kiki-kanri

## v0.2.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- Add --no-strip flag to controll strip plugin ([01dd78b](https://github.com/kiki-kanri/ts-project-builder/commit/01dd78b))
- Read package.json version field to set cli version ([a7fc596](https://github.com/kiki-kanri/ts-project-builder/commit/a7fc596))
- Add @rollup/plugin-json to parse json ([bc565c3](https://github.com/kiki-kanri/ts-project-builder/commit/bc565c3))
- Use config.js file set extra build options ([1c7433d](https://github.com/kiki-kanri/ts-project-builder/commit/1c7433d))
- ⚠️ Remove --input flag, use parameters to set ([e531904](https://github.com/kiki-kanri/ts-project-builder/commit/e531904))
- Auto detect package type using different externals plugin ([942baa2](https://github.com/kiki-kanri/ts-project-builder/commit/942baa2))
- ⚠️ Change format arg default value ([af10331](https://github.com/kiki-kanri/ts-project-builder/commit/af10331))

### 🩹 Fixes

- Fixed error format arg description ([3d77f39](https://github.com/kiki-kanri/ts-project-builder/commit/3d77f39))
- Fixed strip plugin not set include option ([7df9ff7](https://github.com/kiki-kanri/ts-project-builder/commit/7df9ff7))
- Fixed builder not close ([3d97600](https://github.com/kiki-kanri/ts-project-builder/commit/3d97600))
- Fixed some args not working correctly ([4d4515c](https://github.com/kiki-kanri/ts-project-builder/commit/4d4515c))

### 💅 Refactors

- Change rollup plugin sort ([7f6899e](https://github.com/kiki-kanri/ts-project-builder/commit/7f6899e))

### 📦 Build

- Edit scripts ([00325e1](https://github.com/kiki-kanri/ts-project-builder/commit/00325e1))
- Add build and publish script ([1dc5c21](https://github.com/kiki-kanri/ts-project-builder/commit/1dc5c21))

### 🏡 Chore

- Remove tsconfig-paths dependencies ([1ce5edb](https://github.com/kiki-kanri/ts-project-builder/commit/1ce5edb))
- Set banner only add to cli file ([8a88daf](https://github.com/kiki-kanri/ts-project-builder/commit/8a88daf))

#### ⚠️ Breaking Changes

- ⚠️ Remove --input flag, use parameters to set ([e531904](https://github.com/kiki-kanri/ts-project-builder/commit/e531904))
- ⚠️ Change format arg default value ([af10331](https://github.com/kiki-kanri/ts-project-builder/commit/af10331))

### ❤️ Contributors

- kiki-kanri

## v0.1.0

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/v0.0.1...v0.1.0)

### 🚀 Enhancements

- Add build and cli files ([78e1150](https://github.com/kiki-kanri/ts-project-builder/commit/78e1150))

### 💅 Refactors

- Move tsconfigs to package ([3c2c49f](https://github.com/kiki-kanri/ts-project-builder/commit/3c2c49f))

### 📖 Documentation

- Add readme ([8aab0fa](https://github.com/kiki-kanri/ts-project-builder/commit/8aab0fa))

### 🏡 Chore

- Add dependencies ([7ea8956](https://github.com/kiki-kanri/ts-project-builder/commit/7ea8956))
- Add and edit tsconfigs ([b1b4f99](https://github.com/kiki-kanri/ts-project-builder/commit/b1b4f99))
- Add require dependencies ([5e67ccf](https://github.com/kiki-kanri/ts-project-builder/commit/5e67ccf))
- Remove env comment in cli file ([ab466b6](https://github.com/kiki-kanri/ts-project-builder/commit/ab466b6))
- Add bin path in package.json ([059ba9b](https://github.com/kiki-kanri/ts-project-builder/commit/059ba9b))

### ❤️ Contributors

- kiki-kanri

## v0.0.1

[compare changes](https://github.com/kiki-kanri/ts-project-builder/compare/3cf5013...v0.0.1)

### 🏡 Chore

- Add gitignore and package.json ([3f8b2bc](https://github.com/kiki-kanri/ts-project-builder/commit/3f8b2bc))

### ❤️ Contributors

- kiki-kanri
