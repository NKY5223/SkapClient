function createTeleporter(x = 0, y = 0, w = 10, h = 20, dir = 0, id = 0, targetArea = "Home", targetId = 0) {
    const teleporter = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        id,
        targetArea,
        targetId,
        dir,
        type: "teleporter"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        teleporter.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        teleporter.pos.y = Number(yInput.value);
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
    targetAreaInput.value = targetArea;
    targetAreaInput.addEventListener("input", () => {
        teleporter.targetArea = targetAreaInput.value;
    });

    const idInput = document.createElement("input");
    idInput.value = id;
    idInput.addEventListener("input", () => {
        teleporter.id = idInput.value = Math.max(idInput.value, 0);
    });

    const targetIdInput = document.createElement("input");
    targetIdInput.value = targetId;
    targetIdInput.addEventListener("input", () => {
        teleporter.targetId = targetIdInput.value = Math.max(targetIdInput.value, 0);
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
        createProperty("direction", null, "cardinal", {
            value: dir,
            event: dir => {
                teleporter.dir = (dir + 2) % 4;
                console.log(dir, teleporter.dir);
            }
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