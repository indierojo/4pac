import { drawGrid } from "../engine/utilities";

interface ICircle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    color: string;
}

export default class BouncingBalls {
    private canvas: HTMLCanvasElement;
    private drawingContext: CanvasRenderingContext2D;
    private startButton: HTMLElement;
    private glassPane: HTMLElement;
    private paused: boolean;
    private circles: ICircle[];

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = this.canvas.getContext("2d");
        this.startButton = document.getElementById("startButton");
        this.glassPane = document.getElementById("glasspane");
        this.paused = true;
        this.circles = [];

        drawGrid(this.drawingContext, "lightgray", 10, 10);

        this.drawingContext.lineWidth = 0.5;
        this.drawingContext.font = "32pt Arial";

        for (let i = 1; i < 100; i++) {
            this.circles[i] = {
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

        this.startButton.onclick = e => {
            e.preventDefault();
            e.stopPropagation();
            this.paused = !this.paused;
            this.startButton.innerText = this.paused ? "Start" : "Stop";
        };

        this.glassPane.onmousedown = e => {
            e.preventDefault();
            e.stopPropagation();
        };

        this.drawingContext.canvas.onmousedown = e => {
            e.preventDefault();
            e.stopPropagation();
        };

        setInterval(() => {
            if (!this.paused) {
                this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);
                drawGrid(this.drawingContext, "lightgray", 10, 10);

                this.circles.forEach(circle => {
                    this.drawingContext.beginPath();
                    this.drawingContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
                    this.drawingContext.fillStyle = circle.color;
                    this.drawingContext.fill();
                    this.adjustPosition(circle);
                });
            }
        }, 1000 / 60);

    }

    private adjustPosition = (circle: ICircle) => {
        if (circle.x + circle.velocityX + circle.radius > this.drawingContext.canvas.width ||
            circle.x + circle.velocityX - circle.radius < 0) {
            circle.velocityX = -circle.velocityX;
        }

        if (circle.y + circle.velocityY + circle.radius > this.drawingContext.canvas.height ||
            circle.y + circle.velocityY - circle.radius < 0) {
            circle.velocityY = -circle.velocityY;
        }

        circle.x += circle.velocityX;
        circle.y += circle.velocityY;
    }
}