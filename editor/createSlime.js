function createSlime(x = 0, y = 0, w = 10, h = 10) {
    const slime = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        type: "slime"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        slime.pos.x = xInput.value = Math.max(xInput.value, 0);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        slime.pos.y = yInput.value = Math.max(yInput.value, 0);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        slime.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        slime.size.y = hInput.value = Math.max(hInput.value, 0);
    });


    slime.element = createFolder("Slime Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ])
    ]);
    slime.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return slime;
}