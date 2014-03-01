interface Ball {
    x: number;
    y: number;
//    velocityX: number;
//    velocityY: number;
    radius: number;
    color: string;
}

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var context = canvas.getContext('2d');

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

var ball = {
    x: 100,
    y: 100,
//    velocityX: 3 * Math.random(),
//    velocityY: 3 * Math.random(),
    radius: 50 * Math.random(),
    color: 'rgba(' + (Math.random() * 255).toFixed(0) + ', ' +
    (Math.random() * 255).toFixed(0) + ', ' +
    (Math.random() * 255).toFixed(0) + ', 1.0)'
};

drawTheGrid('lightgray', 10, 10);

moveBall();

context.lineWidth = 0.5;
context.font = '32pt Arial';

window.onkeydown = e=> {
    var keyCode = e.keyCode;

    if (keyCode === upArrowKeycode) {
        upPressed = true;
        downPressed = false;
    }
    if (keyCode === downArrowKeycode) {
        downPressed = true;
        upPressed = false;
    }
    if (keyCode === leftArrowKeycode) {
        leftPressed = true;
        rightPressed = false;
    }
    if (keyCode === rightArrowKeycode) {
        rightPressed = true;
        leftPressed = false;
    }

    moveBall();
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
    moveBall();
};

function updateLabels() {
    var upclassName = upPressed ? 'green' : 'red';
    upLabel.setAttribute("class", upclassName);
    downLabel.className = downPressed ? 'green' : 'red';
    leftLabel.className = leftPressed ? 'green' : 'red';
    rightLabel.className = rightPressed ? 'green' : 'red';
}

function moveBall() {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTheGrid('lightgray', 10, 10);

    var stepX = leftPressed ? -10 : rightPressed ? 10 : 0;
    var stepY = upPressed ? -10 : downPressed ? 10 : 0;

    ball.x = ball.x + stepX;
    ball.y = ball.y + stepY;

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fillStyle = ball.color;
    context.fill();
}

function drawTheGrid(color: string, stepx: number, stepy: number) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }
    for (var j = stepy + 0.5; i < context.canvas.width; j += stepy) {
        context.beginPath();
        context.moveTo(0, j);
        context.lineTo(context.canvas.width, j);
        context.stroke();
    }
}