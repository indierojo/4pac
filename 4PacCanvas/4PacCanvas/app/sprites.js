/// <reference path="lib/Utilities.ts"/>
/// <reference path="lib/Sprite.ts"/>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var ballPainter = {
    paint: function (sprite, context) {
        var radius = sprite.dimension.width / 2;
        var x = sprite.left + radius;
        var y = sprite.top + radius;
        context.save();
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
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
        context.restore();
    }
};
var ball = new Sprite('ball', { height: 75, width: 75 }, ballPainter);
drawGrid(context, 'lightgray', 10, 10);
ball.left = 160;
ball.top = 320;
ball.paint(context);
ball.left = 100;
ball.top = 20;
ball.paint(context);
//# sourceMappingURL=sprites.js.map