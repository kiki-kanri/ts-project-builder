import { createColors } from 'colorette';
import type { Color } from 'colorette';

// @see https://no-color.org
// @see https://www.npmjs.com/package/chalk
const colors = createColors({ useColor: process.env.FORCE_COLOR !== '0' && !process.env.NO_COLOR });
export const bold: Color = colors.bold;
export const cyan: Color = colors.cyan;
export const dim: Color = colors.dim;
export const green: Color = colors.green;
export const red: Color = colors.red;
