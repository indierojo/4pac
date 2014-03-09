var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, radius, color) {
        _super.call(this, x, y, radius * 2, radius * 2);
        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, (.15 + this.rotation) * Math.PI, (1.85 + this.rotation) * Math.PI, false);
            context.lineTo(this.x, this.y);
            context.lineTo(this.x + (this.radius * .15), this.y + this.radius * .15);
            context.fillStyle = this.color;
            context.fill();
        };
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
    return Ball;
})(Glyph);
//# sourceMappingURL=ball.js.map
