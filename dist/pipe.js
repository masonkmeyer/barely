"use strict";
function pipe(fn) {
    var funcs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        funcs[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !funcs.length ? fn.apply(void 0, args) : pipe.apply(void 0, [funcs[0]].concat(funcs.slice(1)))(fn.apply(void 0, args));
    };
}
exports.pipe = pipe;
//# sourceMappingURL=pipe.js.map