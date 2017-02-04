export default class KeyboardMovement {
    private canvas: HTMLCanvasElement;
    private drawingContext: CanvasRenderingContext2D;

    private upLabel: HTMLElement;
    private downLabel: HTMLElement;
    private leftLabel: HTMLElement;
    private rightLabel: HTMLElement;

    private upArrowKeycode = 38;
    private downArrowKeycode = 40;
    private leftArrowKeycode = 37;
    private rightArrowKeycode = 39;

    private upPressed = false;
    private downPressed = false;
    private leftPressed = false;
    private rightPressed = false;

    private circle = {
        x: 100,
        y: 100,
        radius: 15,
        color: "#FFFF77"
    };

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = this.canvas.getContext("2d");

        this.upLabel = document.getElementById("upLabel");
        this.downLabel = document.getElementById("downLabel");
        this.leftLabel = document.getElementById("leftLabel");
        this.rightLabel = document.getElementById("rightLabel");

        this.drawCircle();
        this.move();

        this.drawingContext.lineWidth = 0.5;
        this.drawingContext.font = "32pt Arial";

        window.onkeydown = e => {
            const keyCode = e.keyCode;

            if (keyCode === this.upArrowKeycode) {
                this.upPressed = true;
                this.downPressed = false;
            }
            if (keyCode === this.downArrowKeycode) {
                this.upPressed = false;
                this.downPressed = true;
            }
            if (keyCode === this.leftArrowKeycode) {
                this.leftPressed = true;
                this.rightPressed = false;
            }
            if (keyCode === this.rightArrowKeycode) {
                this.leftPressed = false;
                this.rightPressed = true;
            }

            this.move();
            this.updateLabels();
        };

        window.onkeyup = e => {
            const keyCode = e.keyCode;
            if (keyCode === this.upArrowKeycode) {
                this.upPressed = false;
            }
            if (keyCode === this.downArrowKeycode) {
                this.downPressed = false;
            }
            if (keyCode === this.leftArrowKeycode) {
                this.leftPressed = false;
            }
            if (keyCode === this.rightArrowKeycode) {
                this.rightPressed = false;
            }

            this.updateLabels();
            this.move();
        };
    }

    private updateLabels = () => {
        const upclassName = this.upPressed ? "green" : "red";
        this.upLabel.setAttribute("class", upclassName);
        this.downLabel.className = this.downPressed ? "green" : "red";
        this.leftLabel.className = this.leftPressed ? "green" : "red";
        this.rightLabel.className = this.rightPressed ? "green" : "red";
    }

    private drawCircle = () => {
        this.drawingContext.beginPath();
        this.drawingContext.fillStyle = this.circle.color;
        this.drawingContext.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI);
        this.drawingContext.fill();
    }

    private move = () => {

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

        const newX = this.circle.x + stepX;
        const newY = this.circle.y + stepY;

        console.log("ballX: " + newX + ", ballY: " + newY);

        if (newX < this.drawingContext.canvas.width && newX > 0) {
            this.circle.x = newX;
        }
        if (newY < this.drawingContext.canvas.height && newY > 0) {
            this.circle.y = newY;
        }

        this.drawCircle();
    }
}
