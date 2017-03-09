/**
 * @name pipe
 * @description Tasks varadic list of functions and wraps them going left to right
 * For example: (f1, f2, f3) =>  f3(f2(f1(args)));
 * @returns func that passes arguments to the wrapped functions
 */
export declare function pipe<TOut, T1>(fn: (arg: T1) => any, ...funcs: ((...args: any[]) => any)[]): (arg: T1) => TOut;
export declare function pipe<TOut, T1, T2>(fn: (t1: T1, t2: T2) => any, ...funcs: ((...args: any[]) => any)[]): (t1: T1, t2: T2) => TOut;
export declare function pipe<TOut, T1, T2, T3>(fn: (t1: T1, t2: T2, t3: T3) => any, ...funcs: ((...args: any[]) => any)[]): (t1: T1, t2: T2, t3: T3) => TOut;
export declare function pipe<TOut, T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => any, ...funcs: ((...args: any[]) => any)[]): (t1: T1, t2: T2, t3: T3, t4: T4) => TOut;
export declare function pipe<TOut>(fn: (...args: any[]) => any, ...funcs: ((...args: any[]) => any)[]): (...args: any[]) => TOut;
