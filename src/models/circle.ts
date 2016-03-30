/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>
///<reference path="../interfaces/IEraseable.ts"/>

class Circle extends Glyph implements IDrawable, IEraseable {
    radius: number;
    color: string;
    rotation: number;

    draw = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
        drawingContext.fillStyle = this.color;
        drawingContext.fill();
    };

    erase = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.clearRect(this.center.x - this.radius, this.center.y - this.radius, this.radius * 2, this.radius * 2);
    };

    constructor(center: ICoord, radius: number, color: string) {
        super(center, { width: radius * 2, height: radius * 2 }, center.x - radius, center.x + radius, center.y - radius, center.y + radius);
        this.radius = radius;
        this.color = color;
        this.rotation = 0;
    }
} 