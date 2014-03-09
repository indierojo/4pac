var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var context = canvas.getContext('2d');

var walls: Wall[] = [];

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

var ball = new Ball(100, 100, 15, 'FFFF77');

walls.push(new Wall(10, 10 ));
walls.push(new Wall(200, 200));
walls.push(new Wall(300, 300));
walls.push(new Wall(300, 310));
walls.push(new Wall(300, 320));
walls.push(new Wall(300, 330));
walls.push(new Wall(300, 340));
walls.push(new Wall(context.canvas.width, context.canvas.height));

drawTheGrid('lightgray', 10, 10);
drawTheWalls();

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

function wallAt(glyph: Glyph): boolean {
    return walls.some(w => w.collidesWith(glyph));
}

function updateLabels() {
    var upclassName = upPressed ? 'green' : 'red';
    upLabel.setAttribute("class", upclassName);
    downLabel.className = downPressed ? 'green' : 'red';
    leftLabel.className = leftPressed ? 'green' : 'red';
    rightLabel.className = rightPressed ? 'green' : 'red';
}

function moveBall() {

    var stepX = 0;
    var stepY = 0;
    var rotations = [];
    if (leftPressed) {
        stepX = -10;
        rotations.push(1);
    }
    if (upPressed) {
        stepY = -10;
        rotations.push(1.5);
    }
    if (downPressed) {
        stepY = 10;
        rotations.push(0.5);
    }
    if (rightPressed) {
        stepX = 10;
        if (upPressed) {
            rotations.push(2);
        } else {
            rotations.push(0);
        }
    }

    if (rotations.length > 0) {
        var rotationSum = rotations.reduce((x, y) => x + y, 0);
        ball.rotation = rotationSum / rotations.length;
    }

    if (stepX == 0 && stepY == 0) {
        return;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTheGrid('lightgray', 10, 10);
    drawTheWalls();

    var newX = ball.x + stepX;
    var newY = ball.y + stepY;

    console.log("ballX: " + newX + ", ballY: " + newY);
    var potentialLocation = new Glyph(newX, newY, ball.width, ball.height);
    if(wallAt(potentialLocation)) {
        console.log("Wall!");
    }
    else {
        if (newX + ball.radius < context.canvas.width && newX - ball.radius > 0) {
            ball.x = newX;
        }
        if (newY + ball.radius < context.canvas.height && newY - ball.radius > 0) {
            ball.y = newY;
        }
    }

    ball.draw();
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

function drawTheWalls() {

    walls.forEach(wall=> {
        wall.draw();
    });
}