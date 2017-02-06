import { ICoord } from "../interfaces/ICoord";
import { IDimension } from "../interfaces/IDimension";

export class Glyph {
    center: ICoord;
    velocityX: number;
    velocityY: number;
    dimension: IDimension;
    left: number;
    right: number;
    top: number;
    bottom: number;

    constructor(center: ICoord, dimensions: IDimension, left: number, right: number, top: number, bottom: number) {
        this.center = center;
        this.dimension = dimensions;

        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }

    collidesWith = function (other: Glyph): boolean {
        let xBad;
        let yBad;

        if (this.left === other.left) {
            xBad = true;
        } else if (this.left < other.left) {
            if (this.right < other.left) {
                xBad = false;
            } else {
                xBad = true;
            }
        } else {
            if (other.right < this.left) {
                xBad = false;
            } else {
                xBad = true;
            }
        }

        if (this.top === other.top) {
            yBad = true;
        } else if (this.top < other.top) {
            if (this.bottom < other.top) {
                yBad = false;
            } else {
                yBad = true;
            }
        } else {
            if (other.bottom < this.top) {
                yBad = false;
            } else {
                yBad = true;
            }
        }

//        if (xBad || yBad) {
//            console.log("Collided with " + this.center.x, this.center.y);
//        }

        return xBad && yBad;
    };
}