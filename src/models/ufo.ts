/// <reference path="./Circle.ts"/>
/// <reference path="../interfaces/IDrawable.ts"/>
/// <reference path="../interfaces/IEraseable.ts"/>

class Ufo extends Circle implements IDrawable, IEraseable {
    constructor(center: ICoord, radius: number, color: string) {
        super(center, radius, color);
    }
}