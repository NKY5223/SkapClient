/**
 * @typedef Teleporter
 * @property {VectorLike} pos
 * @property {VectorLike} size
 * @property {Direction} dir
 * @property {number} id
 * @property {string} targetArea
 * @property {number} targetId
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
        id: 0,
        targetArea: "Home",
        targetId: 0,
        dir: 0,
        type: "teleporter"
    }

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        teleporter.pos.x = xInput.value = Math.max(xInput.value, 0);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        teleporter.pos.y = yInput.value = Math.max(yInput.value, 0);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        teleporter.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        teleporter.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    const targetAreaInput = document.createElement("input");
    targetAreaInput.value = "Home";
    targetAreaInput.addEventListener("input", () => {
        teleporter.targetArea = targetAreaInput.value;
    });

    const idInput = document.createElement("input");
    idInput.value = 0;
    idInput.addEventListener("input", () => {
        teleporter.id = Math.max(idInput.value, 0);
    });

    const targetIdInput = document.createElement("input");
    targetIdInput.value = 0;
    targetIdInput.addEventListener("input", () => {
        teleporter.targetId = Math.max(targetIdInput.value, 0);
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
        createProperty("direction", null, "cardinal", dir => {
            teleporter.dir = (dir + 2) % 4;
        }),
        createProperty("targetArea", targetAreaInput, "text"),
        createProperty("id", idInput, "number"),
        createProperty("targetID", targetIdInput, "number")
    ]);
    teleporter.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return teleporter;
}