/// <reference path="../interfaces/IDimension.ts"/>
/// <reference path="../interfaces/IPainter.ts"/>
/// <reference path="../interfaces/IBehavior.ts"/>

class Sprite {
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

    paint(context: CanvasRenderingContext2D) {
        if (this.painter !== undefined && this.isVisible) {
            this.painter.paint(this, context);
        }
    }

    update(context: CanvasRenderingContext2D, time: number) {
        this.behaviors.forEach(b => b.execute(this, context, time));
    }
}