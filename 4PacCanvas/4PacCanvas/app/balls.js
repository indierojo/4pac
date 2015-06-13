/// <reference path="lib/Utilities.ts"/>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
var glassPane = document.getElementById('glasspane');
var paused = true;
var circles = [];
drawGrid(context, 'lightgray', 10, 10);
context.lineWidth = 0.5;
context.font = '32pt Arial';
for (var i = 1; i < 100; i++) {
    circles[i] = {
        x: 100,
        y: 100,
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 50 * Math.random(),
        color: 'rgba(' + (Math.random() * 255).toFixed(0) + ', ' + (Math.random() * 255).toFixed(0) + ', ' + (Math.random() * 255).toFixed(0) + ', 1.0)'
    };
}
startButton.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    paused = !paused;
    startButton.innerText = paused ? 'Start' : 'Stop';
};
glassPane.onmousedown = function (e) {
    e.preventDefault();
    e.stopPropagation();
};
context.canvas.onmousedown = function (e) {
    e.preventDefault();
    e.stopPropagation();
};
setInterval(function () {
    if (!paused) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        circles.forEach(function (circle) {
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
            context.fillStyle = circle.color;
            context.fill();
            adjustPosition(circle);
        });
    }
}, 1000 / 60);
function adjustPosition(circle) {
    if (circle.x + circle.velocityX + circle.radius > context.canvas.width || circle.x + circle.velocityX - circle.radius < 0) {
        circle.velocityX = -circle.velocityX;
    }
    if (circle.y + circle.velocityY + circle.radius > context.canvas.height || circle.y + circle.velocityY - circle.radius < 0) {
        circle.velocityY = -circle.velocityY;
    }
    circle.x += circle.velocityX;
    circle.y += circle.velocityY;
}
//# sourceMappingURL=balls.js.map