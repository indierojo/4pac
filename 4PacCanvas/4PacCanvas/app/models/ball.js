var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(center, radius, color) {
        _super.call(this, center, { width: radius * 2, height: radius * 2 }, center.x - radius, center.x + radius, center.y - radius, center.y + radius);
        this.draw = function () {
            context.beginPath();
            context.arc(this.center.x, this.center.y, this.radius, (.15 + this.rotation) * Math.PI, (1.85 + this.rotation) * Math.PI, false);
            context.lineTo(this.center.x, this.center.y);
            context.lineTo(this.center.x + (this.radius * .15), this.center.y + this.radius * .15);
            context.fillStyle = this.color;
            context.fill();
        };
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
    return Ball;
})(Glyph);
//# sourceMappingURL=Ball.js.map
