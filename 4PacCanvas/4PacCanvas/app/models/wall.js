﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(topLeft, width, height, color) {
        if (typeof width === "undefined") { width = 30; }
        if (typeof height === "undefined") { height = 30; }
        if (typeof color === "undefined") { color = 'FFFF77'; }
        _super.call(this, { x: topLeft.x + (width / 2), y: topLeft.y + (height / 2) }, { width: width, height: height }, topLeft.x, topLeft.x + width, topLeft.y, topLeft.y + height);
        this.draw = function () {
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = this.color;
            context.moveTo(this.topLeft.x, this.topLeft.y);
            context.lineTo(this.topLeft.x + this.dimension.width, this.topLeft.y);
            context.lineTo(this.topLeft.x + this.dimension.width, this.topLeft.y + this.dimension.height);
            context.lineTo(this.topLeft.x, this.topLeft.y + this.dimension.height);
            context.lineTo(this.topLeft.x, this.topLeft.y);
            context.stroke();
        };
        this.topLeft = topLeft;
        this.color = color;
    }
    return Wall;
})(Glyph);
//# sourceMappingURL=wall.js.map
