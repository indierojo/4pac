import { Glyph } from "../engine/Glyph";
import { IBoundary } from "../interfaces/IBoundary";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";

export class Snake extends Glyph implements IDrawable {
    // Todo: Bounds don't really work for snake? Or should we just do head?
    static getBounds(): IBoundary {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }

    head: ICoord;
    width: number;
    length: number;
    private body: ICoord[];
    color: string;
    bearing: ICoord;

    constructor(head: ICoord, width: number, color: string) {
        // Todo: Dimensions, bounds don't make sense.
        super(head, { width, height: width}, Snake.getBounds());
        this.body = [];
        this.width = width;
        this.length = 2;
        this.color = color;
        this.bearing = { x: 1, y: 0 };
    }

    draw(drawingContext: CanvasRenderingContext2D) {
        drawingContext.beginPath();
        drawingContext.lineTo(this.head.x, this.head.y);
        const newBody = [];

        let segmentsDrawn = 0;
        let currentCoord = this.head;
        const body = this.body.reverse();
        while (segmentsDrawn < length) {
            const nextCoord = this.body.pop();
            const dimension = currentCoord.x === nextCoord.x ? `x` : `y`;
            const other = currentCoord.x === nextCoord.x ? `y` : `x`;
            const distanceBetween = nextCoord[dimension] - currentCoord[dimension];
            if (Math.abs(distanceBetween) > length - segmentsDrawn) {
                // the nextCoord is further than the snake's length, draw only up to the
                // remainder
                const dir = distanceBetween >= 0 ? 1 : -1;
                const distanceLeft = length - segmentsDrawn;
                drawingContext.lineTo(nextCoord[dimension] - (dir * distanceLeft), nextCoord[other]);
            } else {
                drawingContext.lineTo(nextCoord.x, nextCoord.y);
            }
            segmentsDrawn += distanceBetween;
            currentCoord = nextCoord;
            newBody.push(nextCoord);
        }
        // we only add points up to the length, this ensures we don't keep extra points
        this.body = newBody;
        drawingContext.fillStyle = this.color;
        drawingContext.fill();
    };

    updateBounds() {
        return Snake.getBounds();
    }
}