export default class KeycodeOutput {
    private outputSection: HTMLElement;

    constructor() {
        this.outputSection = document.getElementById("readout");

        window.onkeydown = e => {
            const keyCode = e.keyCode.toString();
            this.clearElementsWithCode(keyCode);
            this.addElementWithCode(keyCode);
        };

        window.onkeyup = e => {
            const keyCode = e.keyCode.toString();
            this.clearElementsWithCode(keyCode);
        };
    }

    private clearElementsWithCode = (keyCode) => {
        const elementsToRemove = document.getElementsByClassName(keyCode);

        Array.prototype.forEach.call(elementsToRemove, el => el.remove());
    }

    private addElementWithCode = (keyCode) => {
        const keyNode = document.createElement("div");
        keyNode.className = keyCode;
        const textNode = document.createTextNode(keyCode);
        keyNode.appendChild(textNode);
        this.outputSection.appendChild(keyNode);
    }
}
