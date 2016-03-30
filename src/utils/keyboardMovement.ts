var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var drawingContext = canvas.getContext('2d');

var upLabel = document.getElementById('upLabel');
var downLabel = document.getElementById('downLabel');
var leftLabel = document.getElementById('leftLabel');
var rightLabel = document.getElementById('rightLabel');

var upArrowKeycode = 38;
var downArrowKeycode = 40;
var leftArrowKeycode = 37;
var rightArrowKeycode = 39;

var upPressed: boolean = false;
var downPressed: boolean = false;
var leftPressed: boolean = false;
var rightPressed: boolean = false;

var circle = {
    x: 100,
    y: 100,
    radius: 15,
    color: '#FFFF77'
};

drawCircle();
move();

drawingContext.lineWidth = 0.5;
drawingContext.font = '32pt Arial';

window.onkeydown = e=> {
    var keyCode = e.keyCode;

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
    var keyCode = e.keyCode;
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
    var upclassName = upPressed ? 'green' : 'red';
    upLabel.setAttribute("class", upclassName);
    downLabel.className = downPressed ? 'green' : 'red';
    leftLabel.className = leftPressed ? 'green' : 'red';
    rightLabel.className = rightPressed ? 'green' : 'red';
}

function drawCircle() {
    drawingContext.beginPath();
    drawingContext.fillStyle = circle.color;
    drawingContext.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    drawingContext.fill();
}

function move() {

    var stepX = 0;
    var stepY = 0;

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

    if (stepX == 0 && stepY == 0) {
        return;
    }

    drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);

    var newX = circle.x + stepX;
    var newY = circle.y + stepY;

    console.log("ballX: " + newX + ", ballY: " + newY);

    if (newX < drawingContext.canvas.width && newX > 0) {
        circle.x = newX;
    }
    if (newY < drawingContext.canvas.height && newY > 0) {
        circle.y = newY;
    }

    drawCircle();
}