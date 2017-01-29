import Greeter from "../src/greeter";
import { expect } from "chai";

describe("Sayings Greeter", () => {
    it("should greet", () => {
        const greeter = new Greeter("John");
        console.log(greeter.greet());
        expect(greeter.greet()).to.equal("Hello there, John");
    });
});