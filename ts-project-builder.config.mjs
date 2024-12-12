import { defineConfig } from './src';

export default defineConfig({
    outputOptions: {
        default: {
            options: { banner: (chunk) => chunk.facadeModuleId?.endsWith('cli.ts') ? '#!/usr/bin/env node\n' : '' },
        },
    },
});
