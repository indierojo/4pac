import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";
import { IEraseable } from "../interfaces/IEraseable";

export class Button implements IDrawable, IEraseable {
    private center: ICoord;
    private topLeft: ICoord;
    private width: number;
    private height: number;
    private text: string;
    private isActive: boolean;

    constructor(canvas: HTMLCanvasElement, center: ICoord, width: number, height: number, text: string, onClick: (evt: MouseEvent) => void) {
        this.center = center;
        this.width = width;
        this.height = height;
        this.text = text;
        this.topLeft = {
            x: center.x - (width / 2),
            y: center.y - (height / 2)
        };

        const drawingContext = canvas.getContext("2d");
        canvas.addEventListener("click", (event) => {
            if (!this.isActive) {
                return;
            }

            const clickPosition = this.getMousePosition(canvas, event);
            if (this.isInsideButton(clickPosition)) {
                onClick(event);
            }
        }, false);
    }

    setActive(isActive: boolean) {
        this.isActive = isActive;
    }

    draw(drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.rect(this.topLeft.x, this.topLeft.y, this.width, this.height);
        drawingContext.fillStyle = "#FFFFFF";
        drawingContext.fillStyle = "rgba(225,225,225,0.5)";
        drawingContext.fill();
        drawingContext.lineWidth = 2;
        drawingContext.strokeStyle = "#000000";
        drawingContext.stroke();
        drawingContext.closePath();
        drawingContext.fillStyle = "#000000";
        drawingContext.fillText(this.text, this.topLeft.x + this.width / 3, this.topLeft.y + this.height / 2, this.width);
        this.setActive(true);
    }

    erase = function(drawingContext: CanvasRenderingContext2D) {
        drawingContext.clearRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
    };

    private getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    private isInsideButton(clickPosition: ICoord) {
        return clickPosition.x > this.topLeft.x
            && clickPosition.x < this.topLeft.x + this.width
            && clickPosition.y < this.topLeft.y + this.height
            && clickPosition.y > this.topLeft.y;
    }
}