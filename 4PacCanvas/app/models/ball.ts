/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>

class Ball extends Glyph implements IDrawable {
    radius: number;
    color: string;
    rotation: number;

    draw = function(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, (.15 + this.rotation) * Math.PI, (1.85 + this.rotation) * Math.PI, false);
        context.lineTo(this.center.x, this.center.y);
        context.lineTo(this.center.x + (this.radius * .15), this.center.y + this.radius * .15);
        context.fillStyle = this.color;
        context.fill();
    };

    constructor(center: ICoord, radius: number, color: string) {
        super(center, { width: radius * 2, height: radius * 2 }, center.x - radius, center.x + radius, center.y - radius, center.y + radius);
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
} 