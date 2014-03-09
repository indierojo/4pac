class Wall extends Glyph implements Drawable {
    color: string;

    draw = function () {
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = this.color;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - this.width, this.y);
        context.lineTo(this.x - this.width, this.y - this.height);
        context.lineTo(this.x, this.y - this.width);
        context.lineTo(this.x, this.y);
        context.stroke();
    };

    constructor(x: number, y: number, width: number = 10, height: number = 10, color: string = 'FFFF77') {
        super(x, y, width, height);
        this.color = color;
    }
} 