import { relative } from './browser-path';
import {
    isAbsolute,
    resolve,
} from './path';

export function relativeId(id: string): string {
    if (!isAbsolute(id)) return id;
    return relative(resolve(), id);
}
