/// <reference path="../engine/requestNextAnimationFrame.ts"/>

import { drawBackground } from "../engine/utilities";

export default class AnimationFrame {
    private canvas: HTMLCanvasElement;
    private drawingContext: CanvasRenderingContext2D;
    private animateButton: HTMLInputElement;
    private paused = true;

    private discs = [];
    private numDiscs: number;

    private lastFpsUpdateTime: number;
    private lastFpsUpdate: number;
    private lastTime: number;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = this.canvas.getContext("2d");
        this.animateButton = <HTMLInputElement> document.getElementById("animateButton");
        this.discs = [{
            x: 150,
            y: 250,
            lastX: 150,
            lastY: 250,
            velocityX: -3.2,
            velocityY: 3.5,
            radius: 25,
            innerColor: "rgba(255, 255, 0, 1)",
            middleColor: "rgba(255, 255, 0, 0.7)",
            outerColor: "rgba(255, 255, 0, 0.5)",
            strokeStyle: "gray"
        },
        {
            x: 50,
            y: 150,
            lastX: 50,
            lastY: 150,
            velocityX: 2.2,
            velocityY: 2.5,
            radius: 25,
            innerColor: "rgba(100, 145, 230, 1)",
            middleColor: "rgba(100, 145, 230, 0.7)",
            outerColor: "rgba(100, 145, 230, 0.5)",
            strokeStyle: "blue"
        },
        {
            x: 150,
            y: 75,
            lastX: 150,
            lastY: 75,
            velocityX: 1.2,
            velocityY: 1.5,
            radius: 25,
            innerColor: "rgba(255, 0, 0, 1)",
            middleColor: "rgba(255, 0, 0, 0.7)",
            outerColor: "rgba(255, 0, 0, 0.5)",
            strokeStyle: "orange"
        }];
        this.numDiscs = this.discs.length;

        this.lastFpsUpdateTime = 0;
        this.lastFpsUpdate = 0;
        this.lastTime = 0;

        this.animateButton.onclick = () => {
            this.paused = !this.paused;
            if (this.paused) {
                this.animateButton.value = "Animate";
            } else {
                window.requestNextAnimationFrame(this.animate);
                this.animateButton.value = "Pause";
            }
        };

        this.drawingContext.font = "48px Helvetica";
    }

    private calculateFps = () => {
        const now = (+new Date);
        const fps = 1000 / (now - this.lastTime);

        this.lastTime = now;

        if (now - this.lastFpsUpdateTime > 250) {
            this.lastFpsUpdateTime = now;
            this.lastFpsUpdate = fps;
        }
        return this.lastFpsUpdate;
    }

    private update = (time) => {
        for (let i = 0; i < this.numDiscs; ++i) {
            const disc = this.discs[i];

            if (disc.x + disc.velocityX + disc.radius > this.drawingContext.canvas.width || disc.x + disc.velocityX - disc.radius < 0) {
                disc.velocityX = -disc.velocityX;
            }
            if (disc.y + disc.velocityY + disc.radius > this.drawingContext.canvas.height || disc.y + disc.velocityY - disc.radius < 0) {
                disc.velocityY = -disc.velocityY;
            }

            disc.x += disc.velocityX;
            disc.y += disc.velocityY;
        }
    }

    private draw = () => {
        for (let i = 0; i < this.numDiscs; ++i) {

            const disc = this.discs[i];

            const gradient = this.drawingContext.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius);
            gradient.addColorStop(0.3, disc.innerColor);
            gradient.addColorStop(0.5, disc.middleColor);
            gradient.addColorStop(1.0, disc.outerColor);

            this.drawingContext.save();
            this.drawingContext.beginPath();
            this.drawingContext.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2, false);
            this.drawingContext.fillStyle = gradient;
            this.drawingContext.fill();
            this.drawingContext.stroke();
            this.drawingContext.restore();
        }
    }

    private animate = (time) => {

        if (!this.paused) {
            this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            drawBackground(this.drawingContext);
            this.update(time);
            this.draw();

            const fps = this.calculateFps();

            this.drawingContext.fillStyle = "cornflowerblue";
            this.drawingContext.fillText(fps.toFixed() + " fps", 20, 60);

            window.requestNextAnimationFrame(this.animate);
        }
    }
}