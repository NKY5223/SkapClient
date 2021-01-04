/**
 * @param {Object} m
 * @param {Object} m.infos
 * @param {string} m.infos.id
 * @param {number} m.infos.fuel
 * @param {number | null} m.infos.oneCooldown
 * @param {number | null} m.infos.twoCooldown
 * @param {number} m.infos.oneHeat
 * @param {number} m.infos.twoHeat
 * @param {Object<string, Player>} m.players id:Player
 * @param {[string, string, boolean][]} m.playerList
 * @param {SkapEntity[]} m.entities
 */
function updateStates(m) {
    let now = Date.now();
    let diff = now - lastUpdate;
    minLU = Math.min(minLU, diff);
    if (diff < 10000)
    maxLU = Math.max(maxLU, diff);
    lastUpdateDisplay.innerHTML = diff;
    minMaxUpdate.innerHTML = minLU + " - " + maxLU;
    lastUpdate = now;

    let player = m.players[m.infos.id];
    let ids = Object.keys(m.players);

    // Camera
    if (freeCam) {
        camX += camSpeed * (keysDown.has("arrowright") - keysDown.has("arrowleft"));
        camY += camSpeed * (keysDown.has("arrowdown") - keysDown.has("arrowup"));
    } else {
        camX = player.pos.x;
        camY = player.pos.y;
    }

    // List players
    playerList.innerHTML = "";
    for (let p of m.playerList) {
        playerList.innerHTML += `<p${p[2] ? " class='deadPlayerName'" : ""}>${p[0].safe()}: ${p[1].safe()}</p>`
    }
    // Fuel bar 
    fuelBar.style.width = 100 * m.infos.fuel / 12 + "%";

    // Render
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx.resetTransform();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(camScale, camScale);
    ctx.translate(-camX, -camY);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "5px Russo One, Verdana, Arial, Helvetica, sans-serif";
    renderMap(map);
    renderEntities(m.entities);
    ctx.font = "2px Tahoma, Verdana, Segoe, sans-serif";
    renderPlayers(ids, m.players);
}