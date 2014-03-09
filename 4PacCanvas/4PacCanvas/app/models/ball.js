var Ball = (function () {
    function Ball(x, y, radius, color) {
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, (.15 + this.rotation) * Math.PI, (1.85 + this.rotation) * Math.PI, false);
            context.lineTo(this.x, this.y);
            context.lineTo(this.x + (this.radius * .15), this.y + this.radius * .15);
            context.fillStyle = this.color;
            context.fill();
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
    return Ball;
})();
//# sourceMappingURL=ball.js.map
