import { defineExtraConfig } from './src';

export default defineExtraConfig({
	output: {
		banner: (chunk) => chunk.facadeModuleId?.endsWith('cli.ts') ? '#!/usr/bin/env node\n' : ''
	}
});
