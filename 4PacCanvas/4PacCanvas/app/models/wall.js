var Wall = (function () {
    function Wall(x, y, width, height) {
        if (typeof width === "undefined") { width = null; }
        if (typeof height === "undefined") { height = null; }
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
        this.x = x;
        this.y = y;
        this.width = width || wallWidth;
        this.height = height || wallWidth;
    }
    return Wall;
})();
//# sourceMappingURL=wall.js.map
