function createLava(x = 0, y = 0, w = 10, h = 10) {
    const lava = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        type: "lava"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        lava.pos.x = Number(xInput.value)
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        lava.pos.y = Number(yInput.value)
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        lava.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        lava.size.y = hInput.value = Math.max(hInput.value, 0);
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