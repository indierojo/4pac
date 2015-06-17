/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(center, radius, color) {
        _super.call(this, center, { width: radius * 2, height: radius * 2 }, center.x - radius, center.x + radius, center.y - radius, center.y + radius);
        this.draw = function (context) {
            context.beginPath();
            context.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
            context.fillStyle = this.color;
            context.fill();
        };
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
    return Circle;
})(Glyph);
//# sourceMappingURL=circle.js.map