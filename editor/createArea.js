function createArea(name, color, opacity, background, w, h) {
    const area = {
        name,
        color,
        background,
        size: [w, h],
        objects: {
            obstacle: [],
            teleporter: [],
            lava: [],
            rotatingLava: [],
            movingLava: [],
            ice: [],
            slime: [],
            button: [],
            switch: [],
            door: [],
            block0: [],
            text: [],
            turret: [],
            block1: [],
            gravityZone: [],
            reward: [],
            hatReward: [],
            box: [],
            image0: [],
            image1: []
        }
    };

    const nameInput = document.createElement("input");
    nameInput.value = name;
    nameInput.addEventListener("input", () => {
        area.name = Number(nameInput.value);
    });

    const colorInput = document.createElement("input");
    const opacityInput = document.createElement("input");

    colorInput.value = color;
    colorInput.addEventListener("input", () => {
        area.color = "rgb(" +
            (240 + (parseInt(colorInput.value.slice(1, 3), 16) - 240) * opacityInput.value) + ", " +
            (240 + (parseInt(colorInput.value.slice(3, 5), 16) - 240) * opacityInput.value) + ", " +
            (240 + (parseInt(colorInput.value.slice(5, 7), 16) - 240) * opacityInput.value) + ")";
    });

    opacityInput.value = opacity;
    opacityInput.addEventListener("input", () => {
        opacityInput.value = Math.max(Math.min(opacityInput.value, 1), 0);
        area.color = "rgb(" +
            (240 + (parseInt(colorInput.value.slice(1, 3), 16) - 240) * opacityInput.value) + ", " +
            (240 + (parseInt(colorInput.value.slice(3, 5), 16) - 240) * opacityInput.value) + ", " +
            (240 + (parseInt(colorInput.value.slice(5, 7), 16) - 240) * opacityInput.value) + ")";
    });

    const backgroundInput = document.createElement("input");
    backgroundInput.value = background;
    backgroundInput.addEventListener("input", () => {
        area.background = backgroundInput.value;
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        area.size[0] = Number(wInput.value);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        area.size[1] = Number(hInput.value);
    });

    area.element = createFolder("Area Properties", [
        createProperty("name", nameInput, "text"),
        createProperty("color", colorInput, "color"),
        createProperty("opacity", opacityInput, "number"),
        createProperty("background", backgroundInput, "color"),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ])
    ]);
    return area;
}