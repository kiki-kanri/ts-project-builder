import { defineConfig } from './src';

export default defineConfig({
    builtInInputPluginOptions:{typescript:{tsconfig: './tsconfig.build.json'}},
    outputOptions: {
        default: {
            options: {
                banner(chunk) {
                    return chunk.facadeModuleId?.endsWith('cli.ts') ? '#!/usr/bin/env node\n' : '';
                },
            },
        },
    },
});
