(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["barely"] = factory();
	else
		root["barely"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
     * @name bind
     * @description Applies a function to transform the maybe (if it has a value).
     * @returns Maybe<Result>
     */
    Maybe.prototype.bind = function (func) {
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
        return this.bind(function (x) { return _this.wrap(func(_this.value)); });
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(0));
//# sourceMappingURL=index.js.map

/***/ })
/******/ ]);
});