import { Glyph } from "../engine/Glyph";
import { IBoundary } from "../interfaces/IBoundary";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";
import { IEraseable } from "../interfaces/IEraseable";

export class Circle extends Glyph implements IDrawable, IEraseable {
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
        super(center, { width: radius * 2, height: radius * 2 }, Circle.getBoundsFor(center, radius));
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }

    draw = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
        drawingContext.fillStyle = this.color;
        drawingContext.fill();
    };

    erase = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.clearRect(this.center.x - this.radius, this.center.y - this.radius, this.radius * 2, this.radius * 2);
    };

    updateBounds() {
        return Circle.getBoundsFor(this.center, this.radius);
    }
}