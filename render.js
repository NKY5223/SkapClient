/**
 * @typedef SkapObject
 * @property {string} id
 * @property {"obstacle" | "lava" | "slime" | "teleporter" | "text"} type
 * @property {number} dir
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {Object} size
 * @property {number} size.x
 * @property {number} size.y
 * @property {string} text
 * @property {boolean} opened
 * 
 * @typedef SkapEntity
 * @property {"bomb" | "bouncer" | "spike" | "normal"} type
 * bombs/bouncers/normal/spike
 * @property {number} radius
 * @property {number} opacity
 * @property {boolean} phase
 * @property {boolean} explosing
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
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
    ctx.fillStyle = fill.background;
    ctx.fillRect(0, 0, map.areaSize.x, map.areaSize.y);
    // Render grav zones
    ctx.setLineDash([2, 6]);
    ctx.lineCap = "round";
    for (let obj of map.objects.filter(obj => obj.type === "gravityZone")) {
        ctx.strokeStyle = fill.gravOutline[obj.dir];
        ctx.fillStyle = fill.gravFill[obj.dir];
        ctx.strokeRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
        ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    }
    ctx.setLineDash([]);
    // Render obstacles
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
            gradient.addColorStop(1, fill.obstacleColor);
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
        ctx.save();
        ctx.globalAlpha = obj.opacity;
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.beginPath();
        ctx.ellipse(0, 0, obj.region, obj.region, 0, 0, 7);
        ctx.fillStyle = obj.explosing ? fill.mineExpRegion : fill.mineRegion;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, 0, obj.radius, obj.radius, 0, 0, 7);
        ctx.fillStyle = obj.phase ? fill.minePhaseOuter : fill.mineOuter;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, 0, obj.radius / 4, obj.radius / 4, 0, 0, 7);
        ctx.fillStyle = obj.phase ? fill.minePhaseInner : fill.mineInner;
        ctx.fill();
        ctx.restore();
    }
    // Render bouncers
    for (let obj of e.entities.filter(obj => obj.type === "bouncer")) {
        ctx.save();
        ctx.globalAlpha = obj.opacity;
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.scale(obj.radius, obj.radius);
        ctx.fillStyle = fill.bouncerGreen;
        ctx.beginPath();
        ctx.ellipse(0, 0, 1, 1, 0, 0, 7);
        ctx.fill();
        ctx.fillStyle = fill.bouncerBlack;
        ctx.beginPath();
        ctx.ellipse(0, 0, .9, .9, 0, 0, 7);
        ctx.fill();
        ctx.fillStyle = fill.bouncerGreen;
        ctx.fillRect(-.5, -.5, 1, 1);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-.5, -.5, 1, 1);
        ctx.restore();
    }
    // Render megabouncers
    for (let obj of e.entities.filter(obj => obj.type === "megabouncer")) {
        ctx.save();
        ctx.globalAlpha = obj.opacity;
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.scale(obj.radius, obj.radius);
        ctx.fillStyle = fill.bouncerGreen;
        ctx.beginPath();
        ctx.ellipse(0, 0, 1, 1, 0, 0, 7);
        ctx.fill();
        ctx.fillStyle = fill.bouncerBlack;
        ctx.beginPath();
        ctx.ellipse(0, 0, .9, .9, 0, 0, 7);
        ctx.fill();
        ctx.fillStyle = fill.megabouncer;
        ctx.fillRect(-.5, -.5, 1, 1);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-.5, -.5, 1, 1);
        ctx.restore();
    }
    // Render spikes
    for (let obj of e.entities.filter(obj => obj.type === "spike")) {
        ctx.save();
        ctx.globalAlpha = obj.opacity;
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.scale(obj.radius, obj.radius);
        ctx.beginPath();
        ctx.ellipse(0, 0, 1, 1, 0, 0, 7);
        ctx.fillStyle = fill.spikeOutline;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, 0, .9, .9, 0, 0, 7);
        ctx.fillStyle = fill.spikeFill;
        ctx.fill();
        ctx.restore();
    }
    // Render normal enemies
    for (let obj of e.entities.filter(obj => obj.type === "normal")) {
        ctx.save();
        ctx.globalAlpha = obj.opacity;
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.scale(obj.radius, obj.radius);
        ctx.beginPath();
        ctx.ellipse(0, 0, 1, 1, 0, 0, 7);
        ctx.fillStyle = fill.normalOutline;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, .9, 0, Math.PI);
        ctx.fillStyle = fill.normalBottom;
        ctx.fill();
        ctx.restore();
    }
    // Render reverse enemies
    for (let obj of e.entities.filter(obj => obj.type === "reverse")) {
        ctx.save();
        ctx.globalAlpha = obj.opacity;
        ctx.translate(obj.pos.x, obj.pos.y);
        ctx.scale(obj.radius, obj.radius);
        ctx.beginPath();
        ctx.ellipse(0, 0, 1, 1, 0, 0, 7);
        ctx.fillStyle = fill.normalOutline;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, .9, 0, Math.PI);
        ctx.fillStyle = fill.normalTop;
        ctx.fill();
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
}