export interface Setoid<T> {
    equals(second: T): Boolean;
}
