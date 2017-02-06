import { Circle } from "../src/models/Circle";
import { expect } from "chai";

describe("Glyph", () => {
    describe("Collision detection, positive", () => {
        it("should properly detect collisions of two objects in the same spot", () => {
            const a = new Circle({x: 0, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
        });

        // A
        // B
        it("should properly detect collisions of two objects overlapping on the top", () => {
            const a = new Circle({x: 0, y: -3}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
        });
        // B
        // A
        it("should properly detect collisions of two objects overlapping on the bottom", () => {
            const a = new Circle({x: 0, y: 3}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
        });
        // AB
        it("should properly detect collisions of two objects overlapping on the left", () => {
            const a = new Circle({x: -3, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
        });
        // BA
        it("should properly detect collisions of two objects overlapping on the left", () => {
            const a = new Circle({x: 3, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
        });
    });
    describe("Collision detection, negative", () => {
        // A
        // B
        it("should properly detect NO collisions of two objects vertically above", () => {
            const a = new Circle({x: 0, y: -6.01}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(false);
        });
        // B
        // A
        it("should properly detect NO collisions of two objects vertically below", () => {
            const a = new Circle({x: 0, y: 6.01}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(false);
        });
        // AB
        it("should properly detect NO collisions of two objects horizontally left", () => {
            const a = new Circle({x: -6.01, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(false);
        });
        // BA
        it("should properly detect NO collisions of two objects horizontally right", () => {
            const a = new Circle({x: 6.01, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(false);
        });
    });

    //   |
    //  |||
    // |||||
    //  |||
    //   |

});