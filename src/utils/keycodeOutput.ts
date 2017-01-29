const outputSection = document.getElementById("readout");

window.onkeydown = e => {
    const keyCode = e.keyCode.toString();
    clearElementsWithCode(keyCode);
    addElementWithCode(keyCode);
};

window.onkeyup = e => {
    const keyCode = e.keyCode.toString();
    clearElementsWithCode(keyCode);
};

function clearElementsWithCode(keyCode) {
    const elementsToRemove = document.getElementsByClassName(keyCode);

    Array.prototype.forEach.call(elementsToRemove, el => el.remove());
}

function addElementWithCode(keyCode) {
    const keyNode = document.createElement("div");
    keyNode.className = keyCode;
    const textNode = document.createTextNode(keyCode);
    keyNode.appendChild(textNode);
    outputSection.appendChild(keyNode);
}