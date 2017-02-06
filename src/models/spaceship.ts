import { Glyph } from "../engine/Glyph";

import { IBoundary } from "../interfaces/IBoundary";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";
import { IEraseable } from "../interfaces/IEraseable";

export class Spaceship extends Glyph implements IDrawable, IEraseable {
    static getBoundsFor(center: ICoord, size: number): IBoundary {
        return {
            left: center.x - ( size / 2 ),
            right: center.x + ( size / 2 ),
            top: center.y - ( size / 2 ),
            bottom: center.y + ( size / 2 )
        };
    }

    size: number;
    color: string;

    constructor(center: ICoord, size: number, color: string) {
        super(
            center,
            { width: size, height: size },
            Spaceship.getBoundsFor(center, size)
        );
        this.size = size;
        this.color = color;
    }

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

    updateBounds() {
        return Spaceship.getBoundsFor(this.center, this.size);
    }
}