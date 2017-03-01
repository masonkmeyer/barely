/**
 * @name compose
 * @description Tasks varadic list of functions and wraps them going right to left
 * For example: (f1, f2, f3) =>  f1(f2(f3(args)));
 * @returns func that passes arguments to the wrapped functions
 */
export declare function compose<T>(...funcs: any[]): (...args: any[]) => T;
