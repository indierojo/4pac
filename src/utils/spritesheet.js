/// <reference path="../engine/Utilities.ts"/>
var canvas = document.getElementById('canvas');
var readout = document.getElementById('readout');
var context = canvas.getContext('2d');
var spritesheet = new Image();
function windowToCanvas(canvas, mouseX, mouseY) {
    var boundingBox = canvas.getBoundingClientRect();
    return {
        x: mouseX - boundingBox.left * (canvas.width / boundingBox.width),
        y: mouseY - boundingBox.top * (canvas.height / boundingBox.height)
    };
}
function drawSpritesheet() {
    context.drawImage(spritesheet, 0, 0);
}
function updateReadout(x, y) {
    readout.innerText = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}
canvas.onmousemove = function (e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    drawBackground(context);
    drawSpritesheet();
    drawGuidelines(context, loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};
spritesheet.src = '../../img/greenSheet.png';
spritesheet.onload = function () { return drawSpritesheet; };
drawBackground(context);
//# sourceMappingURL=spritesheet.js.map