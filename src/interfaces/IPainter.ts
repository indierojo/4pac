/// <reference path="../engine/Sprite.ts"/>

interface IPainter {
    paint(sprite: Sprite, drawingContext: CanvasRenderingContext2D);
}