/**
 * @typedef Lava
 * @property {VectorLike} pos
 * @property {VectorLike} size
 * @property {{x: HTMLInputElement, y: HTMLInputElement, w: HTMLInputElement, h: HTMLInputElement}} inputs
 * @property {HTMLLIElement} element
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @returns {Lava}
 */
 function createLava(x, y, w, h) {
    const lava = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        }
    }

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.type = "number";
    xInput.addEventListener("input", () => {
        lava.pos.x = Number(xInput.value = Math.max(xInput.value, 0));
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.type = "number";
    yInput.addEventListener("input", () => {
        lava.pos.y = Number(yInput.value = Math.max(yInput.value, 0));
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.type = "number";
    wInput.addEventListener("input", () => {
        lava.size.x = Number(wInput.value = Math.max(wInput.value, 0));
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.type = "number";
    hInput.addEventListener("input", () => {
        lava.size.y = Number(hInput.value = Math.max(hInput.value, 0));
    });


    lava.element = createFolder("Lava Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ])
    ]);
    lava.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return lava;
}