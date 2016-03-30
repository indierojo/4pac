"use strict";
var Greeter = (function () {
    function Greeter(message) {
        var _this = this;
        this.greet = function () {
            return "Hello there, " + _this.greeting;
        };
        this.greeting = message;
    }
    return Greeter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Greeter;
//# sourceMappingURL=greeter.js.map