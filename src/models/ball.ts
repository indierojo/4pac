import { Glyph } from "../engine/Glyph";
import { IBoundary } from "../interfaces/IBoundary";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";

export class Ball extends Glyph implements IDrawable {
    static getBoundsFor(center: ICoord, radius: number): IBoundary {
        return {
            left: center.x - radius,
            right: center.x + radius,
            top: center.y - radius,
            bottom: center.y + radius,
        };
    }

    radius: number;
    color: string;
    rotation: number;

    constructor(center: ICoord, radius: number, color: string) {
        super(center, { width: radius * 2, height: radius * 2}, Ball.getBoundsFor(center, radius));
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }

    draw = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.globalCompositeOperation = "source-over";
        drawingContext.beginPath();
        drawingContext.arc(this.center.x, this.center.y, this.radius, (.20 + this.rotation) * Math.PI, (1.75 + this.rotation) * Math.PI, false);
        drawingContext.lineTo(this.center.x, this.center.y);
        drawingContext.lineTo(this.center.x + (this.radius * .15), this.center.y + this.radius * .15);
        drawingContext.fillStyle = this.color;
        drawingContext.fill();
        drawingContext.globalCompositeOperation = "xor";
    };

    updateBounds() {
        return Ball.getBoundsFor(this.center, this.radius);
    }
}