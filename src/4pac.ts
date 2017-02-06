import { Ball } from "./models/ball";
import { Wall } from "./models/wall";
import { Glyph } from "./engine/Glyph";

export default class FourPac {
    private player: Ball;
    private walls: Wall[];
    private drawingContext: CanvasRenderingContext2D;

    private upPressed: boolean;
    private downPressed: boolean;
    private leftPressed: boolean;
    private rightPressed: boolean;

    private upLabel: HTMLElement;
    private downLabel: HTMLElement;
    private leftLabel: HTMLElement;
    private rightLabel: HTMLElement;

    constructor() {
        const canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = canvas.getContext("2d");

        this.initGameModels();
        this.initUI();
        this.registerKeyHandlers();

        this.drawTheWalls();
        // window.requestNextAnimationFrame(this.animate);
    }

    private initUI = () => {
        this.upLabel = document.getElementById("upLabel");
        this.downLabel = document.getElementById("downLabel");
        this.leftLabel = document.getElementById("leftLabel");
        this.rightLabel = document.getElementById("rightLabel");

        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
    }

    private outerWalls = () => {
        const walls: Wall[] = [];
        for (let i = 0; i < this.drawingContext.canvas.width; i += 30) {
            if (i === 240) {
                continue;
            }
            walls.push(new Wall({x: i, y: 0}));
            walls.push(new Wall({x: i, y: this.drawingContext.canvas.height - 30}));
        }
        for (let j = 30; j < this.drawingContext.canvas.height - 30; j += 30) {
            if (j === 240) {
                continue;
            }
            walls.push(new Wall({x: 0, y: j}));
            walls.push(new Wall({x: this.drawingContext.canvas.width - 30, y: j}));
        }
        return walls;
    }
    private innerWalls = [
        new Wall({ x: 200, y: 200 }),
        new Wall({ x: 300, y: 300 }),
        new Wall({ x: 300, y: 330 }),
        new Wall({ x: 300, y: 360 }),
        new Wall({ x: 300, y: 390 }),
        new Wall({ x: 300, y: 420 }),
    ];
    private initGameModels = () => {
        this.walls = this.outerWalls().concat(this.innerWalls);

        this.player = new Ball({ x: 45, y: 45 }, 15, "#FFFF77");
        this.player.draw(this.drawingContext);
        this.updateBall();

        this.drawingContext.lineWidth = 0.5;
        this.drawingContext.font = "32pt Arial";
    }

    private registerKeyHandlers = () => {
        const upArrowKeycode = 38;
        const downArrowKeycode = 40;
        const leftArrowKeycode = 37;
        const rightArrowKeycode = 39;

        window.onkeydown = e => {
            const keyCode = e.keyCode;

            if (keyCode === upArrowKeycode) {
                this.upPressed = true;
                this.downPressed = false;
                this.leftPressed = false;
                this.rightPressed = false;
            }
            if (keyCode === downArrowKeycode) {
                this.upPressed = false;
                this.downPressed = true;
                this.leftPressed = false;
                this.rightPressed = false;
            }
            if (keyCode === leftArrowKeycode) {
                this.upPressed = false;
                this.downPressed = false;
                this.leftPressed = true;
                this.rightPressed = false;
            }
            if (keyCode === rightArrowKeycode) {
                this.upPressed = false;
                this.downPressed = false;
                this.leftPressed = false;
                this.rightPressed = true;
            }

            this.updateLabels();
            this.updateBall();
        };

        window.onkeyup = e => {
            const keyCode = e.keyCode;
            if (keyCode === upArrowKeycode) {
                this.upPressed = false;
            }
            if (keyCode === downArrowKeycode) {
                this.downPressed = false;
            }
            if (keyCode === leftArrowKeycode) {
                this.leftPressed = false;
            }
            if (keyCode === rightArrowKeycode) {
                this.rightPressed = false;
            }

            this.updateLabels();
            this.updateBall();
        };
    }

    private wallAt = (glyph: Glyph) => {
        return this.walls.some(w => w.collidesWith(glyph));
    }

    private updateBall = () => {
        let stepX = 0;
        let stepY = 0;
        const rotations = [];
        if (this.leftPressed) {
            stepX = -10;
            rotations.push(1);
        }
        if (this.upPressed) {
            stepY = -10;
            rotations.push(1.5);
        }
        if (this.downPressed) {
            stepY = 10;
            rotations.push(0.5);
        }
        if (this.rightPressed) {
            stepX = 10;
            if (this.upPressed) {
                rotations.push(2);
            } else {
                rotations.push(0);
            }
        }

        if (rotations.length > 0) {
            const rotationSum = rotations.reduce((x, y) => x + y, 0);
            this.player.rotation = rotationSum / rotations.length;
        }

        if (stepX === 0 && stepY === 0) {
            return;
        }

        this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);
        this.drawTheWalls();

        let newX = this.player.center.x + stepX;
        let newY = this.player.center.y + stepY;
        if (newX > this.drawingContext.canvas.width) {
            newX = this.player.radius;
        } else if (newX < 0) {
            newX = this.drawingContext.canvas.width - this.player.radius;
        }
        if (newY > this.drawingContext.canvas.height) {
            newY = this.player.radius;
        } else if (newY < 0) {
            newY = this.drawingContext.canvas.height - this.player.radius;
        }

        console.log("ballX: " + newX + ", ballY: " + newY);
        const potentialLocation = new Ball(
            { x: newX, y: newY },
            this.player.radius - .1,
            "blue"
        );
        if (this.wallAt(potentialLocation)) {
            console.log("Wall!");
        } else {
            this.player.setCenter( {x: newX, y: newY});
        }

        this.player.draw(this.drawingContext);
    }

    private updateLabels = () => {
        this.upLabel.className = this.upPressed ? "green" : "red";
        this.downLabel.className = this.downPressed ? "green" : "red";
        this.leftLabel.className = this.leftPressed ? "green" : "red";
        this.rightLabel.className = this.rightPressed ? "green" : "red";
    }

    private drawTheWalls = () => {
        this.walls.forEach(wall => {
            wall.draw(this.drawingContext);
        });
    }
}