class KeyboardInputHandler {
    downBehaviors: { [keyCode: string]: Array<Function> };
    upBehaviors: { [keyCode: string]: Array<Function> };

    constructor() {
        this.downBehaviors = {};
        this.upBehaviors = {};
    }

    updateKeyDownHandlers() {
        window.onkeydown = ev => {
        
        }
    }

    setKeyUpHandlers() {
        window.onkeydown = ev => {
        
        }
    }

    registerKeyDown(keyCode:number, handleFunction:Function) {
        if(this.downBehaviors[keyCode]) {
            this.downBehaviors[keyCode].push(handleFunction);
        } else {
            this.downBehaviors[keyCode] = [handleFunction];
        }
        this.updateKeyDownHandlers();
    }
}