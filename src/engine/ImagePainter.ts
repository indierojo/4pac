import { IPainter } from "../interfaces/IPainter";
import { Sprite } from "../engine/Sprite";

export class ImagePainter implements IPainter {
    image: HTMLImageElement;
    imageUrl: string;

    constructor(imageUrl: string) {
        this.image = new Image();
        this.imageUrl = imageUrl;
    }

    paint(sprite: Sprite, drawingContext: CanvasRenderingContext2D) {
        if (this.image.complete) {
            drawingContext.drawImage(this.image, sprite.left, sprite.top, sprite.dimension.width, sprite.dimension.height);
        }
    }
}