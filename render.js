/**
 * @typedef SkapObject
 * @property {string} id
 * @property {"obstacle" | "lava" | "slime" | "teleporter" | "text" | "door" | "button"} type
 * @property {number} dir
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {Object} size
 * @property {number} size.x
 * @property {number} size.y
 * @property {string} text
 * @property {boolean} opened
 * @property {boolean} pressed
 * @property {0 | 1} layer
 * @property {[number, number, number]} color
 * @property {number} opacity
 * 
 * @typedef SkapEntity
 * @property {"bomb" | "bouncer" | "spike" | "normal"} type
 * bombs/bouncers/normal/spike
 * @property {number} radius
 * @property {number} opacity
 * @property {boolean} phase
 * @property {boolean} exploding FINALLY TYPO                      v 
 * @property {boolean} triggered why can't you merge these two .-. ^
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * rotating >:(
 * @property {number} angle
 * 
 * @typedef Player
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {Object} vel
 * @property {number} vel.x
 * @property {number} vel.y
 * @property {string[]} states
 * @property {number} fuel
 * @property {0 | 1 | 2 | 3} gravDir
 * @property {3 | 2.25} radius
 * @property {string} name
 * @property {[number, number, number]} color
 * @property {string} hat
 */
/**
 * @typedef SkapMap
 * @property {Object} areaSize
 * @property {number} areaSize.x
 * @property {number} areaSize.y
 * @property {[number, number, number]} areaColor
 * @property {[number, number, number, number]} backgroundColor
 * @property {SkapObject[]} objects
 */

/**
 * @param {Object} e
 * @param {Object} e.infos
 * @param {string} e.infos.id
 * @param {number} e.infos.fuel
 * @param {number | null} e.infos.oneCooldown
 * @param {number | null} e.infos.twoCooldown
 * @param {number} e.infos.oneHeat
 * @param {number} e.infos.twoHeat
 * @param {Object<string, Player>} e.players id:Player
 * @param {[string, string, boolean][]} e.playerList
 * @param {SkapEntity[]} e.entities
 */
