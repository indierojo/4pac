class Ball extends Glyph implements Drawable {
//    velocityX: number;
//    velocityY: number;
    radius: number;
    color: string;
    rotation: number;

    draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, (.15 + this.rotation) * Math.PI, (1.85 + this.rotation) * Math.PI, false);
        context.lineTo(this.x, this.y);
        context.lineTo(this.x + (this.radius * .15), this.y + this.radius * .15);
        context.fillStyle = this.color;
        context.fill();
    }

    constructor(x: number, y: number, radius: number, color: string) {
        super(x, y, radius * 2, radius * 2);
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
} 