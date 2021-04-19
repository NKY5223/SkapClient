/**
 * @typedef Obstacle
 * @property {VectorLike} pos
 * @property {VectorLike} size
 * @property {{x: HTMLInputElement, y: HTMLInputElement, w: HTMLInputElement, h: HTMLInputElement}} inputs
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @returns {Obstacle}
 */
 function createObstacle(x, y, w, h) {
    const obstacle = {
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
        obstacle.pos.x = Number(xInput.value = Math.max(xInput.value, 0));
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.type = "number";
    yInput.addEventListener("input", () => {
        obstacle.pos.y = Number(yInput.value = Math.max(yInput.value, 0));
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.type = "number";
    wInput.addEventListener("input", () => {
        obstacle.size.x = Number(wInput.value = Math.max(wInput.value, 0));
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.type = "number";
    hInput.addEventListener("input", () => {
        obstacle.size.y = Number(hInput.value = Math.max(hInput.value, 0));
    });


    obstacle.element = createFolder("Obstacle Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ])
    ]);
    obstacle.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return obstacle;
}