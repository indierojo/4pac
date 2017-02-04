export interface IKeyboardControlled {
    onKeyDown(ev: KeyboardEvent, handler: Function);
    onKeyUp(ev: KeyboardEvent, handler: Function);
}