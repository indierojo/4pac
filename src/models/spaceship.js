/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>
/// <reference path="../interfaces/IEraseable.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship(center, size, color) {
        _super.call(this, center, { width: size, height: size }, center.x - (size / 2), center.x + (size / 2), center.y - (size / 2), center.y + (size / 2));
        this.draw = function (context) {
            context.beginPath();
            context.lineTo(this.center.x, this.center.y - (this.size / 2));
            context.lineTo(this.center.x - (this.size / 2), this.center.y + (this.size / 2));
            context.lineTo(this.center.x + (this.size / 2), this.center.y + (this.size / 2));
            context.fillStyle = this.color;
            context.fill();
        };
        this.erase = function (context) {
            context.clearRect(this.center.x - (this.size / 2), this.center.y - (this.size / 2), this.size, this.size);
        };
        this.size = size;
        this.color = color;
    }
    return Spaceship;
}(Glyph));
//# sourceMappingURL=spaceship.js.map