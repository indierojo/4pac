/// <reference path="engine/Glyph.ts"/>
/// <reference path="interfaces/ICoord.ts"/>
/// <reference path="interfaces/IDimension.ts"/>
/// <reference path="models/circle.ts"/>
/// <reference path="models/spaceship.ts"/>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var upLabel = document.getElementById('upLabel');
var downLabel = document.getElementById('downLabel');
var leftLabel = document.getElementById('leftLabel');
var rightLabel = document.getElementById('rightLabel');
var spaceLabel = document.getElementById('spaceLabel');
var upArrowKeycode = 38;
var downArrowKeycode = 40;
var leftArrowKeycode = 37;
var rightArrowKeycode = 39;
var spacebarKeycode = 32;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var bullets = [];
var player = new Spaceship({ x: 250, y: 450 }, 50, '#FFFF77');
player.draw(context);
updatePlayerLocation();
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
    if (keyCode === spacebarKeycode) {
        spacePressed = true;
    }
    updateLabels();
    updatePlayerLocation();
    handleBullets();
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
    if (keyCode === spacebarKeycode) {
        spacePressed = false;
    }
    updateLabels();
    updatePlayerLocation();
    handleBullets();
};
//
//function wallAt(glyph: Glyph): boolean {
//    return walls.some(w => w.collidesWith(glyph));
//}
function handleBullets() {
    bullets = bullets.filter(function (bullet) {
        return bullet.center.y > 10;
    });
    bullets.forEach(function (bullet) {
        bullet.center.y = bullet.center.y - 10;
        bullet.draw(context);
    });
    if (spacePressed) {
        var bullet = new Circle({ x: player.center.x, y: player.top - 6 }, 4, '#FFFF77');
        console.log("space pressed: " + bullet.center.x + ", " + bullet.center.y);
        bullet.draw(context);
        bullets.push(bullet);
    }
}
function updatePlayerLocation() {
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
        }
        else {
            rotations.push(0);
        }
    }
    if (rotations.length > 0) {
        var rotationSum = rotations.reduce(function (x, y) { return x + y; }, 0);
        player.rotation = rotationSum / rotations.length;
    }
    if (stepX == 0 && stepY == 0) {
        return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    var newX = player.center.x + stepX;
    var newY = player.center.y + stepY;
    if (newX > context.canvas.width) {
        newX = player.size;
    }
    else if (newX < 0) {
        newX = context.canvas.width - player.size;
    }
    if (newY > context.canvas.height) {
        newY = player.size;
    }
    else if (newY < 0) {
        newY = context.canvas.height - player.size;
    }
    console.log("ballX: " + newX + ", ballY: " + newY);
    var potentialLocation = new Glyph({ x: newX, y: newY }, player.dimension, newX - player.size, newX + player.size, newY - player.size, newY + player.size);
    //if (wallAt(potentialLocation)) {
    //    console.log("Wall!");
    //} else {
    player.center.x = newX;
    player.center.y = newY;
    player.top = player.center.y - (player.size / 2);
    //}
    player.draw(context);
}
function updateLabels() {
    upLabel.className = upPressed ? 'green' : 'red';
    downLabel.className = downPressed ? 'green' : 'red';
    leftLabel.className = leftPressed ? 'green' : 'red';
    rightLabel.className = rightPressed ? 'green' : 'red';
    spaceLabel.className = spacePressed ? 'green' : 'red';
}
//# sourceMappingURL=clouds.js.map