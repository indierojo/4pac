class Glyph implements Coord, Dimension {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collidesWith = function (other: Glyph): boolean {
        
        var left = this.x;
        var right = this.x + this.width;
        var top = this.y;
        var bottom = this.y + this.height;

        var otherTop = other.y;
        var otherBottom = other.y + other.height;
        var otherLeft = other.x;
        var otherRight = other.x + other.width;

        var xBad;
        var yBad;

        if (left == otherLeft) {
            xBad = true;
        } else if (left < otherLeft) {
            if (right < otherLeft) {
                xBad = false;
            } else {
                xBad = true;
            }
        } else {
            if (otherRight <= left) {
                xBad = false;
            } else {
                xBad = true;
            }
        }

        if (top == otherTop) {
            yBad = true;
        } else if (top < otherTop) {
            if (bottom < otherTop) {
                yBad = false;
            } else {
                yBad = true;
            }
        } else {
            if (otherBottom <= top) {
                yBad = false;
            } else {
                yBad = true;
            }
        }

        //        if (xBad && yBad) {
        //            console.log("Collided with " + w.x, w.y);
        //        }

        return xBad && yBad;
    }
}