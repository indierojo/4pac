/// <reference path="../engine/Utilities.ts"/>

interface ICoordinatePair {
    x: number;
    y: number;
}

var canvas = <HTMLCanvasElement> document.getElementById('canvas');
var readout = document.getElementById('readout');
var drawingContext = canvas.getContext('2d');
var spritesheet = new Image();

function windowToCanvas(canvas: HTMLCanvasElement, mouseX: number, mouseY: number):ICoordinatePair {
    var boundingBox = canvas.getBoundingClientRect();
    return {
        x: mouseX - boundingBox.left * (canvas.width / boundingBox.width),
        y: mouseY - boundingBox.top * (canvas.height / boundingBox.height)
    };
}


function drawSpritesheet() {
    drawingContext.drawImage(spritesheet, 0, 0);
}

function updateReadout(x: number, y: number) {
    readout.innerText = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}


canvas.onmousemove = e => {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);

    drawBackground(drawingContext);
    drawSpritesheet();
    drawGuidelines(drawingContext, loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

spritesheet.src = '../../img/greenSheet.png';
spritesheet.onload = () => drawSpritesheet;

drawBackground(drawingContext);