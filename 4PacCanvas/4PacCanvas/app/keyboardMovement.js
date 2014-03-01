var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var readout = document.getElementById('readout');

var upArrowKeycode = 38;
var downArrowKeycode = 40;
var leftArrowKeycode = 37;
var rightArrowKeycode = 39;

var ball = {
    x: 100,
    y: 100,
    //    velocityX: 3 * Math.random(),
    //    velocityY: 3 * Math.random(),
    radius: 50 * Math.random(),
    color: 'rgba(' + (Math.random() * 255).toFixed(0) + ', ' + (Math.random() * 255).toFixed(0) + ', ' + (Math.random() * 255).toFixed(0) + ', 1.0)'
};

drawTheGrid('lightgray', 10, 10);

moveBall(0, 0);

context.lineWidth = 0.5;
context.font = '32pt Arial';

window.onkeydown = function (e) {
    var keyCode = e.keyCode;
    readout.innerText = keyCode.toString();

    if (keyCode === upArrowKeycode) {
        moveBall(0, -10);
    }
    if (keyCode === downArrowKeycode) {
        moveBall(0, 10);
    }
    if (keyCode === leftArrowKeycode) {
        moveBall(-10, 0);
    }
    if (keyCode === rightArrowKeycode) {
        moveBall(10, 0);
    }
};

window.onkeyup = function () {
    readout.innerText = "";
};

function moveBall(stepX, stepY) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTheGrid('lightgray', 10, 10);

    ball.x = ball.x + stepX;
    ball.y = ball.y + stepY;

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fillStyle = ball.color;
    context.fill();
}

function drawTheGrid(color, stepx, stepy) {
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
//# sourceMappingURL=keyboardMovement.js.map
