/**
 * @typedef SkapText
 * @property {VectorLike} pos
 * @property {{x: 5, y: 5}} size
 * @property {string} text
 * @property {{x: HTMLInputElement, y: HTMLInputElement, text: HTMLInputElement}} inputs
 * @property {HTMLLIElement} element
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {string} content 
 * @returns {SkapText}
 */
function createText(x = 0, y = 0, content = "Text") {
    const text = {
        pos: {
            x,
            y
        },
        size: {
            x: 5,
            y: 5
        },
        text: content,
        type: "text"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        text.pos.x = xInput.value = Math.max(xInput.value, 0);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        text.pos.y = yInput.value = Math.max(yInput.value, 0);
    });

    const textInput = document.createElement("input");
    textInput.value = content;
    textInput.addEventListener("input", () => {
        text.text = textInput.value;
    });


    text.element = createFolder("Text Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createProperty("text", textInput, "text")
    ]);
    text.inputs = {
        x: xInput,
        y: yInput,
        text: textInput
    };

    return text;
}