function render(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineCap = "middle";

    ctx.fillStyle = renderSettings.colors.obstacle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.resetTransform();
    ctx.translate(Math.floor(canvas.width / 2 - camScale * camX), Math.floor(canvas.height / 2 - camScale * camY));

    ctx.fillStyle = parsedMap.background;
    ctx.fillRect(0, 0, Math.floor(map.areaSize.x * camScale), Math.floor(map.areaSize.y * camScale));

    // Camera
    if (freeCam) {
        camX += camSpeed / camScale * (keysDown.has("arrowright") - keysDown.has("arrowleft"));
        camY += camSpeed / camScale * (keysDown.has("arrowdown") - keysDown.has("arrowup"));
    }

    if (!e) {
        e = {
            infos: {
                id: "TEMPORARY_ID",
                fuel: 12,
                oneCooldown: null,
                twoCooldown: null,
                oneHeat: 0,
                twoHeat: 0
            },
            players: {
                "TEMPORARY_ID": {
                    pos: {
                        x: 0,
                        y: 0
                    },
                    vel: {
                        x: 0,
                        y: 0
                    },
                    fuel: 10,
                    states: [],
                    gravDir: 0,
                    radius: 3,
                    name: "TEMPORARY_PLAYER",
                    color: [255, 0, 255],
                    hat: "none"
                }
            },
            playerList: ["DATA_NOT_LOADED", "", true],
            entities: []
        }
    }

    send({
        e: "aim",
        m: [
            (mouse.x - canvas.width / 2) / camScale + camX,
            (mouse.y - canvas.height / 2) / camScale + camY
        ]
    });

    if (renderSettings.render.obstacle) {
        // Render obstacles
        ctx.fillStyle = renderSettings.colors.obstacle;
        for (let obj of parsedMap.obstacle) {
            ctx.fillRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
        }
    }
    if (renderSettings.render.slime) {
        // Render slime
        ctx.fillStyle = renderSettings.colors.slime;
        for (let obj of parsedMap.slime) {
            ctx.fillRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
        }
    }
    if (renderSettings.render.ice) {
        // Render ice
        ctx.fillStyle = renderSettings.colors.ice;
        for (let obj of parsedMap.ice) {
            ctx.fillRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
        }
    }
    if (renderSettings.render.lava) {
        // Render lava
        ctx.fillStyle = renderSettings.colors.lava;
        for (let obj of parsedMap.lava) {
            ctx.fillRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
        }
    }
    if (renderSettings.render.block0) {
        // Render blocks(0)
        ctx.setLineDash([]);
        for (let obj of map.objects.filter(obj => obj.type === "block" && !obj.layer)) {
            ctx.fillStyle = fromColArr(obj.color.concat(obj.opacity));
            ctx.fillRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.floor(obj.size.x * camScale), Math.floor(obj.size.y * camScale));
        }
    }
    // Render the ****ing teleporters (they suck)
    for (let obj of parsedMap.teleporter) {
        ctx.save();
        ctx.translate(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale));
        let gradient;
        switch (obj.dir.toString()) {
            case "0":
                gradient = ctx.createLinearGradient(0, 0, 0, Math.ceil(obj.size.y * camScale));
                break;
            case "1":
                gradient = ctx.createLinearGradient(Math.ceil(obj.size.x * camScale), 0, 0, 0);
                break;
            case "2":
                gradient = ctx.createLinearGradient(0, Math.ceil(obj.size.y * camScale), 0, 0);
                break;
            case "3":
                gradient = ctx.createLinearGradient(0, 0, Math.ceil(obj.size.x * camScale), 0);
                break;
        }
        if (gradient) {
            gradient.addColorStop(0, parsedMap.background);
            gradient.addColorStop(1, renderSettings.colors.obstacle);
        } else gradient = parsedMap.background;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
        ctx.restore();
    }
    // Render text
    ctx.font = Math.floor(5 * camScale) + "px Russo One, Verdana, Arial, Helvetica, sans-serif";
    ctx.lineWidth = Math.floor(camScale);
    for (let obj of map.objects.filter(obj => obj.type === "text")) {
        ctx.fillStyle = "#000000";
        ctx.strokeText(obj.text, Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale));
        ctx.fillStyle = "#ffffff";
        ctx.fillText(obj.text, Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale));
    }
    // Render buttons
    for (let obj of map.objects.filter(obj => obj.type === "button")) {
        ctx.fillStyle = obj.pressed ? renderSettings.colors.buttonPressed : renderSettings.colors.button;
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    // Render doors
    for (let obj of map.objects.filter(obj => obj.type === "door")) {
        ctx.strokeStyle = obj.opened ? renderSettings.colors.doorOpenedOutline : renderSettings.colors.doorClosedOutline;
        ctx.fillStyle = obj.opened ? renderSettings.colors.doorOpenedFill : renderSettings.colors.doorClosedFill;
        ctx.save();
        ctx.strokeRect(obj.pos.x + 0.5, obj.pos.y + 0.5, obj.size.x - 1, obj.size.y - 1);
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
        ctx.restore();
    }

    // <ENTITIES>
    // Render bombs
    for (let obj of e.entities.filter(obj => obj.type === "bomb")) {
        ctx.globalAlpha = obj.opacity;
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.region + obj.radius, obj.region + obj.radius, 0, 0, 7);
        ctx.fillStyle = obj.exploding ? renderSettings.colors.mineExpRegion : renderSettings.colors.mineRegion;
        ctx.fill();
        ctx.drawImage(renderSettings.textures.enemies.bomb[obj.phase & 1], obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
    // Render followings
    for (let obj of e.entities.filter(obj => obj.type === "following")) {
        ctx.globalAlpha = obj.opacity;
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.region + obj.radius, obj.region + obj.radius, 0, 0, 7);
        ctx.fillStyle = renderSettings.colors.followingRegion;
        ctx.fill();
        ctx.drawImage(renderSettings.textures.enemies.following, obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
    // Render contracs
    for (let obj of e.entities.filter(obj => obj.type === "contractor")) {
        ctx.globalAlpha = obj.opacity;
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.region + obj.radius, obj.region + obj.radius, 0, 0, 7);
        ctx.fillStyle = obj.triggered ? renderSettings.colors.contracTriggerRegion : renderSettings.colors.contracRegion;
        ctx.fill();
        ctx.drawImage(renderSettings.textures.enemies.contractor[obj.triggered & 1], obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
    // Render entities
    for (let obj of e.entities.filter(obj => ["bouncer", "megaBouncer", "freezer", "spike", "normal", "reverse", "taker", "immune", "monster", "stutter", "expander", "shooter"].includes(obj.type))) {
        ctx.globalAlpha = obj.opacity;
        ctx.drawImage(renderSettings.textures.enemies[obj.type], obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
    // Render rotating enemies
    for (let obj of e.entities.filter(obj => obj.type === "rotating")) {
        ctx.save();
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.rotate(obj.angle);
        ctx.globalAlpha = obj.opacity;
        ctx.drawImage(renderSettings.textures.enemies.rotating, -obj.radius, -obj.radius, obj.radius * 2, obj.radius * 2);
        ctx.restore();
    }
    // Render bullets
    ctx.globalAlpha = 1;
    ctx.fillStyle = renderSettings.colors.bullet;
    for (let obj of e.entities.filter(obj => obj.type === "turretBullet")) {
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, obj.radius, 0, 7);
        ctx.fill();
    }
    // Render shooter bullets
    ctx.fillStyle = renderSettings.colors.bullet;
    for (let obj of e.entities.filter(obj => obj.type === "enemyBullet")) {
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, obj.radius, 0, 7);
        ctx.fill();
    }
    // Render meteor bullets
    ctx.fillStyle = renderSettings.colors.meteor;
    for (let obj of e.entities.filter(obj => obj.type === "meteorBullet")) {
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, obj.radius, 0, 7);
        ctx.fill();
    }
    // Render blueFire
    ctx.fillStyle = renderSettings.colors.blueFire;
    for (let obj of e.entities.filter(obj => obj.type === "path")) {
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, 0, 0, 7);
        ctx.fill();
        ctx.closePath();
    }
    // Render shields
    ctx.fillStyle = renderSettings.colors.shield;
    for (let obj of e.entities.filter(obj => obj.type === "shield")) {
        ctx.save();
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.rotate(obj.dir);
        ctx.lineWidth = obj.size.y * 2;
        ctx.beginPath();
        ctx.moveTo(-obj.size.x, 0);
        ctx.lineTo(obj.size.x, 0);
        ctx.stroke();
        ctx.restore();
    }

    // Render ghost 
    ctx.fillStyle = renderSettings.colors.ghost;
    for (let obj of e.entities.filter(obj => obj.type === "healingGhost")) {
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, 2, 2, 2, 0, 7);
        ctx.fill();
    }
    // </ENTITIES>

    // Render turrets
    ctx.globalAlpha = 1;
    for (let obj of map.objects.filter(obj => obj.type === "turret")) {
        ctx.save();
        ctx.translate(obj.pos.x + obj.size.x / 2, obj.pos.y + obj.size.y / 2);
        ctx.rotate(obj.dir);
        ctx.fillStyle = renderSettings.colors.turretCannon;
        ctx.fillRect(0, -2, 5, 4);
        ctx.fillStyle = renderSettings.colors.turretBody;
        ctx.beginPath();
        ctx.ellipse(0, 0, obj.size.x / 2, obj.size.y / 2, 0, 0, 7);
        ctx.fill();
        ctx.restore();
    }
    // Render players
    ctx.strokeStyle = "#202020";
    ctx.lineWidth = camScale / 2;
    ctx.font = 2 * camScale + "px Tahoma, Verdana, Segoe, sans-serif";
    for (let i in e.players) {
        let p = e.players[i];
        let died = p.states.includes("Died");
        let freeze = p.states.includes("Freeze");
        ctx.save();
        ctx.translate(p.pos.x * camScale, p.pos.y * camScale);
        ctx.rotate(p.gravDir / 2 * Math.PI);
        ctx.beginPath();
        // Body
        ctx.ellipse(0, 0, p.radius * camScale, p.radius * camScale, 0, 0, 7);
        ctx.fillStyle = died ? freeze ? renderSettings.colors.playerFreezeDead : renderSettings.colors.playerDead : freeze ? renderSettings.colors.playerFreeze : fromColArr(p.color);
        ctx.fill();
        // Hat
        // if (renderSettings.textures.hats.hasOwnProperty(p.hat)) ctx.drawImage(renderSettings.textures.hats[p.hat], -2 * p.radius, -2 * p.radius, 4 * p.radius, 4 * p.radius);
        // Name
        ctx.fillStyle = died ? freeze ? renderSettings.colors.playerFreezeDead : renderSettings.colors.playerDead : freeze ? renderSettings.colors.playerFreeze : "#202020";
        ctx.fillText(p.name, 0, camScale * (-p.radius - 0.5));
        // fuelBar™️
        ctx.strokeRect(camScale * -5.25, camScale * (p.radius + .75), camScale * 10.5, camScale * 3);
        ctx.fillStyle = died ? freeze ? renderSettings.colors.playerFreezeDead : renderSettings.colors.playerDead : freeze ? renderSettings.colors.playerFreeze : "#ffff40";
        ctx.fillRect(camScale * -5, camScale * (p.radius + 1), camScale * p.fuel, camScale * 2.5);
        ctx.restore();
    }
    // Render blocks(1)
    if (renderSettings.render.block1) {
        ctx.setLineDash([]);
        for (let obj of map.objects.filter(obj => obj.type === "block" && obj.layer)) {
            ctx.fillStyle = fromColArr(obj.color.concat(obj.opacity));
            ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
        }
    }
    // Render grav zones
    ctx.setLineDash([Math.floor(2 * camScale), Math.floor(6 * camScale)]);
    ctx.lineCap = "round";
    for (let obj of map.objects.filter(obj => obj.type === "gravityZone")) {
        ctx.strokeStyle = renderSettings.colors.gravOutline[obj.dir];
        ctx.fillStyle = renderSettings.colors.gravFill[obj.dir];
        ctx.strokeRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
        ctx.fillRect(Math.floor(obj.pos.x * camScale), Math.floor(obj.pos.y * camScale), Math.ceil(obj.size.x * camScale), Math.ceil(obj.size.y * camScale));
    }
    // Render boxes (build power)
    for (let obj of map.objects.filter(obj => obj.type === "box")) {
        ctx.fillStyle = renderSettings.colors.box;
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    // Render hitboxes
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = renderSettings.colors.hitbox;
    if (renderSettings.renderHitboxes) {
        for (let o of map.objects) ctx.strokeRect(Math.floor(o.pos.x * camScale), Math.floor(o.pos.y * camScale), Math.ceil(o.size.x * camScale), Math.ceil(o.size.y * camScale));
    }
}
/**
 * @param {number[]} arr 
 */
function fromColArr(arr) {
    return `rgba(${arr.join(", ")})`;
}