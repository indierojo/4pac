/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship(center, size, color) {
        _super.call(this, center, { width: size, height: size }, center.x - size, center.x + size, center.y - size, center.y + size);
        this.draw = function (context) {
            context.beginPath();
            context.lineTo(this.center.x, this.center.y - (this.size / 2));
            context.lineTo(this.center.x - (this.size / 2), this.center.y + (this.size / 2));
            context.lineTo(this.center.x + (this.size / 2), this.center.y + (this.size / 2));
            context.fillStyle = this.color;
            context.fill();
        };
        this.size = size;
        this.color = color;
        this.rotation = 0;
    }
    return Spaceship;
})(Glyph);
//# sourceMappingURL=spaceship.js.map