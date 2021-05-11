function createObstacle(x = 0, y = 0, regionX = -25, regionY = -25, regionW = 50, regionH = 50, bulletRadius = 2, bulletSpeed = 10) {
    const turret = {
        pos: {
            x,
            y
        },
        region: {
            pos: {
                x: regionX,
                y: regionY
            },
            size: {
                x: regionW,
                y: regionH
            },
        },
        
        type: "turret"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        turret.pos.x = Number(xInput.value);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        turret.pos.y = Number(yInput.value);
    });

    const regionXInput = document.createElement("input");
    regionXInput.value = regionX;
    regionXInput.addEventListener("input", () => {
        turret.pos.x = Number(regionXInput.value);
    });

    const regionYInput = document.createElement("input");
    regionYInput.value = regionY;
    regionYInput.addEventListener("input", () => {
        turret.pos.y = Number(regionYInput.value)
    });

    const regionWInput = document.createElement("input");
    regionWInput.value = regionW;
    regionWInput.addEventListener("input", () => {
        turret.size.x = regionWInput.value = Math.max(regionWInput.value, 0);
    });

    const regionHInput = document.createElement("input");
    regionHInput.value = regionH;
    regionHInput.addEventListener("input", () => {
        turret.size.y = regionHInput.value = Math.max(regionHInput.value, 0);
    });


    turret.element = createFolder("Turret Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Region", [
            createFolder("Position", [
                createProperty("x", regionXInput, "number"),
                createProperty("y", regionYInput, "number")
            ]),
            createFolder("Size", [
                createProperty("width", regionWInput, "number"),
                createProperty("height", regionHInput, "number")
            ])
        ])
    ]);
    turret.inputs = {
        x: xInput,
        y: yInput,
        rx: regionXInput,
        ry: regionYInput,
        rw: regionWInput,
        rh: regionHInput
    };

    return turret;
}