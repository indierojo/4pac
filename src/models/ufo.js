/// <reference path="./Circle.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>
/// <reference path="../interfaces/IEraseable.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ufo = (function (_super) {
    __extends(Ufo, _super);
    function Ufo(center, radius, color) {
        _super.call(this, center, radius, color);
    }
    return Ufo;
}(Circle));
//# sourceMappingURL=ufo.js.map