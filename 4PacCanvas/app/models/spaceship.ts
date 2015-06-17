/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>

class Spaceship extends Glyph implements IDrawable {
    size: number;
    color: string;
    rotation: number;

    draw = function(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.lineTo(this.center.x, this.center.y - (this.size / 2));
        context.lineTo(this.center.x - (this.size / 2), this.center.y + (this.size / 2));
        context.lineTo(this.center.x + (this.size / 2), this.center.y + (this.size / 2));
        context.fillStyle = this.color;
        context.fill();
    };

    constructor(center: ICoord, size: number, color: string) {
        super(center, { width: size, height: size }, center.x - ( size / 2 ), center.x + ( size / 2 ), center.y - ( size / 2 ), center.y + ( size / 2 ));
        this.size = size;
        this.color = color;
        this.rotation = 0;
    }
} 