# ts-project-builder

Cli typescript project builder, use rollup.

**Detailed documentation will be added in future releases.**

## Usage

Use `npx ts-project-builder -h` command to see the usage description.

Use `npx ts-project-builder` command to automatically read the value of type in package.json to determine the output file format (esm or cjs).

The default entry point file to look for is ./src/index.ts
The default output folder is ./dist

**The -c flag enables automatic clearing of the dist folder, it does not specify a path to the configuration file!**

To use the additional settings, create a file named `ts-project-builder.config.ts` in the same level directory as package.json and refer to the following example:
```typescript
import { defineExtraConfig } from 'ts-project-builder';

export default defineExtraConfig({
	// options...
});
```
