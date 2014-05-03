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

var playerBall = new Ball({ x: 100, y: 100 }, 15, 'FFFF77');
playerBall.draw();
updateBall();

context.lineWidth = 0.5;
context.font = '32pt Arial';

window.onkeydown = function (e) {
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

    updateBall();
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

    updateBall();
};

function wallAt(glyph) {
    return walls.some(function (w) {
        return w.collidesWith(glyph);
    });
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
        var rotationSum = rotations.reduce(function (x, y) {
            return x + y;
        }, 0);
        playerBall.rotation = rotationSum / rotations.length;
    }

    if (stepX == 0 && stepY == 0) {
        return;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTheWalls();

    var newX = playerBall.center.x + stepX;
    var newY = playerBall.center.y + stepY;
    if (newX > context.canvas.width) {
        newX = 0 + playerBall.radius;
    } else if (newX < 0) {
        newX = context.canvas.width - playerBall.radius;
    }
    if (newY > context.canvas.height) {
        newY = 0 + playerBall.radius;
    } else if (newY < 0) {
        newY = context.canvas.height - playerBall.radius;
    }

    console.log("ballX: " + newX + ", ballY: " + newY);
    var potentialLocation = new Glyph({ x: newX, y: newY }, playerBall.dimension, newX - playerBall.radius, newX + playerBall.radius, newY - playerBall.radius, newY + playerBall.radius);
    if (wallAt(potentialLocation)) {
        console.log("Wall!");
    } else {
        playerBall.center.x = newX;
        playerBall.center.y = newY;
    }

    playerBall.draw();
}

function drawTheWalls() {
    walls.forEach(function (wall) {
        wall.draw();
    });
}
//# sourceMappingURL=4pac.js.map
