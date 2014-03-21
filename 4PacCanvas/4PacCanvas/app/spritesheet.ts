/// <reference path="lib/utilities.ts"/>

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


function drawSpritesheet() {
    context.drawImage(spritesheet, 0, 0);
}

function updateReadout(x: number, y: number) {
    readout.innerText = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}


canvas.onmousemove = e => {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);

    drawBackground();
    drawSpritesheet();
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

spritesheet.src = '../../img/greenSheet.png';
spritesheet.onload = () => drawSpritesheet;

drawBackground();