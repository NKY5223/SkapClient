function createSwitch(x = 0, y = 0, w = 10, h = 20, dir = 0, id = 0) {
    const Switch = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        id,
        dir,
        type: "switch"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        Switch.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        Switch.pos.y = Number(yInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        Switch.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        Switch.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    const idInput = document.createElement("input");
    idInput.value = id;
    idInput.addEventListener("input", () => {
        Switch.id = idInput.value = Math.max(idInput.value, 0);
    });

    Switch.element = createFolder("Teleporter Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createProperty("direction", null, "cardinal", {
            value: dir,
            event: dir => {
                Switch.dir = dir % 4;
            }
        }),
        createProperty("id", idInput, "number")
    ]);
    Switch.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return Switch;
}