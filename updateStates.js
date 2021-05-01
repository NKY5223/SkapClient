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
 * @param {Object[]} m.particles
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
    // Camera
    if (!freeCam) {
        camX = player.pos.x;
        camY = player.pos.y;
    }

    power0CD.style.height = (isNaN(m.infos.oneCooldown) ? 0 : m.infos.oneCooldown) * 100 + "%";
    power1CD.style.height = (isNaN(m.infos.twoCooldown) ? 0 : m.infos.twoCooldown) * 100 + "%";
    power0Heat.style.height = m.infos.oneHeat * 100 + "%";
    power1Heat.style.height = m.infos.twoHeat * 100 + "%";

    // Death/Freeze message
    if (player.states.includes("Died")) {
        show(deathM);
        hide(freezeM);
    }
    else {
        hide(deathM);
        if (player.states.includes("Freeze")) show(freezeM);
        else hide(freezeM);
    };
    document.title = `SkapClient${player.states.includes("Died") ? " <Dead>" : player.states.includes("Freeze") ? " <Frozen>" : ""}`

    // List players
    playerList.innerHTML = "";
    for (let p of m.playerList) {
        playerList.innerHTML += `<p${p[2] ? " class='deadPlayerName'" : ""}>${p[0].safe()}: ${p[1].safe()}</p>`
    }
    // Fuel bar 
    fuelBar.style.width = 100 * m.infos.fuel / 10 + "%";
    // Pos and vel
    posXSpan.innerHTML = player.pos.x;
    posYSpan.innerHTML = player.pos.y;
    let vel = Math.sqrt(player.vel.x * player.vel.x + player.vel.y * player.vel.y);
    velSpan.innerHTML = vel.toFixed(3);
    velXSpan.innerHTML = player.vel.x;
    velYSpan.innerHTML = player.vel.y;
    maxVel = Math.max(maxVel, vel);
    maxVelP.innerHTML = maxVel.toFixed(3);

    // Set entities... (totally not render)
    state = m;
    // Particles
    if (document.hasFocus()) {
        for (let p of m.particles) {
            switch (p.type) {
                case "dash":
                    particles.dash.push({
                        x: p.x,
                        y: p.y,
                        vx: -Math.cos(p.dir),
                        vy: -Math.sin(p.dir),
                        r: 5,
                        o: 1
                    });
                    break;
                case "shrinking":
                    for (let i = 0; i < 20; i++) {
                        let dir = Math.random() * (Math.PI + 1) - 0.5;
                        let s = Math.random() / 4 + 0.5;
                        particles.shrink.push({
                            r: 2,
                            x: p.x,
                            y: p.y,
                            vx: s * Math.cos(dir),
                            vy: -s * Math.sin(dir)
                        });
                    }
                    break;
                case "bombExplosion":
                    for (let i = 0; i < 100; i++) {
                        let rStart = p.region * Math.random() / 2;
                        let dir = 2 * Math.PI * Math.random();
                        particles.bomb.push({
                            o: 1,
                            x: p.x + rStart * Math.cos(dir),
                            y: p.y + rStart * Math.sin(dir),
                            vx: p.region * Math.cos(dir) / 50,
                            vy: p.region * Math.sin(dir) / 50
                        });
                    }
                    break;
                case "explosion":
                    particles.explosion.push({
                        x: p.x,
                        y: p.y,
                        r: 0,
                        o: 1
                    });
                    break;
                case "healing":
                    let dir = 2 * Math.PI * Math.random();
                    particles.ghost.push({
                        x: p.x,
                        y: p.y,
                        vx: Math.cos(dir) / 5,
                        vy: Math.sin(dir) / 5,
                        r: 1.5,
                        o: 1
                    });
                    break;
                case "refuel":
                    for (let i = 0; i < 20; i++) {
                        let dir = Math.random() * 2 - Math.PI / 2 - 1;
                        let s = Math.random() / 5 + 0.3;
                        particles.refuel.push({
                            x: p.x,
                            y: p.y,
                            vx: s * Math.cos(dir),
                            vy: -s * Math.sin(dir),
                            o: 1
                        });
                    }
                    break;
            }
        }
        for (let id in m.players) {
            let p = m.players[id];
            if (p.states.includes("jetpack")) {
                for (let i = 0; i < 5; i++) {
                    let dir = Math.random() * -Math.PI + Math.PI / 2 * p.gravDir;
                    let s = Math.random() / 10 + 0.1;
                    particles.jetpack.push({
                        x: p.pos.x,
                        y: p.pos.y,
                        vx: -s * Math.cos(dir),
                        vy: -s * Math.sin(dir),
                        w: p.gravDir === 0 || p.gravDir === 2 ? 5 : 2,
                        h: p.gravDir === 0 || p.gravDir === 2 ? 2 : 5,
                        o: 1
                    });
                }
            }
            if ((p.vel.x * p.vel.x + p.vel.y * p.vel.y) > 25 && Math.random() < 0.5) {
                let dir = Math.random() * Math.PI * 2;
                let s = Math.random() / 20 + 0.05;
                particles.trail.push({
                    x: p.pos.x + (p.radius - 1) * Math.cos(dir),
                    y: p.pos.y + (p.radius - 1) * Math.sin(dir),
                    vx: s * Math.cos(dir),
                    vy: s * Math.sin(dir),
                    o: 0.75
                });
            }
        }
    }
}