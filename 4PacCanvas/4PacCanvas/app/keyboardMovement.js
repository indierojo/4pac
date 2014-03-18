var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var walls = [];

var upLabel = document.getElementById('upLabel');
var downLabel = document.getElementById('downLabel');
var leftLabel = document.getElementById('leftLabel');
var rightLabel = document.getElementById('rightLabel');

var upArrowKeycode = 38;
var downArrowKeycode = 40;
var leftArrowKeycode = 37;
var rightArrowKeycode = 39;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

walls.push(new Wall({ x: 0, y: 0 }));
walls.push(new Wall({ x: 200, y: 200 }));
walls.push(new Wall({ x: 300, y: 300 }));
walls.push(new Wall({ x: 300, y: 330 }));
walls.push(new Wall({ x: 300, y: 360 }));
walls.push(new Wall({ x: 300, y: 390 }));
walls.push(new Wall({ x: 300, y: 420 }));
walls.push(new Wall({ x: context.canvas.width - 30, y: context.canvas.height - 30 }));

drawTheWalls();

var ball = new Ball({ x: 100, y: 100 }, 15, 'FFFF77');
ball.draw();
moveBall();

context.lineWidth = 0.5;
context.font = '32pt Arial';

window.onkeydown = function (e) {
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

window.onkeyup = function (e) {
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

function wallAt(glyph) {
    return walls.some(function (w) {
        return w.collidesWith(glyph);
    });
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
        var rotationSum = rotations.reduce(function (x, y) {
            return x + y;
        }, 0);
        ball.rotation = rotationSum / rotations.length;
    }

    if (stepX == 0 && stepY == 0) {
        return;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTheWalls();

    var newX = ball.center.x + stepX;
    var newY = ball.center.y + stepY;

    console.log("ballX: " + newX + ", ballY: " + newY);
    var potentialLocation = new Glyph({ x: newX, y: newY }, ball.dimension, newX - ball.radius, newX + ball.radius, newY - ball.radius, newY + ball.radius);
    if (wallAt(potentialLocation)) {
        console.log("Wall!");
    } else {
        if (newX + ball.radius < context.canvas.width && newX - ball.radius > 0) {
            ball.x = newX;
        }
        if (newY + ball.radius < context.canvas.height && newY - ball.radius > 0) {
            ball.y = newY;
        }
    }

    ball.draw();
}

function drawTheWalls() {
    walls.forEach(function (wall) {
        wall.draw();
    });
}
//# sourceMappingURL=keyboardMovement.js.map
