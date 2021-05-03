/**
 * @typedef Spawner
 * @property {VectorLike} pos
 * @property {VectorLike} size
 * @property {string} enemyType
 * @property {number} number
 * @property {number} speed
 * @property {number} radius
 * @property {{x: HTMLInputElement, y: HTMLInputElement, w: HTMLInputElement, h: HTMLInputElement}} inputs
 * @property {HTMLLIElement} element
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {string} enemyType
 * @returns {Spawner}
 */
function createSpawner(x = 0, y = 0, w = 10, h = 10, enemyType = "normal", number = 10, speed = 10, radius = 5) {
    const spawner = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        enemyType,
        number,
        speed,
        radius,
        type: "spawner"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        spawner.pos.x = xInput.value = Math.max(xInput.value, 0);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        spawner.pos.y = yInput.value = Math.max(yInput.value, 0);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        spawner.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        spawner.size.y = hInput.value = Math.max(hInput.value, 0);
    });

    const numberInput = document.createElement("input");
    numberInput.value = number;
    numberInput.addEventListener("input", () => {
        spawner.number = numberInput.value = Math.floor(Math.min(Math.max(numberInput.value, 0), 200));
    });

    const speedInput = document.createElement("input");
    speedInput.value = speed;
    speedInput.addEventListener("input", () => {
        spawner.speed = speedInput.value = Math.max(speedInput.value, 0);
    });

    const radiusInput = document.createElement("input");
    radiusInput.value = radius;
    radiusInput.addEventListener("input", () => {
        spawner.radius = radiusInput.value = Math.max(radiusInput.value, 0);
    });


    spawner.element = createFolder("Spawner Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createFolder("Enemy Properties", [
            createProperty("type", null, "select", {
                value: enemyType,
                selectType: "text",
                selectOptions: [
                    ["Normal", "normal"],
                    ["Reverse", "reverse"],
                    ["Spike", "spike"],
                    ["Bouncer", "bouncer"],
                    ["Rotating", "rotating"],
                    ["Following", "following"],
                    ["Bomb", "bomb"],
                    ["Monster", "monster"],
                    ["Taker", "taker"],
                    ["Contractor", "contractor"],
                    ["Immune", "immune"],
                    ["Expander", "expander"],
                    ["Wavy", "wavy"],
                    ["Snek", "snek"],
                    ["Daddy Snek", "daddySnek"],
                    ["Baby Snek", "babySnek"],
                    ["Stutter", "stutter"],
                    ["Shooter", "shooter"],
                    ["Freezer", "freezer"],
                    ["Mega Bouncer", "megaBouncer"],
                    ["Gravity (Left)", "gravityLeft"],
                    ["Gravity (Up)", "gravityUp"],
                    ["Gravity (Right)", "gravityRight"]
                ],
                event: e => {
                    spawner.enemyType = e;
                }
            }),
            createProperty("count", numberInput, "number"),
            createProperty("speed", speedInput, "number"),
            createProperty("radius", radiusInput, "number")
        ])
    ]);
    spawner.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput
    };

    return spawner;
}