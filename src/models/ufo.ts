import { Circle } from "./circle";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";
import { IEraseable } from "../interfaces/IEraseable";

export class Ufo extends Circle implements IDrawable, IEraseable {
    public isDestroyed: boolean;
    constructor(center: ICoord, radius: number, color: string) {
        super(center, radius, color);
    }
}