import { IBoundary } from "../interfaces/IBoundary";
import { ICoord } from "../interfaces/ICoord";
import { IDimension } from "../interfaces/IDimension";

export abstract class Glyph {
    readonly bounds: IBoundary;
    readonly center: ICoord;
    velocityX: number;
    velocityY: number;
    dimension: IDimension;

    constructor(center: ICoord, dimensions: IDimension, initialBounds: IBoundary) {
        this.center = center;
        this.dimension = dimensions;
        this.bounds = initialBounds;
    }

    setCenter = function (newCenter: ICoord): void {
        this.center = newCenter;
        this.bounds = this.updateBounds();
    };

    abstract updateBounds(): IBoundary;

    collidesWith = function (other: Glyph): boolean {
        let xBad;
        let yBad;

        if (this.bounds.left === other.bounds.left) {
            xBad = true;
        } else if (this.bounds.left < other.bounds.left) {
            if (this.bounds.right < other.bounds.left) {
                xBad = false;
            } else {
                xBad = true;
            }
        } else {
            if (other.bounds.right < this.bounds.left) {
                xBad = false;
            } else {
                xBad = true;
            }
        }

        if (this.bounds.top === other.bounds.top) {
            yBad = true;
        } else if (this.bounds.top < other.bounds.top) {
            if (this.bounds.bottom < other.bounds.top) {
                yBad = false;
            } else {
                yBad = true;
            }
        } else {
            if (other.bounds.bottom < this.bounds.top) {
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