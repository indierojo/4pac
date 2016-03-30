/// <reference path="../engine/Utilities.ts"/>

interface ICircle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    color: string;
}

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var drawingContext = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
var glassPane = document.getElementById('glasspane');
var paused = true;
var circles = [];

drawGrid(drawingContext, 'lightgray', 10, 10);

drawingContext.lineWidth = 0.5;
drawingContext.font = '32pt Arial';

for (var i = 1; i < 100; i++) {
    circles[i] = {
        x: 100,
        y: 100,
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 50 * Math.random(),
        color: 'rgba(' + (Math.random() * 255).toFixed(0) + ', ' +
        (Math.random() * 255).toFixed(0) + ', ' +
        (Math.random() * 255).toFixed(0) + ', 1.0)'
    };
}

startButton.onclick = e=> {
    e.preventDefault();
    e.stopPropagation();
    paused = !paused;
    startButton.innerText = paused ? 'Start' : 'Stop';
};

glassPane.onmousedown = e=> {
    e.preventDefault();
    e.stopPropagation();
};

drawingContext.canvas.onmousedown = e=> {
    e.preventDefault();
    e.stopPropagation();
};

setInterval(()=> {
    if (!paused) {
        drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);
        drawGrid(drawingContext, 'lightgray', 10, 10);

        circles.forEach(circle=> {
            drawingContext.beginPath();
            drawingContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
            drawingContext.fillStyle = circle.color;
            drawingContext.fill();
            adjustPosition(circle);
        });
    }
}, 1000 / 60);

function adjustPosition(circle: ICircle) {
    if (circle.x + circle.velocityX + circle.radius > drawingContext.canvas.width ||
        circle.x + circle.velocityX - circle.radius < 0) {
        circle.velocityX = -circle.velocityX;
    }

    if (circle.y + circle.velocityY + circle.radius > drawingContext.canvas.height ||
        circle.y + circle.velocityY - circle.radius < 0) {
        circle.velocityY = -circle.velocityY;
    }

    circle.x += circle.velocityX;
    circle.y += circle.velocityY;
}