const keyboardMovementCanvas = <HTMLCanvasElement> document.getElementById("canvas");
const keyboardMovementDrawingContext = keyboardMovementCanvas.getContext("2d");

const upLabel = document.getElementById("upLabel");
const downLabel = document.getElementById("downLabel");
const leftLabel = document.getElementById("leftLabel");
const rightLabel = document.getElementById("rightLabel");

const upArrowKeycode = 38;
const downArrowKeycode = 40;
const leftArrowKeycode = 37;
const rightArrowKeycode = 39;

let upPressed: boolean = false;
let downPressed: boolean = false;
let leftPressed: boolean = false;
let rightPressed: boolean = false;

const circle = {
    x: 100,
    y: 100,
    radius: 15,
    color: "#FFFF77"
};

drawCircle();
move();

keyboardMovementDrawingContext.lineWidth = 0.5;
keyboardMovementDrawingContext.font = "32pt Arial";

window.onkeydown = e => {
    const keyCode = e.keyCode;

    if (keyCode === upArrowKeycode) {
        upPressed = true;
        downPressed = false;
    }
    if (keyCode === downArrowKeycode) {
        upPressed = false;
        downPressed = true;
    }
    if (keyCode === leftArrowKeycode) {
        leftPressed = true;
        rightPressed = false;
    }
    if (keyCode === rightArrowKeycode) {
        leftPressed = false;
        rightPressed = true;
    }

    move();
    updateLabels();
};

window.onkeyup = e => {
    const keyCode = e.keyCode;
    if (keyCode === upArrowKeycode) {
        upPressed = false;
    }
    if (keyCode === downArrowKeycode) {
        downPressed = false;
    }
    if (keyCode === leftArrowKeycode) {
        leftPressed = false;
    }
    if (keyCode === rightArrowKeycode) {
        rightPressed = false;
    }

    updateLabels();
    move();
};

function updateLabels() {
    const upclassName = upPressed ? "green" : "red";
    upLabel.setAttribute("class", upclassName);
    downLabel.className = downPressed ? "green" : "red";
    leftLabel.className = leftPressed ? "green" : "red";
    rightLabel.className = rightPressed ? "green" : "red";
}

function drawCircle() {
    keyboardMovementDrawingContext.beginPath();
    keyboardMovementDrawingContext.fillStyle = circle.color;
    keyboardMovementDrawingContext.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    keyboardMovementDrawingContext.fill();
}

function move() {

    let stepX = 0;
    let stepY = 0;

    if (leftPressed) {
        stepX = -10;
    }
    if (upPressed) {
        stepY = -10;
    }
    if (downPressed) {
        stepY = 10;
    }
    if (rightPressed) {
        stepX = 10;
    }

    if (stepX === 0 && stepY === 0) {
        return;
    }

    keyboardMovementDrawingContext.clearRect(0, 0, keyboardMovementDrawingContext.canvas.width, keyboardMovementDrawingContext.canvas.height);

    const newX = circle.x + stepX;
    const newY = circle.y + stepY;

    console.log("ballX: " + newX + ", ballY: " + newY);

    if (newX < keyboardMovementDrawingContext.canvas.width && newX > 0) {
        circle.x = newX;
    }
    if (newY < keyboardMovementDrawingContext.canvas.height && newY > 0) {
        circle.y = newY;
    }

    drawCircle();
}