import { Maybe } from './maybe';
import { pipe } from './pipe';
import { compose } from './compose';
import { curry } from './curry';

describe('Tests some use cases for the functions combined', () => {
    it('Should return only even value of strings', () => {
        function safeFilter<T>(predicate: (item: T) => boolean, arr: T[]): T[] {
            arr = Maybe.just(arr).or(() => []);
            return arr.filter(predicate);
        }

        let onlyEvens = (x: number) => x % 2 === 0;
        let filterEven = curry(safeFilter, onlyEvens);
        let sum = (arr: number[]) => {
            let sum = 0;
            arr.forEach(x => sum = sum + x);
            return sum;
        };

        let result = pipe<number>(filterEven, sum)([1, 2, 3, 4]);
        expect(result).toBe(6);
    });
});