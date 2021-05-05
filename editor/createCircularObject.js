function createCircularObject(x = 0, y = 0, radius = 10, type = "lava") {
    const circularObject = {
        pos: {
            x,
            y
        },
        size: {
            x: 2 * radius,
            y: 2 * radius
        },
        radius: radius,
        objectType: type,
        type: "circularObject"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        circularObject.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        circularObject.pos.y = Number(yInput.value);
    });

    const rInput = document.createElement("input");
    rInput.value = radius;
    rInput.addEventListener("input", () => {
        circularObject.radius = rInput.value = Math.max(rInput.value, 0);
        circularObject.size.x = circularObject.size.y = circularObject.radius * 2;
    });


    circularObject.element = createFolder("Circular Object Properties", [
        createProperty("type", null, "select", {
            value: type,
            event: e => circularObject.objectType = e,
            selectOptions: [
                ["Obstacle", "obstacle"],
                ["Lava", "lava"],
                ["Slime", "slime"],
                ["Ice", "ice"]
            ], 
            selectType: "text"
        }),
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createProperty("radius", rInput, "number")
    ]);
    circularObject.inputs = {
        x: xInput,
        y: yInput,
        radius: rInput
    };

    return circularObject;
}