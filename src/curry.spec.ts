import { curry } from './curry';

describe('Curry function', () => {
    it('Two parameter functions should accept 0, 1, or 2 parameters', () => {
        let add = (x: number, y: number) => x + y;
        expect(curry(add, 2)(2)).toBe(4);
        expect(curry(add, 2, 4)).toBe(6);
        expect(curry(add)(2)(3)).toBe(5);        
    });

    it('Three parameter functions should accept 0, 1, 2, or 3 parameters', () => {
        let concat = (x: string, y: string, z: string) => x + y + z;
        const cat = 'cat';
        expect(curry(concat, 'c', 'a', 't')).toBe(cat);
        expect(curry(concat, 'c', 'a')('t')).toBe(cat);
        expect(curry(concat, 'c')('a')('t')).toBe(cat);
        expect(curry(concat)('c')('a')('t')).toBe(cat);
    });

    it('Four parameter function should accept 0, 1, 2, 3, 4 parameters', () => {
        let concat = (w: string, x: string, y: string, z: string) => w + x + y + z;
        const cats = 'cats';
        expect(curry(concat, 'c', 'a', 't', 's')).toBe(cats);
        expect(curry(concat, 'c', 'a', 't')('s')).toBe(cats);
        expect(curry(concat, 'c', 'a')('t')('s')).toBe(cats);
        expect(curry(concat, 'c')('a')('t')('s')).toBe(cats);
        expect(curry(concat)('c')('a')('t')('s')).toBe(cats);
    });

    it('Two parameters of mixed types should take the correct types', () => {
        let concat = (x: number, y: string) => x + y.toString();
        let result = '1a';
        expect(curry(concat)(1)('a')).toBe(result);
        expect(curry(concat, 1)('a')).toBe(result);
        expect(curry(concat, 1, 'a')).toBe(result);
    });

    it('Three parameters of mixed types should take the correct types', () => {
        let concat = (x: number, y: string, z: any[]) => x + y.toString() + z.length;
        let result = '1a0';

        expect(curry(concat)(1)('a')([])).toBe(result);
        expect(curry(concat, 1)('a')([])).toBe(result);
        expect(curry(concat, 1, 'a')([])).toBe(result);
        expect(curry(concat, 1, 'a', [])).toBe(result);
    });

    it('Four parameter of mixed types should take the correct types', () => {

        let concat = (x: number, y: string, z: any[], a: Identity) => x + y.toString() + z.length + a.id;
        let result = '1a0my-test';
        let id: Identity = { id: 'my-test' }

        expect(curry(concat)(1)('a')([])(id)).toBe(result);
        expect(curry(concat, 1)('a')([])(id)).toBe(result);
        expect(curry(concat, 1, 'a')([])(id)).toBe(result);
        expect(curry(concat, 1, 'a', [])(id)).toBe(result);
        expect(curry(concat, 1, 'a', [], id)).toBe(result);
    });
});

interface Identity {
    id: string;
}