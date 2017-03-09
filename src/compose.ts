import { pipe } from './pipe';

/**
 * @name compose
 * @description Tasks varadic list of functions and wraps them going right to left  
 * For example: (f1, f2, f3) =>  f1(f2(f3(args)));
 * @returns func that passes arguments to the wrapped functions
 */
export function compose<T>(...funcs: any[]): (...args: any[]) => T {
    const args = funcs.reverse();
    return pipe<T>(funcs[0], ...funcs.slice(1));
}
