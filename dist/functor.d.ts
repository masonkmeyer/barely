export interface Functor<Current> {
    map<Result>(func: (val: Current) => Result): Functor<Result>;
}
