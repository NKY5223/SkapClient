function createMovingObject(w = 10, h = 10, objectType = "lava", points = [{ x: 0, y: 0, vel: 20 }]) {
    const movingObj = {
        pos: {
            get x() {
                return movingObj.points[0].x - movingObj.size.x / 2;
            },
            set x(to) {
                movingObj.points[0].x = to + movingObj.size.x / 2;
            },
            get y() {
                return movingObj.points[0].y - movingObj.size.y / 2;
            },
            set y(to) {
                movingObj.points[0].y = to + movingObj.size.y / 2;
            }
        },
        size: {
            get x() {
                return movingObj._size.x;
            },
            set x(to) {
                movingObj.points[0].x += -(movingObj._size.x - (movingObj._size.x = to)) / 2;
            },
            get y() {
                return movingObj._size.y;
            },
            set y(to) {
                movingObj.points[0].y += -(movingObj._size.y - (movingObj._size.y = to)) / 2;
            }
        },
        _size: {
            x: w,
            y: h
        },
        objectType,
        /** @type {MovObjPoint[]} */
        points: [],
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

    function createPoint(x = 0, y = 0, vel = 20) {
        const point = {
            x,
            y,
            vel
        }

        const xInput = document.createElement("input");
        xInput.value = x;
        xInput.addEventListener("input", () => {
            point.x = Number(xInput.value);
        });

        const yInput = document.createElement("input");
        yInput.value = y;
        yInput.addEventListener("input", () => {
            point.y = Number(yInput.value);
        });

        const velInput = document.createElement("input");
        velInput.value = vel;
        velInput.addEventListener("input", () => {
            point.vel = Number(velInput.value);
        });

        li = createFolder("", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number"),
            createProperty("vel", velInput, "number")
        ]);
        li.children[0].classList.add("counter");

        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.addEventListener("click", e => {
            if (movingObj.points.length > 1) {
                movingObj.points.splice(movingObj.points.indexOf(point), 1);

                setTimeout(() => li.remove(), 5);
            } else if (movingObj.points.length) {
                movingObj.points.splice(movingObj.points.indexOf(point), 1);

                setTimeout(() => li.remove(), 5);
                pointsEl.classList.add("min");
            }
            e.stopPropagation();
        });
        li.children[0].appendChild(remove);
        point.element = li;
        point.inputs = {
            x: xInput,
            y: yInput,
            vel: velInput
        };
        return point;
    }
    const pointsEl = createFolder("Points", points.map(p => {
        const point = createPoint(p.x, p.y, p.vel);
        movingObj.points.push(point);
        return point.element;
    }));
    if (points.length < 2) pointsEl.classList.add("min");

    const addBtn = document.createElement("button");
    pointsEl.classList.add("array");
    addBtn.classList.add("add");
    addBtn.addEventListener("click", () => {
        let point = createPoint(movingObj.points[0].x, movingObj.points[0].y, movingObj.points[0].vel);
        movingObj.points.push(point);
        pointsEl.children[1].appendChild(point.element);
        pointsEl.classList.remove("min");
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
        x: {
            set value(_to) {
                movingObj.points[0].inputs.x.value = movingObj.points[0].x;
            }
        },
        y: {
            set value(_to) {
                movingObj.points[0].inputs.y.value = movingObj.points[0].y;
            }
        },
        w: wInput,
        h: hInput
    };

    return movingObj;
}