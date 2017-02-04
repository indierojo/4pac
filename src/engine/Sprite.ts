import { IBehavior } from "../interfaces/IBehavior";
import { IDimension } from "../interfaces/IDimension";
import { IPainter } from "../interfaces/IPainter";

export class Sprite {
    name: string;
    top: number;
    left: number;
    dimension: IDimension;
    velocityX: number;
    velocityY: number;
    behaviors: Array<IBehavior>;
    painter: IPainter;
    isVisible: boolean = true;
    isAnimating: boolean = false;

    constructor(name: string, dimensions: IDimension, painter: IPainter, behaviors?: Array<IBehavior>) {
        this.name = name;
        this.dimension = dimensions;
        this.painter = painter;
        this.behaviors = behaviors || [];
    }

    paint(drawingContext: CanvasRenderingContext2D) {
        if (this.painter !== undefined && this.isVisible) {
            this.painter.paint(this, drawingContext);
        }
    }

    update(drawingContext: CanvasRenderingContext2D, time: number) {
        this.behaviors.forEach(b => b.execute(this, drawingContext, time));
    }
}