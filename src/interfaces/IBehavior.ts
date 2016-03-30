/// <reference path="../engine/Sprite.ts"/>

interface IBehavior {
    execute(sprite: Sprite, drawingContext: CanvasRenderingContext2D, time: number);
}