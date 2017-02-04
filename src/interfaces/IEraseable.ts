import { Sprite } from "../engine/Sprite"

export interface IEraseable {
    erase(drawingContext: CanvasRenderingContext2D);
}