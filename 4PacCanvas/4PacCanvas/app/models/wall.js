var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(x, y, width, height) {
        if (typeof width === "undefined") { width = 10; }
        if (typeof height === "undefined") { height = 10; }
        _super.call(this, x, y, width, height);
        this.draw = function () {
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = ball.color;
            context.moveTo(this.x, this.y);
            context.lineTo(this.x - this.width, this.y);
            context.lineTo(this.x - this.width, this.y - this.height);
            context.lineTo(this.x, this.y - this.width);
            context.lineTo(this.x, this.y);
            context.stroke();
        };
    }
    return Wall;
})(Glyph);
//# sourceMappingURL=wall.js.map
