import { Glyph } from "../engine/Glyph";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";

export class Ball extends Glyph implements IDrawable {
    radius: number;
    color: string;
    rotation: number;

    draw = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.arc(this.center.x, this.center.y, this.radius, (.15 + this.rotation) * Math.PI, (1.85 + this.rotation) * Math.PI, false);
        drawingContext.lineTo(this.center.x, this.center.y);
        drawingContext.lineTo(this.center.x + (this.radius * .15), this.center.y + this.radius * .15);
        drawingContext.fillStyle = this.color;
        drawingContext.fill();
    };

    constructor(center: ICoord, radius: number, color: string) {
        super(center, { width: radius * 2, height: radius * 2 }, center.x - radius, center.x + radius, center.y - radius, center.y + radius);
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
}