function createTurret(x = 0, y = 0, regionX = x - 25, regionY = y - 25, regionW = 50, regionH = 50, radius = 2, speed = 10, shootingSpeed = 0.1, overHeat = 4, coolDownTime = 4) {
    const turret = {
        pos: {
            x,
            y
        },
        size: {
            x: 6,
            y: 6
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
            type: "turretRegion"
        },
        radius,
        speed,
        shootingSpeed,
        overHeat,
        coolDownTime,
        type: "turret"
    };
    turret.region.turret = turret;

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
        turret.region.pos.x = Number(regionXInput.value);
    });

    const regionYInput = document.createElement("input");
    regionYInput.value = regionY;
    regionYInput.addEventListener("input", () => {
        turret.region.pos.y = Number(regionYInput.value)
    });

    const regionWInput = document.createElement("input");
    regionWInput.value = regionW;
    regionWInput.addEventListener("input", () => {
        turret.region.size.x = regionWInput.value = Math.max(regionWInput.value, 0);
    });

    const regionHInput = document.createElement("input");
    regionHInput.value = regionH;
    regionHInput.addEventListener("input", () => {
        turret.region.size.y = regionHInput.value = Math.max(regionHInput.value, 0);
    });

    const radiusInput = document.createElement("input");
    radiusInput.value = radius;
    radiusInput.addEventListener("input", () => {
        turret.radius = radiusInput.value = Math.max(radiusInput.value, 0);
    });

    const speedInput = document.createElement("input");
    speedInput.value = speed;
    speedInput.addEventListener("input", () => {
        turret.speed = Number(speedInput.value);
    });

    const shootingSpeedInput = document.createElement("input");
    shootingSpeedInput.value = shootingSpeed;
    shootingSpeedInput.addEventListener("input", () => {
        turret.shootingSpeed = shootingSpeedInput.value = Math.max(shootingSpeedInput.value, 0);
    });

    const overHeatInput = document.createElement("input");
    overHeatInput.value = overHeat;
    overHeatInput.addEventListener("input", () => {
        turret.overHeat = overHeatInput.value = Math.max(overHeatInput.value, 0);
    });

    const coolDownTimeInput = document.createElement("input");
    coolDownTimeInput.value = coolDownTime;
    coolDownTimeInput.addEventListener("input", () => {
        turret.coolDownTime = coolDownTimeInput.value = Math.max(coolDownTimeInput.value, 0);
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
        ]),
        createProperty("radius", radiusInput, "number"),
        createProperty("speed", speedInput, "number"),
        createProperty("shootingSpeed", shootingSpeedInput, "number"),
        createProperty("overHeat", overHeatInput, "number"),
        createProperty("coolDownTime", coolDownTimeInput, "number"),
    ]);
    turret.inputs = {
        x: xInput,
        y: yInput,
        rX: regionXInput,
        rY: regionYInput,
        rW: regionWInput,
        rH: regionHInput
    };

    return turret;
}