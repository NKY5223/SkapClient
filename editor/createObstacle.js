/**
 * @typedef Obstacle
 * @property {VectorLike} pos
 * @property {VectorLike} size
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
        obstacle.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.type = "number";
    yInput.addEventListener("input", () => {
        obstacle.pos.y = Number(yInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.type = "number";
    wInput.addEventListener("input", () => {
        obstacle.size.x = Number(wInput.value);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.type = "number";
    hInput.addEventListener("input", () => {
        obstacle.size.y = Number(hInput.value);
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

    return obstacle;
}