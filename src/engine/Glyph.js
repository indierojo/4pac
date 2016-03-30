/// <reference path="../interfaces/ICoord.ts"/>
/// <reference path="../interfaces/IDimension.ts"/>
var Glyph = (function () {
    function Glyph(center, dimensions, left, right, top, bottom) {
        this.collidesWith = function (other) {
            var xBad;
            var yBad;
            if (this.left == other.left) {
                xBad = true;
            }
            else if (this.left < other.left) {
                if (this.right < other.left) {
                    xBad = false;
                }
                else {
                    xBad = true;
                }
            }
            else {
                if (other.right <= this.left) {
                    xBad = false;
                }
                else {
                    xBad = true;
                }
            }
            if (this.top == other.top) {
                yBad = true;
            }
            else if (this.top < other.top) {
                if (this.bottom < other.top) {
                    yBad = false;
                }
                else {
                    yBad = true;
                }
            }
            else {
                if (other.bottom <= this.top) {
                    yBad = false;
                }
                else {
                    yBad = true;
                }
            }
            //        if (xBad || yBad) {
            //            console.log("Collided with " + this.center.x, this.center.y);
            //        }
            return xBad && yBad;
        };
        this.center = center;
        this.dimension = dimensions;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    return Glyph;
}());
//# sourceMappingURL=Glyph.js.map