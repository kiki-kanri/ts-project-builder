import { createColors } from 'colorette';

// @see https://no-color.org
// @see https://www.npmjs.com/package/chalk
export const {
    bold,
    cyan,
    dim,
    green,
    red,
} = createColors({ useColor: process.env.FORCE_COLOR !== '0' && !process.env.NO_COLOR });
