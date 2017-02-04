import { Sprite } from "../engine/Sprite";

export interface IPainter {
    paint(sprite: Sprite, drawingContext: CanvasRenderingContext2D);
}