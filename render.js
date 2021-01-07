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
 * 
 * @typedef SkapEntity
 * @property {"bomb" | "bouncer" | "spike" | "normal"} type
 * bombs/bouncers/normal/spike
 * @property {number} radius
 * @property {number} opacity
 * @property {boolean} phase
 * @property {boolean} exploding FINALLY TYPO
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
 * @property {string} color
 * @property {boolean} died
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
 * @param {Object} map
 * @param {Object} map.areaSize
 * @param {number} map.areaSize.x
 * @param {number} map.areaSize.y
 * @param {SkapObject[]} map.objects
 */
function render(e, map) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineCap = "middle";
    ctx.resetTransform();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(camScale, camScale);
    ctx.translate(-camX, -camY);
    ctx.fillStyle = fill.background;
    ctx.fillRect(0, 0, map.areaSize.x, map.areaSize.y);

    // Render obstacles
    ctx.setLineDash([]);
    ctx.fillStyle = fill.obstacle;
    for (let obj of map.objects.filter(obj => obj.type === "obstacle")) {
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    // Render slime
    ctx.fillStyle = fill.slime;
    for (let obj of map.objects.filter(obj => obj.type === "slime")) {
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    // Render lava
    ctx.fillStyle = fill.lava;
    for (let obj of map.objects.filter(obj => obj.type === "lava")) {
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    // Render the ****ing teleporters (they suck)
    for (let obj of map.objects.filter(obj => obj.type === "teleporter")) {
        ctx.save();
        ctx.translate(obj.pos.x, obj.pos.y);
        let gradient;
        switch (obj.dir.toString()) {
            case "0":
                gradient = ctx.createLinearGradient(0, 0, 0, obj.size.y);
                break;
            case "1":
                gradient = ctx.createLinearGradient(obj.size.x, 0, 0, 0);
                break;
            case "2":
                gradient = ctx.createLinearGradient(0, obj.size.y, 0, 0);
                break;
            case "3":
                gradient = ctx.createLinearGradient(0, 0, obj.size.x, 0);
                break;
        }
        if (gradient) {
            gradient.addColorStop(0, fill.background);
            gradient.addColorStop(1, fill.obstacle);
        } else gradient = fill.background;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, obj.size.x, obj.size.y);
        ctx.restore();
    }
    // Render text
    ctx.fillStyle = "#ffffff";
    ctx.font = "5px Russo One, Verdana, Arial, Helvetica, sans-serif";
    for (let obj of map.objects.filter(obj => obj.type === "text")) {
        ctx.fillText(obj.text, obj.pos.x, obj.pos.y);
    }
    // Render buttons
    for (let obj of map.objects.filter(obj => obj.type === "button")) {
        ctx.fillStyle = obj.pressed ? fill.buttonPressed : fill.button;
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    // Render doors
    for (let obj of map.objects.filter(obj => obj.type === "door")) {
        ctx.strokeStyle = obj.opened ? fill.doorOpenedOutline : fill.doorClosedOutline;
        ctx.fillStyle = obj.opened ? fill.doorOpenedFill : fill.doorClosedFill;
        ctx.save();
        ctx.strokeRect(obj.pos.x + 0.5, obj.pos.y + 0.5, obj.size.x - 1, obj.size.y - 1);
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
        ctx.restore();
    }
    // Render bombs
    for (let obj of e.entities.filter(obj => obj.type === "bomb")) {
        ctx.globalAlpha = obj.opacity;
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.region, obj.region, 0, 0, 7);
        ctx.fillStyle = obj.exploding ? fill.mineExpRegion : fill.mineRegion;
        ctx.fill();
        ctx.drawImage(textures.bomb[obj.phase & 1], obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
    // Render bouncers
    for (let obj of e.entities.filter(obj => ["bouncer", "megaBouncer", "spike", "normal", "reverse"].includes(obj.type))) {
        ctx.globalAlpha = obj.opacity;
        ctx.drawImage(textures[obj.type], obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
    // Render rotating enemies
    for (let obj of e.entities.filter(obj => obj.type === "rotating")) {
        ctx.save();
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.rotate(obj.angle);
        ctx.globalAlpha = obj.opacity;
        ctx.drawImage(textures.normal, obj.pos.x - obj.radius, obj.pos.y - obj.radius, obj.radius * 2, obj.radius * 2);
        ctx.restore();
    }
    // Render bullets
    ctx.fillStyle = fill.bullet;
    for (let obj of e.entities.filter(obj => obj.type === "turretBullet")) {
        ctx.beginPath();
        ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, obj.radius, 0, 7);
        ctx.fill();
    }
    // Render turrets
    for (let obj of map.objects.filter(obj => obj.type === "turret")) {
        ctx.save();
        ctx.translate(obj.pos.x + obj.size.x / 2, obj.pos.y + obj.size.y / 2);
        ctx.rotate(obj.dir);
        ctx.fillStyle = fill.turretCannon;
        ctx.fillRect(0, -2, 5, 4);
        ctx.fillStyle = fill.turretBody;
        ctx.beginPath();
        ctx.ellipse(0, 0, obj.size.x / 2, obj.size.y / 2, 0, 0, 7);
        ctx.fill();
        ctx.restore();
    }
    // Render players
    ctx.globalAlpha = 1;
    ctx.font = "2px Tahoma, Verdana, Segoe, sans-serif";
    for (let i in e.players) {
        let p = e.players[i];
        ctx.save();
        ctx.translate(p.pos.x, p.pos.y);
        ctx.rotate(p.gravDir / 2 * Math.PI);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius, p.radius, 0, 0, 7);
        ctx.fillStyle = p.died ? "#ff0000" : p.color;
        ctx.fill();
        ctx.fillStyle = p.died ? "#ff0000" : "#ffffff";
        ctx.fillText(p.name, 0, -p.radius - 0.5);
        ctx.fillStyle = p.died ? "#ff0000" : "#ffff40";
        ctx.fillRect(-5, p.radius + 1, p.fuel / 6 * 5, 2.5);
        ctx.strokeStyle = "#202020";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(-5, p.radius + 1, 10, 2.5);
        ctx.restore();
    }
    // Render grav zones
    ctx.setLineDash([2, 6]);
    ctx.lineCap = "round";
    for (let obj of map.objects.filter(obj => obj.type === "gravityZone")) {
        ctx.strokeStyle = fill.gravOutline[obj.dir];
        ctx.fillStyle = fill.gravFill[obj.dir];
        ctx.strokeRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
}