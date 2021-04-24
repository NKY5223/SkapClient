/**
 * @typedef Teleporter
 * @property {VectorLike} pos
 * @property {VectorLike} size
 * @property {Direction} dir
 * @property {{x: HTMLInputElement, y: HTMLInputElement, w: HTMLInputElement, h: HTMLInputElement}} inputs
 * @property {HTMLLIElement} element
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @returns {Teleporter}
 */
 function createTeleporter(x = 0, y = 0, w = 10, h = 20) {
    const teleporter = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        dir: 0,
        type: "teleporter"
    }

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.type = "number";
    xInput.addEventListener("input", () => {
        teleporter.pos.x = Number(xInput.value = Math.max(xInput.value, 0));
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.type = "number";
    yInput.addEventListener("input", () => {
        teleporter.pos.y = Number(yInput.value = Math.max(yInput.value, 0));
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.type = "number";
    wInput.addEventListener("input", () => {
        teleporter.size.x = Number(wInput.value = Math.max(wInput.value, 0));
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.type = "number";
    hInput.addEventListener("input", () => {
        teleporter.size.y = Number(hInput.value = Math.max(hInput.value, 0));
    });


    teleporter.element = createFolder("Teleporter Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createProperty("direction", null, "direction", dir => {
            teleporter.dir = (dir + 2) % 4;
        })
    ]);
    teleporter.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return teleporter;
}