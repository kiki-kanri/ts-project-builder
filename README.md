# ts-project-builder

Cli typescript project builder, use rollup.

**Detailed documentation will be added in future releases.**

## Usage

**Version 2.x uses rollup v4.**

**If you want to use the rollup v3 version, please install the 1.x version.**

This package requires Node v18.0.0 or above.

Use `npx ts-project-builder -h` command to see the usage description.

Use `npx ts-project-builder` command to automatically read the value of type in package.json to determine the output file format (esm or cjs).

The default entry point file to look for is `./src/index.ts` and the default output folder is `./dist`.

**The -c flag enables automatic clearing of the dist folder, it does not specify a path to the configuration file!**

To use the additional settings, create a file named `ts-project-builder.config.mjs` in the same level directory as package.json and refer to the following example:

```typescript
import { defineExtraConfig } from "ts-project-builder"

export default defineExtraConfig({
  // options...
});
```

This builder already contains some plugins, the plugin options can be set through the top of the extraconfig builtinPluginOptions.

Builtin plugins:

- @rollup/plugin-commonjs
- @rollup/plugin-json
- @rollup/plugin-node-resolve
- @rollup/plugin-strip
- rollup-plugin-esbuild (Only minify)
- rollup-plugin-node-externals
- rollup-plugin-ts
