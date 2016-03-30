/// <reference path="engine/Glyph.ts"/>
/// <reference path="interfaces/ICoord.ts"/>
/// <reference path="interfaces/IDimension.ts"/>
/// <reference path="models/wall.ts"/>
/// <reference path="models/ball.ts"/>

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var drawingContext = canvas.getContext('2d');

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

walls.push(new Wall({ x: 0, y: 0 }));
walls.push(new Wall({ x: 200, y: 200 }));
walls.push(new Wall({ x: 300, y: 300 }));
walls.push(new Wall({ x: 300, y: 330 }));
walls.push(new Wall({ x: 300, y: 360 }));
walls.push(new Wall({ x: 300, y: 390 }));
walls.push(new Wall({ x: 300, y: 420 }));
walls.push(new Wall({x: drawingContext.canvas.width - 30, y: drawingContext.canvas.height - 30}));

drawTheWalls();

var playerBall = new Ball({ x: 100, y: 100 }, 15, '#FFFF77');
playerBall.draw(drawingContext);
updateBall();

drawingContext.lineWidth = 0.5;
drawingContext.font = '32pt Arial';

window.onkeydown = e=> {
    var keyCode = e.keyCode;

    if (keyCode === upArrowKeycode) {
        upPressed = true;
        downPressed = false;
        leftPressed = false;
        rightPressed = false;
    }
    if (keyCode === downArrowKeycode) {
        upPressed = false;
        downPressed = true;
        leftPressed = false;
        rightPressed = false;
    }
    if (keyCode === leftArrowKeycode) {
        upPressed = false;
        downPressed = false;
        leftPressed = true;
        rightPressed = false;
    }
    if (keyCode === rightArrowKeycode) {
        upPressed = false;
        downPressed = false;
        leftPressed = false;
        rightPressed = true;
    }

    updateLabels();
    updateBall();
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
    updateBall();
};

function wallAt(glyph: Glyph): boolean {
    return walls.some(w => w.collidesWith(glyph));
}

function updateBall() {

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
        playerBall.rotation = rotationSum / rotations.length;
    }

    if (stepX == 0 && stepY == 0) {
        return;
    }

    drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);
    drawTheWalls();

    var newX = playerBall.center.x + stepX;
    var newY = playerBall.center.y + stepY;
    if (newX > drawingContext.canvas.width) {
        newX = playerBall.radius;
    } else if (newX < 0) {
        newX = drawingContext.canvas.width - playerBall.radius;
    }
    if (newY > drawingContext.canvas.height) {
        newY = playerBall.radius;
    } else if (newY < 0) {
        newY = drawingContext.canvas.height - playerBall.radius;
    }

    console.log("ballX: " + newX + ", ballY: " + newY);
    var potentialLocation = new Glyph({ x: newX, y: newY }, playerBall.dimension, newX - playerBall.radius, newX + playerBall.radius, newY - playerBall.radius, newY + playerBall.radius);
    if (wallAt(potentialLocation)) {
        console.log("Wall!");
    } else {
        playerBall.center.x = newX;
        playerBall.center.y = newY;
    }

    playerBall.draw(drawingContext);
}

function updateLabels() {
    upLabel.className = upPressed ? 'green' : 'red';
    downLabel.className = downPressed ? 'green' : 'red';
    leftLabel.className = leftPressed ? 'green' : 'red';
    rightLabel.className = rightPressed ? 'green' : 'red';
}

function drawTheWalls() {

    walls.forEach(wall=> {
        wall.draw(drawingContext);
    });
}