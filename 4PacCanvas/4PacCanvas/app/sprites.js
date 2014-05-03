/// <reference path="lib/utilities.ts"/>
/// <reference path="base/Sprite.ts"/>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 75;
var ballPainter = {
    paint: function (sprite, context) {
        context.beginPath();
        context.arc(sprite.left + sprite.dimension.width / 2, sprite.top + sprite.dimension.height / 2, radius, 0, Math.PI * 2, false);
        context.clip();

        context.shadowColor = 'rgb(0,0,0)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;

        context.lineWidth = 2;
        context.strokeStyle = 'rgb(100, 100, 195)';
        context.fillStyle = 'rgba(30, 144, 255, .15)';
        context.fill();
        context.stroke();
    }
};

var ball = new Sprite('ball', { height: 10, width: 10 }, ballPainter);

drawGrid(context, 'lightgray', 10, 10);
ball.left = 320;
ball.top = 160;

ball.paint(context);
//# sourceMappingURL=sprites.js.map
