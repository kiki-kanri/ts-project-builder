import type { Config } from './types';

export * from './builder';

export const defineConfig = (config: Config = {}) => config;

export default defineConfig;
