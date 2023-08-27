import { defineExtraConfig } from './src';

export default defineExtraConfig({
	output: {
		banner: (chunk) => {
			if (chunk.facadeModuleId?.endsWith('cli.ts')) return '#!/usr/bin/env node\n';
			return '';
		}
	}
});
