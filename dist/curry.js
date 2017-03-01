"use strict";
function curry(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return fn.length === args.length ? fn.apply(void 0, args) : curry.bind.apply(curry, [this, fn].concat(args));
}
exports.curry = curry;
//# sourceMappingURL=curry.js.map