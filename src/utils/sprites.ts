/// <reference path="../engine/Sprite.ts"/>

import { drawGrid } from "../engine/utilities";

const spritesCanvas = <HTMLCanvasElement> document.getElementById("canvas");
const spritesDrawingContext = spritesCanvas.getContext("2d");

const ballPainter: IPainter = {
    paint: (sprite, drawingContext) => {

        const radius = sprite.dimension.width / 2;
        const x = sprite.left + radius;
        const y = sprite.top + radius;
        drawingContext.save();

        drawingContext.beginPath();
        drawingContext.arc(x, y, radius, 0, Math.PI * 2, false);
        drawingContext.clip();

        drawingContext.shadowColor = "rgb(0,0,0)";
        drawingContext.shadowOffsetX = -4;
        drawingContext.shadowOffsetY = -4;
        drawingContext.shadowBlur = 8;

        drawingContext.lineWidth = 2;
        drawingContext.strokeStyle = "rgb(100, 100, 195)";
        drawingContext.fillStyle = "rgba(30, 144, 255, .15)";
        drawingContext.fill();
        drawingContext.stroke();

        drawingContext.restore();
    }
};

const ball = new Sprite("ball", {height: 75, width: 75}, ballPainter);

drawGrid(spritesDrawingContext, "lightgray", 10, 10);
ball.left = 160;
ball.top = 320;

ball.paint(spritesDrawingContext);

ball.left = 100;
ball.top = 20;

ball.paint(spritesDrawingContext);