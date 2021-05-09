function createButton(x = 0, y = 0, w = 10, h = 20, dir = 0, id = 0, time = 5) {
    const button = {
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
        time,
        type: "button"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        button.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        button.pos.y = Number(yInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        button.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        button.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    const idInput = document.createElement("input");
    idInput.value = id;
    idInput.addEventListener("input", () => {
        button.id = idInput.value = Math.max(idInput.value, 0);
    });

    const timeInput = document.createElement("input");
    timeInput.value = time;
    timeInput.addEventListener("input", () => {
        button.time = timeInput.value = Math.max(timeInput.value, 0);
    });

    button.element = createFolder("Button Properties", [
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
                button.dir = (dir + 2) % 4;
            }
        }),
        createProperty("id", idInput, "number"),
        createProperty("time", timeInput, "number")
    ]);
    button.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return button;
}