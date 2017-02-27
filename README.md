# Barely Functional 

![status](https://travis-ci.org/masonkmeyer/barely.svg?branch=master)

A "functional programming library written in [TypeScript](https://www.typescriptlang.org/). 

``` npm install barely --save ```

## Current 
### Monads
#### Maybe
The maybe monad is incredibly useful. That's why I choose to implement it first. It helps you deal with a common problem&mdash;optional values. 
```typescript

interface Person {
    first:string;
    last: string;
    passport: string;
    company: Company
}

interface Comapny {
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

## Future

- [] Identity Monad
- [] Compose
- [] Curry
- and more...

