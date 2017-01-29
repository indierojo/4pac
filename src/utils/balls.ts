/// <reference path="../engine/Utilities.ts"/>

interface ICircle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    color: string;
}

const ballsCanvas = <HTMLCanvasElement> document.getElementById("canvas");
const ballsDrawingContext = ballsCanvas.getContext("2d");
const startButton = document.getElementById("startButton");
const glassPane = document.getElementById("glasspane");
let ballsPaused = true;
const circles = [];

drawGrid(ballsDrawingContext, "lightgray", 10, 10);

ballsDrawingContext.lineWidth = 0.5;
ballsDrawingContext.font = "32pt Arial";

for (let i = 1; i < 100; i++) {
    circles[i] = {
        x: 100,
        y: 100,
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 50 * Math.random(),
        color: "rgba(" + (Math.random() * 255).toFixed(0) + ", " +
        (Math.random() * 255).toFixed(0) + ", " +
        (Math.random() * 255).toFixed(0) + ", 1.0)"
    };
}

startButton.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    ballsPaused = !ballsPaused;
    startButton.innerText = ballsPaused ? "Start" : "Stop";
};

glassPane.onmousedown = e => {
    e.preventDefault();
    e.stopPropagation();
};

ballsDrawingContext.canvas.onmousedown = e => {
    e.preventDefault();
    e.stopPropagation();
};

setInterval(() => {
    if (!ballsPaused) {
        ballsDrawingContext.clearRect(0, 0, ballsDrawingContext.canvas.width, ballsDrawingContext.canvas.height);
        drawGrid(ballsDrawingContext, "lightgray", 10, 10);

        circles.forEach(circle => {
            ballsDrawingContext.beginPath();
            ballsDrawingContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
            ballsDrawingContext.fillStyle = circle.color;
            ballsDrawingContext.fill();
            adjustPosition(circle);
        });
    }
}, 1000 / 60);

function adjustPosition(circle: ICircle) {
    if (circle.x + circle.velocityX + circle.radius > ballsDrawingContext.canvas.width ||
        circle.x + circle.velocityX - circle.radius < 0) {
        circle.velocityX = -circle.velocityX;
    }

    if (circle.y + circle.velocityY + circle.radius > ballsDrawingContext.canvas.height ||
        circle.y + circle.velocityY - circle.radius < 0) {
        circle.velocityY = -circle.velocityY;
    }

    circle.x += circle.velocityX;
    circle.y += circle.velocityY;
}