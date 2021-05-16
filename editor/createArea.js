function createArea(name = "New Area", color = [0, 10, 87], opacity = 0.8, background = [230, 230, 230], w = 100, h = 100, gravity = 1) {
    const area = {
        name,
        color: blend240(color, opacity),
        colorArr: color,
        background: arrtoRGBA(background),
        backgroundArr: background,
        opacity,
        size: [w, h],
        gravity,
        objects: {
            obstacle: [],
            teleporter: [],
            lava: [],
            rotatingLava: [],
            ice: [],
            slime: [],
            button: [],
            switch: [],
            door: [],
            block: [],
            text: [],
            turret: [],
            gravityZone: [],
            reward: [],
            hatReward: [],
            box: [],
            image0: [],
            image1: [],
            spawner: [],
            circularObject: [],
            movingObject: []
        }
    };

    const nameInput = document.createElement("input");
    nameInput.value = name;
    nameInput.addEventListener("input", () => {
        area.name = nameInput.value;
    });

    const colorInput = document.createElement("input");
    const opacityInput = document.createElement("input");

    colorInput.value = arrtoHex(color);
    colorInput.addEventListener("input", () => {
        area.colorArr = hexToArr(colorInput.value);
        area.color = blend240(area.colorArr, opacity);

        document.documentElement.style.setProperty("--obstacle", `rgba(${area.colorArr.join(",")},${area.opacity}`);
    });

    opacityInput.value = opacity;
    opacityInput.step = 0.05;
    opacityInput.addEventListener("input", () => {
        opacityInput.value = Math.max(Math.min(opacityInput.value, 1), 0);
        area.opacity = opacityInput.value;
        area.color = blend240(area.colorArr, area.opacity);

        document.documentElement.style.setProperty("--obstacle", `rgba(${area.colorArr.join(",")},${area.opacity}`);
    });

    const backgroundInput = document.createElement("input");
    backgroundInput.value = arrtoHex(background);
    backgroundInput.addEventListener("input", () => {
        area.background = backgroundInput.value;
        area.backgroundArr = hexToArr(backgroundInput.value);
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

    const gravInput = document.createElement("input");
    gravInput.value = gravity;
    gravInput.step = 0.05;
    gravInput.addEventListener("input", () => {
        area.gravity = gravInput.value;
    });

    area.element = createFolder("Area Properties", [
        createProperty("name", nameInput, "text"),
        createProperty("color", colorInput, "color"),
        createProperty("opacity", opacityInput, "number"),
        createProperty("background", backgroundInput, "color"),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createProperty("gravity", gravInput, "number")
    ]);
    area.inputs = {
        name: nameInput,
        w: wInput,
        h: hInput
    }
    return area;
}