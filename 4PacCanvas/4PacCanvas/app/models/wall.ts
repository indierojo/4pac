class Wall extends Glyph implements Drawable {

    draw = function () {
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

    constructor(x: number, y: number, width: number = null, height: number = null) {
        super(x, y, width || wallWidth, height || wallWidth);
    }
} 