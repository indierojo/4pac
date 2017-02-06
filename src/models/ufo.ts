import { Circle } from "./circle";
import { ICoord } from "../interfaces/ICoord";
import { IDrawable } from "../interfaces/IDrawable";
import { IEraseable } from "../interfaces/IEraseable";

export class Ufo extends Circle implements IDrawable, IEraseable {
    readonly origin: ICoord;
    public isFlipped: boolean; // moving forward or backwards
    public isLeftRight: boolean; // travels up/down or left/right
    public isDestroyed: boolean;
    constructor(center: ICoord, radius: number, color: string) {
        super(center, radius, color);
        this.origin = {x: center.x, y: center.y};
        const rand = Math.random();
        const rand2 = Math.random();
        this.isFlipped = rand > .5;
        this.isLeftRight = rand2 > .5;
    }
}