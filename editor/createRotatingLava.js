function createRotatingLava(x = 0, y = 0, w = 10, h = 10, startAngle = 0, speed = 180) {
    const rotLava = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        point: {
            x: pointX,
            y: pointY
        },
        startAngle,
        speed,
        type: "rotatingLava"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        rotLava.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        rotLava.pos.y = Number(yInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        rotLava.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        rotLava.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    const pointXInput = document.createElement("input");
    pointXInput.value = x;
    pointXInput.addEventListener("input", () => {
        rotLava.pos.x = pointXInput.value = Math.max(pointXInput.value, 0);
    });

    const pointYInput = document.createElement("input");
    pointYInput.value = y;
    pointYInput.addEventListener("input", () => {
        rotLava.pos.y = pointYInput.value = Math.max(pointYInput.value, 0);
    });

    const startAngleInput = document.createElement("input");

    rotLava.element = createFolder("Lava Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createFolder("Point", [
            createProperty("x", pointXInput, "number"),
            createProperty("y", pointYInput, "number")
        ]),
        createProperty("y", pointYInput, "direction", {
            value: startAngle,
            event: angle => rotLava.startAngle = angle
        })
    ]);
    rotLava.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return rotLava;
}