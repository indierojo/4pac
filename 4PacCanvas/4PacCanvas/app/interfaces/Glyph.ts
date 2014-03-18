class Glyph {
    center: Coord;
    velocityX: number;
    velocityY: number;
    dimension: Dimension;
    left: number;
    right: number;
    top: number;
    bottom: number;

    constructor(center: Coord, dimensions: Dimension, left: number, right: number, top: number, bottom: number) {
        this.center = center;
        this.dimension = dimensions;

        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }

    collidesWith = function (other: Glyph): boolean {
        var xBad;
        var yBad;

        if (this.left == other.left) {
            xBad = true;
        } else if (this.left < other.left) {
            if (this.right < other.left) {
                xBad = false;
            } else {
                xBad = true;
            }
        } else {
            if (other.right <= this.left) {
                xBad = false;
            } else {
                xBad = true;
            }
        }

        if (this.top == other.top) {
            yBad = true;
        } else if (this.top < other.top) {
            if (this.bottom < other.top) {
                yBad = false;
            } else {
                yBad = true;
            }
        } else {
            if (other.bottom <= this.top) {
                yBad = false;
            } else {
                yBad = true;
            }
        }

//        if (xBad || yBad) {
//            console.log("Collided with " + this.center.x, this.center.y);
//        }

        return xBad && yBad;
    }
}