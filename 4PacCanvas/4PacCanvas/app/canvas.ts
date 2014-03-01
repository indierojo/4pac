interface CoordinatePair {
    x: number;
    y: number;
}

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var readout = document.getElementById('readout');
var context = canvas.getContext('2d');
var spritesheet = new Image();

function windowToCanvas(canvas: HTMLCanvasElement, mouseX: number, mouseY: number):CoordinatePair {
    var boundingBox = canvas.getBoundingClientRect();
    return {
        x: mouseX - boundingBox.left * (canvas.width / boundingBox.width),
        y: mouseY - boundingBox.top * (canvas.height / boundingBox.height)
    };
}

function drawBackground() {
    var verticalLineSpacing = 12;
    var i = context.canvas.height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.5;

    while (i > verticalLineSpacing * 4) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
        i -= verticalLineSpacing;
    }
}

function drawSpritesheet() {
    context.drawImage(spritesheet, 0, 0);
}

function drawGuidelines(x: number, y: number) {
    context.strokeStyle = 'rgba(0,0,230,0.8)';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
}

function updateReadout(x: number, y: number) {
    readout.innerText = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}

function drawHorizontalLine(y: number) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
}

function drawVerticalLine(x: number) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
}

canvas.onmousemove = e => {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);

    drawBackground();
    drawSpritesheet();
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

spritesheet.src = '../img/greenSheet.png';
spritesheet.onload = () => drawSpritesheet;

drawBackground();