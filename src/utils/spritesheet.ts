import { drawGrid, drawGuidelines } from "../engine/utilities";

interface ICoordinatePair {
    x: number;
    y: number;
}

export default class SpriteSheet {
    private canvas: HTMLCanvasElement;
    private drawingContext: CanvasRenderingContext2D;
    private readout: HTMLElement;
    private spritesheet: HTMLImageElement;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.drawingContext = this.canvas.getContext("2d");
        this.readout = document.getElementById("readout");
        this.spritesheet = new Image();

        this.canvas.onmousemove = e => {
            this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);
            const loc = this.windowToCanvas(this.canvas, e.clientX, e.clientY);

            drawGrid(this.drawingContext, "lightgray", 10, 10);
            this.drawSpritesheet();
            drawGuidelines(this.drawingContext, loc.x, loc.y);
            this.updateReadout(loc.x, loc.y);
        };

        this.spritesheet.src = "../../img/greenSheet.png";
        this.spritesheet.onload = () => this.drawSpritesheet();

        drawGrid(this.drawingContext, "lightgray", 10, 10);
    }

    private windowToCanvas = (canvas: HTMLCanvasElement, mouseX: number, mouseY: number): ICoordinatePair => {
        const boundingBox = canvas.getBoundingClientRect();
        return {
            x: mouseX - boundingBox.left * (canvas.width / boundingBox.width),
            y: mouseY - boundingBox.top * (canvas.height / boundingBox.height)
        };
    }

    private drawSpritesheet = () => {
        this.drawingContext.drawImage(this.spritesheet, 0, 0);
    }

    private updateReadout = (x: number, y: number) => {
        this.readout.innerText = "(" + x.toFixed(0) + ", " + y.toFixed(0) + ")";
    }
}

