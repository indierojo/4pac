"use strict";
var greeter_1 = require('../src/greeter');
var chai_1 = require('chai');
describe('Sayings Greeter', function () {
    it('should greet', function () {
        var greeter = new greeter_1.default('John');
        console.log(greeter.greet());
        chai_1.expect(greeter.greet()).to.equal("Hello there, John");
    });
});
//# sourceMappingURL=greeterSpec.js.map