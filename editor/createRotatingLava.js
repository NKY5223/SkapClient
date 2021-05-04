function createRotatingLava(x = 0, y = 0, w = 10, h = 10, pointX = x, pointY = y, startAngle = 0, speed = 180) {
    /** @type {RotatingLava} */
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
            y: pointY,
            type: "rotLavaPoint"
        },
        startAngle,
        speed,
        type: "rotatingLava"
    };
    rotLava.point.rotLava = rotLava;

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
        rotLava.point.x = Number(pointXInput.value);
    });

    const pointYInput = document.createElement("input");
    pointYInput.value = pointX;
    pointYInput.addEventListener("input", () => {
        rotLava.point.y = Number(pointYInput.value);
    });

    const startAngleInput = document.createElement("input");

    const speedInput = document.createElement("input");
    speedInput.value = speed;
    speedInput.addEventListener("input", () => {
        rotLava.speed = Number(speedInput.value);
    });

    rotLava.element = createFolder("Rotating Lava Properties", [
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
        createProperty("startAngle", startAngleInput, "direction", {
            value: startAngle,
            event: angle => rotLava.startAngle = angle
        }),
        createProperty("speed <small>(degrees/s)</small>", speedInput, "number")
    ]);
    rotLava.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput,
        pX: pointXInput,
        pY: pointYInput
    };

    return rotLava;
}