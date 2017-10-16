import { Functor } from './functor';
import { Setoid } from './setoid';

export class Maybe<T> implements Functor<T>, Setoid<Maybe<T>> {
    /**
     * @name just
     * @description A Maybe with a value. 
     * @returns Maybe<T> where T is the value. 
     */
    static just<T>(val: T): Maybe<T> {
        return new Maybe<T>(val);
    }

    /**
     * @name nothing
     * @description  An empty Maybe
     * @return Maybe<T> where T is null
     */
    static nothing<T>(): Maybe<T> {
        return new Maybe<T>(null);
    }

    constructor(private val: T) {
    }

    /**
     * @name value
     * @description The value enclosed in the maybe.
     * @returns T
     */
    public get value(): T {
        return this.val;
    }

    /**
     * @name hasValue
     * @description Determines if the value is set.
     * @returns boolean
     */
    public get hasValue(): boolean {
        return this.val != null;
    }

    /**
     * @name bindFn
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    public bindFn<Result>(func: (val: T) => Maybe<Result>): Maybe<Result> {
        return this.hasValue
            ? func(this.value)
            : Maybe.nothing<Result>();
    }

    /**
     * @name do
     * @description Runs the function when the maybe has a value (side effects). 
     * @returns void
     */
    public do(func: (val: T) => void): Maybe<T> {
        if (this.hasValue) {
            func(this.value);
        }

        return new Maybe<T>(this.value);
    }

    /**
     * @name equals
     * @description Checks the equality of the Maybe value
     * @returns boolean
     */
    public equals(val: Maybe<T>): boolean {
        return val.value === this.value;
    }

    /**
     * @name filter
     * @description Applies a predicate to the value
     * @returns Maybe.Nothing | Maybe<T>
     */
    public filter(func: (val: T) => boolean): Maybe<T> {
        if (!this.hasValue) {
            return Maybe.nothing<T>();
        }

        return func(this.value) ? Maybe.just(this.value) : Maybe.nothing<T>();
    }

    /**
     * @name map
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    public map<Result>(func: (val: T) => Result): Maybe<Result> {
        return this.bindFn(x => this.wrap(func(this.value)));
    }

    /**
     * @name or
     * @description Runs the function when the maybe does not have a value (side effects). 
     * @returns void
     */
    public or(func: () => T) {
        return this.hasValue ? this.value : func();
    }

    /**
     * @name orElse
     * @description Supplies a default value to the maybe
     * @returns T
     */
    public orElse(func: () => void): Maybe<T> {
        if (!this.hasValue) {
            func();
        }

        return new Maybe<T>(this.value);
    }

    /**
     * @name orError
     * @description Throws an error when the maybe doesn't have a value.
     * @returns T
     * @throws error with supplied message
     */
    public orError(msg?: string): T {
        if (this.hasValue) {
            return this.value;
        }

        throw new Error(msg);
    }

    /**
     * @name then
     * @description Alias of do
     * @see do
     */
    public then = this.do;

    /**
     * @name wrap
     * @description Wraps the value with a maybe
     * @requires Maybe<Result>
     */
    public wrap<Result>(v: Result) {
        return new Maybe<Result>(v);
    }
}