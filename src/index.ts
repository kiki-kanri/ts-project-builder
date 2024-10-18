import type { Config } from './types';

export * from './builder';
export type * from './types';

export const defineConfig = (config: Config = {}) => config;

export default defineConfig;
