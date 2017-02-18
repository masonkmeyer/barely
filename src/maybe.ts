import { Functor } from './functor';
import { Setoid } from './setoid';

export class Maybe<T> implements Functor<T>, Setoid<Maybe<T>> {
    static just<T>(val: T): Maybe<T> {
        return new Maybe<T>(val);
    }

    static nothing<T>(): Maybe<T> {
        return new Maybe<T>(null);
    }

    constructor(private val: T) {
    }

    public get value(): T {
        return this.val;
    }

    public get hasValue(): boolean {
        return this.val !== null;
    }

    public bind<Result>(func: (val: T) => Maybe<Result>): Maybe<Result> {
        return this.hasValue
            ? func(this.value)
            : Maybe.nothing<Result>();
    }

    public do(func: (val: T) => void): Maybe<T> {
        if (this.hasValue) {
            func(this.value);
        }

        return new Maybe<T>(this.value);
    }

    public equals(val: Maybe<T>): boolean {
        return val.value === this.value;
    }

    public filter(func: (val: T) => boolean): Maybe<T> {
        if (!this.hasValue) {
            return Maybe.nothing<T>();
        }

        return func(this.value) ? Maybe.just(this.value) : Maybe.nothing<T>();
    }

    public map<Result>(func: (val: T) => Result): Maybe<Result> {
        return this.bind(x => this.wrap(func(this.value)));
    }

    public or(func: () => T) {
        return this.hasValue ? this.value : func();
    }

    public orElse(func: () => void): Maybe<T> {
        if (!this.hasValue) {
            func();
        }

        return new Maybe<T>(this.value);
    }

    public orError(msg?: string): T {
        if (this.hasValue) {
            return this.value;
        }

        throw new Error(msg);
    }

    public then = this.do;

    public wrap<Result>(v: Result) {
        return new Maybe<Result>(v);
    }
}