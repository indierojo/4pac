/// <reference path="../engine/Utilities.ts"/>
/// <reference path="../engine/Sprite.ts"/>

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var drawingContext = canvas.getContext('2d');
var ballPainter: IPainter = {
    paint: (sprite, drawingContext) => {

        var radius = sprite.dimension.width / 2;
        var x = sprite.left + radius;
        var y = sprite.top + radius;
        drawingContext.save();

        drawingContext.beginPath();
        drawingContext.arc(x, y, radius, 0, Math.PI * 2, false);
        drawingContext.clip();

        drawingContext.shadowColor = 'rgb(0,0,0)';
        drawingContext.shadowOffsetX = -4;
        drawingContext.shadowOffsetY = -4;
        drawingContext.shadowBlur = 8;

        drawingContext.lineWidth = 2;
        drawingContext.strokeStyle = 'rgb(100, 100, 195)';
        drawingContext.fillStyle = 'rgba(30, 144, 255, .15)';
        drawingContext.fill();
        drawingContext.stroke();

        drawingContext.restore();
    }
};

var ball = new Sprite('ball', {height: 75, width: 75}, ballPainter);

drawGrid(drawingContext, 'lightgray', 10, 10);
ball.left = 160;
ball.top = 320;

ball.paint(drawingContext);

ball.left = 100;
ball.top = 20;

ball.paint(drawingContext);