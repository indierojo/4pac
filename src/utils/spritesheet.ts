import { drawBackground, drawGuidelines } from "../engine/utilities";

interface ICoordinatePair {
    x: number;
    y: number;
}

const spritesheetCanvas = <HTMLCanvasElement> document.getElementById("canvas");
const spritesheetDrawingContext = spritesheetCanvas.getContext("2d");
const readout = document.getElementById("readout");
const spritesheet = new Image();

function windowToCanvas(canvas: HTMLCanvasElement, mouseX: number, mouseY: number): ICoordinatePair {
    const boundingBox = canvas.getBoundingClientRect();
    return {
        x: mouseX - boundingBox.left * (canvas.width / boundingBox.width),
        y: mouseY - boundingBox.top * (canvas.height / boundingBox.height)
    };
}


function drawSpritesheet() {
    spritesheetDrawingContext.drawImage(spritesheet, 0, 0);
}

function updateReadout(x: number, y: number) {
    readout.innerText = "(" + x.toFixed(0) + ", " + y.toFixed(0) + ")";
}


spritesheetCanvas.onmousemove = e => {
    const loc = windowToCanvas(spritesheetCanvas, e.clientX, e.clientY);

    drawBackground(spritesheetDrawingContext);
    drawSpritesheet();
    drawGuidelines(spritesheetDrawingContext, loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

spritesheet.src = "../../img/greenSheet.png";
spritesheet.onload = () => drawSpritesheet;

drawBackground(spritesheetDrawingContext);