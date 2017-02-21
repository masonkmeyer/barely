"use strict";
var Maybe = (function () {
    function Maybe(val) {
        this.val = val;
        /**
         * @name then
         * @description Alias of do
         * @see do
         */
        this.then = this.do;
    }
    /**
     * @name just
     * @description A Maybe with a value.
     * @returns Maybe<T> where T is the value.
     */
    Maybe.just = function (val) {
        return new Maybe(val);
    };
    /**
     * @name nothing
     * @description  An empty Maybe
     * @return Maybe<T> where T is null
     */
    Maybe.nothing = function () {
        return new Maybe(null);
    };
    Object.defineProperty(Maybe.prototype, "value", {
        /**
         * @name value
         * @description The value enclosed in the maybe.
         * @returns T
         */
        get: function () {
            return this.val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Maybe.prototype, "hasValue", {
        /**
         * @name hasValue
         * @description Determines if the value is set.
         * @returns boolean
         */
        get: function () {
            return this.val !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name bindFn
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    Maybe.prototype.bindFn = function (func) {
        return this.hasValue
            ? func(this.value)
            : Maybe.nothing();
    };
    /**
     * @name do
     * @description Runs the function when the maybe has a value (side effects).
     * @returns void
     */
    Maybe.prototype.do = function (func) {
        if (this.hasValue) {
            func(this.value);
        }
        return new Maybe(this.value);
    };
    /**
     * @name equals
     * @description Checks the equality of the Maybe value
     * @returns boolean
     */
    Maybe.prototype.equals = function (val) {
        return val.value === this.value;
    };
    /**
     * @name filter
     * @description Applies a predicate to the value
     * @returns Maybe.Nothing | Maybe<T>
     */
    Maybe.prototype.filter = function (func) {
        if (!this.hasValue) {
            return Maybe.nothing();
        }
        return func(this.value) ? Maybe.just(this.value) : Maybe.nothing();
    };
    /**
     * @name map
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    Maybe.prototype.map = function (func) {
        var _this = this;
        return this.bindFn(function (x) { return _this.wrap(func(_this.value)); });
    };
    /**
     * @name or
     * @description Runs the function when the maybe does not have a value (side effects).
     * @returns void
     */
    Maybe.prototype.or = function (func) {
        return this.hasValue ? this.value : func();
    };
    /**
     * @name orElse
     * @description Supplies a default value to the maybe
     * @returns T
     */
    Maybe.prototype.orElse = function (func) {
        if (!this.hasValue) {
            func();
        }
        return new Maybe(this.value);
    };
    /**
     * @name orError
     * @description Throws an error when the maybe doesn't have a value.
     * @returns T
     * @throws error with supplied message
     */
    Maybe.prototype.orError = function (msg) {
        if (this.hasValue) {
            return this.value;
        }
        throw new Error(msg);
    };
    /**
     * @name wrap
     * @description Wraps the value with a maybe
     * @requires Maybe<Result>
     */
    Maybe.prototype.wrap = function (v) {
        return new Maybe(v);
    };
    return Maybe;
}());
exports.Maybe = Maybe;
//# sourceMappingURL=maybe.js.map