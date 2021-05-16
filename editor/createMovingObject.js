function createMovingObject(w = 10, h = 10, objectType = "lava", points = [{ x: 0, y: 0, vel: 20 }]) {
    const movingObj = {
        size: {
            x: w,
            y: h
        },
        objectType,
        points,
        type: "movingObject"
    };

    // Create inputs/labels

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        movingObj.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        movingObj.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    function update() {
        movingObj.points = Array.from(pointsEl.children[1].children).map(el => ({
            x: Number(el.children[1].children[0].children[1].value),
            y: Number(el.children[1].children[1].children[1].value),
            vel: Number(el.children[1].children[2].children[1].value)
        }));
    }
    function createPoint(point) {
        const xInput = document.createElement("input");
        xInput.value = point.x;
        xInput.addEventListener("input", update);

        const yInput = document.createElement("input");
        yInput.value = point.y;
        yInput.addEventListener("input", update);

        const velInput = document.createElement("input");
        velInput.value = point.vel;
        velInput.addEventListener("input", update);

        const property = createFolder("", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number"),
            createProperty("vel", velInput, "number")
        ]);
        property.children[0].classList.add("counter");
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.addEventListener("click", () => {
            if (pointsEl.children[1].childElementCount > 2) property.remove();
            else if (pointsEl.children[1].childElementCount > 1) {
                property.remove();
                pointsEl.classList.add("min");
            }
        });
        property.children[0].appendChild(remove);
        return property;
    }
    const pointsEl = createFolder("Points", points.map(createPoint));
    if (points.length < 2) pointsEl.classList.add("min");
    const addBtn = document.createElement("button");
    pointsEl.classList.add("array");
    addBtn.classList.add("add");
    addBtn.addEventListener("click", () => {
        pointsEl.children[1].appendChild(createPoint({ x: movingObj.points[0]?.x ?? 0, y: movingObj.points[0]?.y ?? 0, vel: movingObj.points[0]?.vel ?? 20 }));
        pointsEl.classList.remove("min");
        update();
    });
    pointsEl.appendChild(addBtn);

    movingObj.element = createFolder("Moving Object Properties", [
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createProperty("type", null, "select", {
            value: objectType,
            event: e => movingObj.objectType = e,
            selectOptions: [
                ["Obstacle", "obstacle"],
                ["Lava", "lava"],
                ["Slime", "slime"],
                ["Ice", "ice"]
            ], 
            selectType: "text"
        }),
        pointsEl
    ]);

    movingObj.inputs = {
        x: pointsEl.children[1].children[0].children[1].children[0].children[1],
        y: pointsEl.children[1].children[0].children[1].children[1].children[1],
        w: wInput,
        h: hInput
    };

    return movingObj;
}