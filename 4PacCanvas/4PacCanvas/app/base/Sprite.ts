class Sprite {
    name: string;
    top: number;
    left: number;
    dimension: IDimension;
    velocityX: number;
    velocityY: number;
    behaviors: Array<IBehavior>;
    painter: IPainter;
    isVisible: boolean;
    isAnimating: boolean;

    constructor(name: string, painter: IPainter, behaviors: Array<IBehavior>) {
        this.name = name;
        this.painter = painter;
        this.behaviors = behaviors || [];
        this.isAnimating = false;
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