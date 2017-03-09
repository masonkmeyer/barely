import { pipe } from './pipe';

describe('Pipe function', () => {
    let plusOne = (x: number) => x + 1;
    let timesTwo = (x: number) => x * 2;
    let minusOne = (x: number) => x + -1;
    let plus10 = (x: number) => x + 10;

    it('+1 and * 2 should be 6', () => {
        let result = pipe(plusOne, timesTwo)(2);
        expect(result).toBe(6);
    });

    it('+1, -1, +10 should be 12', () => {
        let result = pipe(plusOne, minusOne, plus10)(2);
        expect(result).toBe(12);
    })

    it('Single function should return value', () => {
        expect(pipe((x: string) => x.toUpperCase())('a')).toBe('A');
    });

    it('Pipe multiple functions that transform data', () => {
        let concat = (args: string[]) => args.join('');
        let toUpper = (x: string) => x.toUpperCase();
        let exclaim = (x: string) => x + "!";
        let result = pipe(concat, toUpper, exclaim)(['h', 'e', 'l', 'l', 'o']);
        expect(result).toBe('HELLO!');
    });

    it('mix and match data types should compile', () => {
        let exclaim = (x: string) => x + "!";
        let toString = (x: number) => x.toString();
        let result = pipe(toString, exclaim)(1);
        expect(result).toBe("1!");
    });

    it('Should be able to pipe a piped method', () => {
        let exclaim = (x: string) => x + "!";
        let toUpper = (x: string) => x.toUpperCase();
        let yell = pipe(toUpper, exclaim);

        expect(yell('hello world')).toBe('HELLO WORLD!');

        let twice = (x: string) => x + ' ' + x;
        let yellTwice = pipe(yell, twice);

        expect(yellTwice('hi')).toBe('HI! HI!');
    });
});
