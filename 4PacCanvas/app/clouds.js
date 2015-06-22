/// <reference path="engine/Glyph.ts"/>
/// <reference path="engine/requestNextAnimationFrame.ts"/>
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
window.requestNextAnimationFrame(animate);
function animate(time) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    updateLabels();
    updatePlayerLocation();
    handleBullets();
    player.draw(context);
    window.requestNextAnimationFrame(animate);
}
context.lineWidth = 0.5;
context.font = '32pt Arial';
window.onkeydown = function (e) {
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
    if (keyCode === spacebarKeycode) {
        spacePressed = true;
    }
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
};
//
//function wallAt(glyph: Glyph): boolean {
//    return walls.some(w => w.collidesWith(glyph));
//}
function handleBullets() {
    //if(bullets.length == 0) {
    //    return;
    //}
    bullets = bullets.filter(function (bullet) {
        return bullet.center.y > 10;
    });
    bullets.forEach(function (bullet) {
        bullet.center.y = bullet.center.y - 10;
        bullet.draw(context);
    });
    if (spacePressed) {
        var bulletX = player.center.x;
        var bulletY = player.top - 6;
        var isInSamePosition = function (b) {
            return b.center.y >= bulletY - 60 && b.center.y;
        };
        if (bullets.some(isInSamePosition)) {
            // Don't add a new bullet if one already exists at same x and similar y
            return;
        }
        var bullet = new Circle({ x: bulletX, y: bulletY }, 4, '#FFFF77');
        console.log("space pressed: " + bullet.center.x + ", " + bullet.center.y);
        bullet.draw(context);
        bullets.push(bullet);
    }
}
function updatePlayerLocation() {
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
    //var potentialLocation = new Glyph({ x: newX, y: newY }, player.dimension, newX - player.size, newX + player.size, newY - player.size, newY + player.size);
    //if (wallAt(potentialLocation)) {
    //    console.log("Wall!");
    //} else {
    player.center.x = newX;
    player.center.y = newY;
    player.top = player.center.y - (player.size / 2);
    //}
}
function updateLabels() {
    upLabel.className = upPressed ? 'green' : 'red';
    downLabel.className = downPressed ? 'green' : 'red';
    leftLabel.className = leftPressed ? 'green' : 'red';
    rightLabel.className = rightPressed ? 'green' : 'red';
    spaceLabel.className = spacePressed ? 'green' : 'red';
}
//# sourceMappingURL=clouds.js.map