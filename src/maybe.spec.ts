import { Maybe } from './maybe';

describe('Maybe of and Maybe just', () => {
    it('Maybe.nothing should have null value', () => {
        expect(Maybe.nothing().value).toBe(null)
    });

    it('Maybe.of should have a value of 1', () => {
        expect(Maybe.just(1).value).toBe(1);
    });
});

describe('Maybe map', () => {
    let plusTwo = (val: number) => val + 2;
    it('Map 1 + 2 should be 3', () => {
        expect(Maybe.just(1).map(plusTwo).value).toBe(3);
    });

    it('Map of nothing + 2 should be nothing', () => {
        expect(Maybe.nothing().map(plusTwo).value).toBe(null);
    });

    it('Mutliple bind should not change the original bind value', () => {
        let maybe = Maybe.just(1);
        expect(maybe.value).toBe(1);
        expect(maybe.map(plusTwo).map(plusTwo).value).toBe(5);
        expect(maybe.value).toBe(1);
    });

    it('Map should be allowed to change the data type', () => {
        let toString = (num: number) => num.toString();
        expect(Maybe.just(10).map(toString).value).toBe('10');
    })
});

describe('Maybe setoid', () => {
    it('a.equals(a) === true (reflexivity)', () => {
        let maybe = Maybe.just(1);
        expect(maybe.equals(maybe)).toBe(true);
        let nothing = Maybe.nothing();
        expect(nothing.equals(nothing)).toBe(true);
    });

    it('a.equals(b) === b.equals(a) (symmetry)', () => {
        let a = Maybe.just(1);
        let b = Maybe.just(1);
        expect(a.equals(b) === b.equals(a)).toBe(true);
    });
});

describe('Maybe do', () => {
    it('Should run do when we have a value', () => {
        let maybe = Maybe.just(1);
        let result = 0;
        maybe.do((x) => {
            result = x + result;
        });
        expect(result).toBe(1);
    });

    it('Should not run do when maybe nothing', () => {
        let maybe = Maybe.nothing<number>();
        let result = 0;

        maybe.do((x) => {
            result = x + result;
        })

        expect(result).toBe(0);
    });
});

describe('Maybe filter', () => {
    let value = 'this is a value';
    let contains = (needle: string) => (v: string) => v.indexOf(needle) !== -1;

    it('Should return matching string', () => {
        let maybe = Maybe.just(value);
        expect(maybe.filter(contains('value')).value).toBe(value);
    });

    it('Should be nothing if it doesnt match', () => {
        let maybe = Maybe.nothing<string>();
        let filtered = maybe.filter(contains('value'));
        expect(filtered.equals(Maybe.nothing<string>())).toBe(true);
    });

    it('Should be nothing if predicate does not match', () => {
        let maybe = Maybe.just('a non matching string');
        let filtered = maybe.filter(contains('value'));
        expect(filtered.equals(Maybe.nothing<string>())).toBe(true);
    });
});

describe('Maybe or', () => {
    it('Should return a defualt value if nothing', () => {
        expect(Maybe.nothing<number>().or(() => 1)).toBe(1);
    });

    it('Should return value if it has one', () => {
        expect(Maybe.just(1).or(() => 1000)).toBe(1);
    });
});

describe('Maybe or else', () => {
    it('Should execute the or else when it is nothing', () => {
        let val = 0;
        let maybe = Maybe.nothing<number>().orElse(() => {
            val = 100;
        });

        expect(val).toBe(100);
    });

    it('Should not execute the or else', () => {
        let val = 0;
        let maybe = Maybe.just(true).orElse(() => {
            val = 100;
        });

        expect(val).toBe(0);
    });
});

describe('Maybe Chaining', () => {
    it('Working with objects should return a first name when the salary is > 100', () => {
        let person: {
            first: string,
            last: string,
            salary: number
        };

        person = {
            'first': 'Sally',
            'last': 'Sallerson',
            'salary': 150000
        };

        let name = Maybe.just(person)
            .filter(x => x.salary > 100000)
            .map(x => `${x.first} ${x.last}`).or(() => '');

        expect(name).toBe('Sally Sallerson');
    });
});

describe('Maybe bind', () => {
    it('should not double wrap the maybe', () => {
        let maybe = Maybe.just(1).bindFn(() => Maybe.just(1 * 10));
        expect(maybe.value).toBe(10);
    });
});

describe('Maybe wrap', () => {
    it('should wrap return the wrapped mapped', () => {
        let maybe = Maybe.just(1).wrap(10);
        expect(maybe.value).toBe(10);
    });
});

describe('Maybe or error', () => {
    it('should have an error', () => {
        expect(() => { Maybe.nothing().orError('This should happen') }).toThrowError('This should happen');
    });

    it('should return a value', () => {
        expect(Maybe.just(1).orError('This should not happen.')).toBe(1)
    });
});