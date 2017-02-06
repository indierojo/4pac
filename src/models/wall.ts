import { Glyph} from "../engine/Glyph";
import { IBoundary } from "../interfaces/IBoundary";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";

export class Wall extends Glyph implements IDrawable {
    static getBoundsFor(topLeft: ICoord, width: number, height: number): IBoundary {
        return {
            left: topLeft.x,
            right: topLeft.x + width,
            top: topLeft.y,
            bottom: topLeft.y + height
        };
    }

    color: string;
    topLeft: ICoord;
    width: number;
    height: number;

    constructor(topLeft: ICoord, width: number = 30, height: number = 30, color: string = "#7777FF") {
        super({ x: topLeft.x + (width / 2), y: topLeft.y + (height / 2) }, { width: width, height: height }, Wall.getBoundsFor(topLeft, width, height));
        this.topLeft = topLeft;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw = function (drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.lineWidth = 2;
        drawingContext.strokeStyle = this.color;
        drawingContext.moveTo(this.topLeft.x, this.topLeft.y);
        drawingContext.lineTo(this.topLeft.x + this.dimension.width, this.topLeft.y);
        drawingContext.lineTo(this.topLeft.x + this.dimension.width, this.topLeft.y + this.dimension.height);
        drawingContext.lineTo(this.topLeft.x, this.topLeft.y + this.dimension.height);
        drawingContext.lineTo(this.topLeft.x, this.topLeft.y);
        drawingContext.stroke();
    };

    updateBounds() {
        return Wall.getBoundsFor(this.topLeft, this.width, this.height);
    }
}