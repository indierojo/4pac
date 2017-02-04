import { Glyph } from "../engine/Glyph";

import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";
import { IEraseable } from "../interfaces/IEraseable";

export class Spaceship extends Glyph implements IDrawable, IEraseable {
    size: number;
    color: string;

    draw = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.lineTo(this.center.x, this.center.y - (this.size / 2));
        drawingContext.lineTo(this.center.x - (this.size / 2), this.center.y + (this.size / 2));
        drawingContext.lineTo(this.center.x + (this.size / 2), this.center.y + (this.size / 2));
        drawingContext.fillStyle = this.color;
        drawingContext.fill();
    };

    erase = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.clearRect(this.center.x - (this.size / 2), this.center.y - (this.size / 2), this.size, this.size);
    };

    constructor(center: ICoord, size: number, color: string) {
        super(center, { width: size, height: size }, center.x - ( size / 2 ), center.x + ( size / 2 ), center.y - ( size / 2 ), center.y + ( size / 2 ));
        this.size = size;
        this.color = color;
    }
}