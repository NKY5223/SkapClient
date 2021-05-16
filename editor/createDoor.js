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
        door.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        door.pos.y = Number(yInput.value);
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

    // Link Ids
    function update() {
        door.linkIds = Array.from(linkIdsEl.children[1].children).map(property => Number(property.children[0].children[1].value));
    }
    function createLinkId(num) {
        const input = document.createElement("input");
        input.value = num;
        input.addEventListener("input", update);
        const property = createProperty("", input, "number");
        property.children[0].classList.add("counter");
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(property.firstChild);
        wrapper.appendChild(property.firstChild);
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.addEventListener("click", () => {
            property.remove();
            update();
        });

        property.appendChild(wrapper);
        property.appendChild(remove);

        return property;
    }
    const linkIdsEl = createFolder("Links", linkIds.map(createLinkId));
    const addBtn = document.createElement("button");
    linkIdsEl.classList.add("array");
    addBtn.classList.add("add");
    addBtn.addEventListener("click", () => {
        linkIdsEl.children[1].appendChild(createLinkId(0));
        update();
    });
    linkIdsEl.appendChild(addBtn);

    door.element = createFolder("Door Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        linkIdsEl
    ]);
    door.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return door;
}