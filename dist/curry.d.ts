/**
 * @name curry
 * @description Makes a function of multiple parameters into a sequence of single param functions.
 * @param func and any arity of parameters
 */
export declare function curry<TOut, T1, T2>(fn: (t1: T1, t2: T2) => TOut): (t1: T1) => (t2: T2) => TOut;
export declare function curry<TOut, T1, T2>(fn: (t1: T1, t2: T2) => TOut, t1: T1): (t2: T2) => TOut;
export declare function curry<TOut, T1, T2>(fn: (t1: T1, t2: T2) => TOut, t1: T1, t2: T2): TOut;
export declare function curry<TOut, T1, T2, T3>(fn: (t1: T1, t2: T2, t3: T3) => TOut): (t1: T1) => (t2: T2) => (t3: T3) => TOut;
export declare function curry<TOut, T1, T2, T3>(fn: (t1: T1, t2: T2, t3: T3) => TOut, t1: T1): (t2: T2) => (t3: T3) => TOut;
export declare function curry<TOut, T1, T2, T3>(fn: (t1: T1, t2: T2, t3: T3) => TOut, t1: T1, t2: T2): (t3: T3) => TOut;
export declare function curry<TOut, T1, T2, T3>(fn: (t1: T1, t2: T2, t3: T3) => TOut, t1: T1, t2: T2, t3: T3): TOut;
export declare function curry<TOut, T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => TOut): (t1: T1) => (t2: T2) => (t3: T3) => (t4: T4) => TOut;
export declare function curry<TOut, T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => TOut, t1: T1, t2: T2, t3: T3, t4: T4): TOut;
export declare function curry<TOut, T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => TOut, t1: T1, t2: T2, t3: T3): (t4: T4) => TOut;
export declare function curry<TOut, T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => TOut, t1: T1, t2: T2): (t3: T3) => (t4: T4) => TOut;
export declare function curry<TOut, T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => TOut, t1: T1): (t2: T2) => (t3: T3) => (t4: T4) => TOut;
