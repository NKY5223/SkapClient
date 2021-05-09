function createDoor(x = 0, y = 0, w = 10, h = 10, linkIds = [0]) {
    const door = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        linkIds,
        type: "door"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        door.pos.x = Number(xInput.value)
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        door.pos.y = Number(yInput.value)
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        door.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        door.size.y = hInput.value = Math.max(hInput.value, 0);
    });


    door.element = createFolder("Door Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createNumberArrayProperty("Links", linkIds, linkIds => door.linkIds = linkIds)
    ]);
    door.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return door;
}