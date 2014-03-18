class Wall extends Glyph implements Drawable {
    color: string;
    topLeft: Coord;

    draw = function () {
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

    constructor(topLeft: Coord, width: number = 30, height: number = 30, color: string = 'FFFF77') {
        super({ x: topLeft.x + (width / 2), y: topLeft.y + (height / 2) }, { width: width, height: height }, topLeft.x, topLeft.x + width, topLeft.y, topLeft.y + height);
        this.topLeft = topLeft;
        this.color = color;
    }
} 