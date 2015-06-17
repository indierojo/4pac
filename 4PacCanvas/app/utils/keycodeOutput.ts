var outputSection = document.getElementById('readout');

window.onkeydown = e=> {
    var keyCode = e.keyCode.toString();
    clearElementsWithCode(keyCode);
    addElementWithCode(keyCode);
};

window.onkeyup = e => {
    var keyCode = e.keyCode.toString();
    clearElementsWithCode(keyCode);
};

function clearElementsWithCode(keyCode) {
    var elementsToRemove = document.getElementsByClassName(keyCode);

    Array.prototype.forEach.call(elementsToRemove, el => el.remove());
}

function addElementWithCode(keyCode) {
    var keyNode = document.createElement("div");
    keyNode.className = keyCode;
    var textNode = document.createTextNode(keyCode);
    keyNode.appendChild(textNode);
    outputSection.appendChild(keyNode);
}