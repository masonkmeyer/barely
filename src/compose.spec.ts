import { compose } from './compose';

describe('Compose func should execute right to left', () => {
    let plusOne = (x: number) => x + 1;
    let timesTwo = (x: number) => x * 2;
    let minusOne = (x: number) => x + -1;
    let plus10 = (x: number) => x + 10;

    it('Compose of +1 and * 2 should be 5', () => {
        let plusOne = (x: number) => x + 1;
        let timesTwo = (x: number) => x * 2;

        expect(compose(plusOne, timesTwo)(2)).toBe(5);
    });

    it('Compose +1, -1, +10 should be 12', () => {
        let result = compose(plusOne, minusOne, plus10)(2);
        expect(result).toBe(12);
    });

    it('Single function should return value', () => {
        expect(compose((x: string) => x.toUpperCase())('a')).toBe('A');
    });

    it('Compose multiple functions that transform data', () => {
        let concat = (args: string[]) => args.join('');
        let toUpper = (x: string) => x.toUpperCase();
        let exclaim = (x: string) => x + "!";
        let result = compose(exclaim, toUpper, concat)(['h', 'e', 'l', 'l', 'o']);
        expect(result).toBe('HELLO!');
    });

    it('Mix and match data types should compile', () => {
        let exclaim = (x: string) => x + "!";
        let toString = (x: number) => x.toString();
        let result = compose(exclaim, toString, )(1);
        expect(result).toBe("1!");
    });
});
