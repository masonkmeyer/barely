import { Functor } from './functor';
import { Setoid } from './setoid';
export declare class Maybe<T> implements Functor<T>, Setoid<Maybe<T>> {
    private val;
    /**
     * @name just
     * @description A Maybe with a value.
     * @returns Maybe<T> where T is the value.
     */
    static just<T>(val: T): Maybe<T>;
    /**
     * @name nothing
     * @description  An empty Maybe
     * @return Maybe<T> where T is null
     */
    static nothing<T>(): Maybe<T>;
    constructor(val: T);
    /**
     * @name value
     * @description The value enclosed in the maybe.
     * @returns T
     */
    readonly value: T;
    /**
     * @name hasValue
     * @description Determines if the value is set.
     * @returns boolean
     */
    readonly hasValue: boolean;
    /**
     * @name bindFn
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    bindFn<Result>(func: (val: T) => Maybe<Result>): Maybe<Result>;
    /**
     * @name do
     * @description Runs the function when the maybe has a value (side effects).
     * @returns void
     */
    do(func: (val: T) => void): Maybe<T>;
    /**
     * @name equals
     * @description Checks the equality of the Maybe value
     * @returns boolean
     */
    equals(val: Maybe<T>): boolean;
    /**
     * @name filter
     * @description Applies a predicate to the value
     * @returns Maybe.Nothing | Maybe<T>
     */
    filter(func: (val: T) => boolean): Maybe<T>;
    /**
     * @name map
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    map<Result>(func: (val: T) => Result): Maybe<Result>;
    /**
     * @name or
     * @description Runs the function when the maybe does not have a value (side effects).
     * @returns void
     */
    or(func: () => T): T;
    /**
     * @name orElse
     * @description Supplies a default value to the maybe
     * @returns T
     */
    orElse(func: () => void): Maybe<T>;
    /**
     * @name orError
     * @description Throws an error when the maybe doesn't have a value.
     * @returns T
     * @throws error with supplied message
     */
    orError(msg?: string): T;
    /**
     * @name then
     * @description Alias of do
     * @see do
     */
    then: (func: (val: T) => void) => Maybe<T>;
    /**
     * @name wrap
     * @description Wraps the value with a maybe
     * @requires Maybe<Result>
     */
    wrap<Result>(v: Result): Maybe<Result>;
}
