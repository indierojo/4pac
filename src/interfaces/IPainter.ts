/// <reference path="../engine/Sprite.ts"/>

interface IPainter {
    paint(sprite: Sprite, canvasRenderingContext2D: CanvasRenderingContext2D);
}