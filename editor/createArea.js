/**
 * @typedef {[number, number, number]} ColorArr
 * @typedef Area
 * @property {string} name
 * @property {string} color
 * @property {ColorArr} colorArr
 * @property {string} background
 * @property {ColorArr} backgroundArr
 * @property {number} opacity
 * @property {[number, number]} size
 * @property {Object} objects
 * @property {Obstacle[]} objects.obstacle
 * @property {Lava[]} objects.lava
 * @property {Slime[]} objects.slime
 * 
 * @param {string} name 
 * @param {ColorArr} color 
 * @param {number} opacity 
 * @param {ColorArr} background 
 * @param {number} w 
 * @param {number} h 
 */
function createArea(name, color, opacity, background, w, h) {
    const area = {
        name,
        color: "rgb(" +
            (240 + (color[0] - 240) * opacity) + ", " +
            (240 + (color[1] - 240) * opacity) + ", " +
            (240 + (color[2] - 240) * opacity) + ")",
        colorArr: color,
        background: `rgb(${background[0]}, ${background[1]}, ${background[2]})`,
        backgroundArr: background,
        opacity,
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

    colorInput.value = "#" + fillZeros(color[0].toString(16)) + fillZeros(color[1].toString(16)) + fillZeros(color[2].toString(16));
    console.log()
    colorInput.addEventListener("input", () => {
        let r = parseInt(colorInput.value.slice(1, 3), 16);
        let g = parseInt(colorInput.value.slice(3, 5), 16);
        let b = parseInt(colorInput.value.slice(5, 7), 16);
        area.colorArr = [r, g, b];
        area.color = "rgb(" +
            (240 + (r - 240) * opacityInput.value) + ", " +
            (240 + (g - 240) * opacityInput.value) + ", " +
            (240 + (b - 240) * opacityInput.value) + ")";
        document.documentElement.style.setProperty("--obstacle", `rgba(${r}, ${g}, ${b}, ${area.opacity}`);
    });

    opacityInput.value = opacity;
    opacityInput.step = 0.05;
    opacityInput.addEventListener("input", () => {
        opacityInput.value = Math.max(Math.min(opacityInput.value, 1), 0);
        let r = parseInt(colorInput.value.slice(1, 3), 16);
        let g = parseInt(colorInput.value.slice(3, 5), 16);
        let b = parseInt(colorInput.value.slice(5, 7), 16);
        area.opacity = opacityInput.value;
        area.color = "rgb(" +
            (240 + (r - 240) * opacityInput.value) + ", " +
            (240 + (g - 240) * opacityInput.value) + ", " +
            (240 + (b - 240) * opacityInput.value) + ")";
        document.documentElement.style.setProperty("--obstacle", `rgba(${r}, ${g}, ${b}, ${area.opacity}`);
    });

    const backgroundInput = document.createElement("input");
    backgroundInput.value = "#" + fillZeros(background[0].toString(16)) + fillZeros(background[1].toString(16)) + fillZeros(background[2].toString(16));
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
function fillZeros(str = "0", digits = 2, filler = "0") {
    return filler.repeat(digits - str.length) + str;
}