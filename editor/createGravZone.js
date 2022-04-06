function createGravZone(x = 0, y = 0, w = 10, h = 20, dir = 2) {
    const gravZone = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        dir,
        type: "gravityZone"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        gravZone.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        gravZone.pos.y = Number(yInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        gravZone.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        gravZone.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    const dirInput = document.createElement("input");
    dirInput.value = dir;
    dirInput.addEventListener("input", () => {
        gravZone.dir = dir;
    });


    gravZone.element = createFolder("Gravity Zone Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        ((dir % 1) === 0) ? createProperty("direction", null, "cardinalCenter", {
            event: dir => {
                gravZone.dir = dir;
            },
            value: dir === 4 ? 4 : ((dir + 2) % 4)
        }) : createProperty("direction", dirInput, "number")
    ]);
    gravZone.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return gravZone;
}