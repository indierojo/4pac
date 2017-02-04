import { Sprite } from "../engine/Sprite";

export interface IBehavior {
    execute(sprite: Sprite, drawingContext: CanvasRenderingContext2D, time: number);
}