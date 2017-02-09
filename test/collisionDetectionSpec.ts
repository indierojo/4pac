import { expect } from "chai";

import { Circle } from "../src/models/Circle";
import { Wall } from "../src/models/Wall";

describe("Collsion Detector", () => {
    describe("Should detect collisions", () => {
        it("of two objects in the same spot", () => {
            const a = new Circle({x: 0, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
            expect(b.collidesWith(a)).to.equal(true);
        });

        // A
        // B
        it("of two objects overlapping vertically", () => {
            const a = new Circle({x: 0, y: -3}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
            expect(b.collidesWith(a)).to.equal(true);
        });

        // AB
        it("of two objects overlapping horizontally", () => {
            const a = new Circle({x: -3, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(true);
            expect(b.collidesWith(a)).to.equal(true);
        });
    });
    describe("Should detect NON collisions", () => {
        // A
        // B
        it("of two objects vertically", () => {
            const a = new Circle({x: 0, y: -6.01}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(false);
            expect(b.collidesWith(a)).to.equal(false);
        });
        // AB
        it("of two objects horizontally left", () => {
            const a = new Circle({x: -6.01, y: 0}, 3, "green");
            const b = new Circle({x: 0, y: 0}, 3, "blue");
            expect(a.collidesWith(b)).to.equal(false);
            expect(b.collidesWith(a)).to.equal(false);
        });
    });
    describe("on circular objects", () => {
        it(`should NOT consider it a collision if the square overlaps the circle's 'corner'`, () => {
            const a = new Circle({x: 50, y: 50}, 30, "blue");
            const b = new Wall({x: 75, y: 75}, 60, 60, "blue");
            expect(a.collidesWith(b)).to.equal(false);
            expect(b.collidesWith(a)).to.equal(false);
        });
    });
});