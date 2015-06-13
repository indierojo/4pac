/// <reference path="../engine/Sprite.ts"/>

interface IBehavior {
    execute(sprite: Sprite, context: CanvasRenderingContext2D, time: number);
}