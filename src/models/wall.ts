/// <reference path="../engine/Glyph.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>

class Wall extends Glyph implements IDrawable {
    color: string;
    topLeft: ICoord;

    draw = function (drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.lineWidth = 1;
        drawingContext.strokeStyle = this.color;
        drawingContext.moveTo(this.topLeft.x, this.topLeft.y);
        drawingContext.lineTo(this.topLeft.x + this.dimension.width, this.topLeft.y);
        drawingContext.lineTo(this.topLeft.x + this.dimension.width, this.topLeft.y + this.dimension.height);
        drawingContext.lineTo(this.topLeft.x, this.topLeft.y + this.dimension.height);
        drawingContext.lineTo(this.topLeft.x, this.topLeft.y);
        drawingContext.stroke();
    };

    constructor(topLeft: ICoord, width: number = 30, height: number = 30, color: string = "#FFFF77") {
        super({ x: topLeft.x + (width / 2), y: topLeft.y + (height / 2) }, { width: width, height: height }, topLeft.x, topLeft.x + width, topLeft.y, topLeft.y + height);
        this.topLeft = topLeft;
        this.color = color;
    }
}