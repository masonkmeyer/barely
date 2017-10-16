# Barely Functional 

![status](https://travis-ci.org/masonkmeyer/barely.svg?branch=master)

A "functional programming library written in [TypeScript](https://www.typescriptlang.org/). 

``` npm install barely --save ```

> This library favors accurate typing over functionality. Where possible, it limits methods to four parameters. It fiddles with method signatures to more accurately reflect the types. Generally, it makes concessions to favor common scenarios. 
 
## Current 
### Monads
#### Maybe
The maybe monad is incredibly useful. It helps you deal with a common problem&mdash;optional values. 
```typescript

interface Person {
    first:string;
    last: string;
    passport: string;
    company: Company
}

interface Company {
    name: string;
}

let me: Person = {
    first: "Mason",
    last: "Meyer",
    passport: null, 
    company: null
};

// Let's try and format it or return an empty string
let passportNumber:string = Maybe.just(me)
     .map(x => `$#{x.passport}`)
     .else(() => "");

// Maybes :heart: to be chained. 
let companyNameMaybe:Maybe<string> = Maybe.just(me)
            .map(x => x.company)
            .map(x => x.name);
            
let bigCompanyName:Maybe<string> = companyNameMaybe.map(x => x.name.toUpperCase());
let companyName = companyNameMaybe.orError('You need to have a company name');

```

### Pipe and Compose

#### Pipe

Pipe helps you combine functions (from left to right) into a new function. Conceptually, it is equal to:

```
pipe(fn1, fn2, fn3)(arguments) == fn3(fn2(fn1(arguments)));
```

Examples, 

```typescript
// Adds an exlaimation point to the end of a string
let exclaim = (x: string) => x + "!";
// func to upper case a string
let toUpper = (x: string) => x.toUpperCase();

let yell = pipe(toUpper, exclaim);

// HELLO WORLD!
yell('hello world');

// We can also combine this new function in to new functions
let twice = (x: string) => x + ' ' + x;
let yellTwice = pipe(yell, twice);

// HI! Hi!
yellTwice('hi');

```

#### Compose

Compose is similar to pipe except it processes right to left. It is equal to

```
pipe(fn1, fn2, fn3)(arguments) == fn1(fn2(fn3(arguments)));
```

```typescript
  let plusOne = (x:number) => x + 1;
  let timesTwo = (x: number) => x * 2;
  let plusTwo = (x: number) => x + 2;

  // Compose goes right to left
  // 9  = ((2 + 2) * 2) + 1
  compose(plusOne, timesTwo, plusTwo)(2);

  // Pipe goes left to right
  // 8 = ((2 + 1) * 2) + 2
  pipe(plusOne, timesTwo, pluseTwo)(2);  

```

## Curry

Makes a function of multiple parameters into a sequence of single param functions. You can think of it like this:

```
curry(fn(x, y)) === (x) => (y) => result
``` 

For example, 

```typescript
let multiply = (x: number, y: number) => x * y;

let double = curry(multiply, 2);

// Typescript will automatically type this as (x:number) => number
// Result is 12
double(6);

```

## Future

- [] Identity Monad
- and more...

