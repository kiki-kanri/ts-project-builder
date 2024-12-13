import { createColors } from 'colorette';
import { env } from 'node:process';

// @see https://no-color.org
// @see https://www.npmjs.com/package/chalk
export const {
    bold,
    cyan,
    dim,
    gray,
    green,
    red,
    underline,
    yellow,
} = createColors({ useColor: env.FORCE_COLOR !== '0' && !env.NO_COLOR });
