import { Snake } from "./models/snake";
import { Wall } from "./models/wall";
import { Glyph } from "./engine/Glyph";

export default class SnakeGame {
    private player: Snake;
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

    constructor() {
        const canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = canvas.getContext("2d");
        this.drawingContext.globalCompositeOperation = "xor";
        this.drawingContext.lineWidth = 0.5;
        this.drawingContext.font = "32pt Arial";

        this.walls = this.outerWalls();
        this.player = new Snake({ x: 45, y: 45 }, 15, "#FFFF77");

        this.drawTheWalls();
        this.player.draw(this.drawingContext);

        this.updatePlayer();

        this.initUI();
        this.registerKeyHandlers();

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
            this.updatePlayer();
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
            this.updatePlayer();
        };
    }

    private wallAt = (glyph: Glyph) => {
        return this.walls.some(w => w.collidesWith(glyph));
    }

    private updatePlayer = () => {
        let stepX = 0;
        let stepY = 0;
        if (this.leftPressed) {
            stepX = -10;
        }
        if (this.upPressed) {
            stepY = -10;
        }
        if (this.downPressed) {
            stepY = 10;
        }
        if (this.rightPressed) {
            stepX = 10;
        }

        if (stepX === 0 && stepY === 0) {
            return;
        }

        this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);
        this.drawTheWalls();

        let newX = this.player.center.x + stepX;
        let newY = this.player.center.y + stepY;
        if (newX > this.drawingContext.canvas.width) {
            newX = this.player.width;
        } else if (newX < 0) {
            newX = this.drawingContext.canvas.width - this.player.width;
        }
        if (newY > this.drawingContext.canvas.height) {
            newY = this.player.width;
        } else if (newY < 0) {
            newY = this.drawingContext.canvas.height - this.player.width;
        }

        console.log("ballX: " + newX + ", ballY: " + newY);
        const potentialLocation = new Snake(
            { x: newX, y: newY },
            this.player.width - .1,
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