"use strict";
var pipe_1 = require("./pipe");
/**
 * @name compose
 * @description Tasks varadic list of functions and wraps them going right to left
 * For example: (f1, f2, f3) =>  f1(f2(f3(args)));
 * @returns func that passes arguments to the wrapped functions
 */
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    var args = funcs.reverse();
    return pipe_1.pipe.apply(void 0, [funcs[0]].concat(funcs.slice(1)));
}
exports.compose = compose;
//# sourceMappingURL=compose.js.map