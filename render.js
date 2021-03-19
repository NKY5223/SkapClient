/**
 * @typedef SkapObject
 * @property {string} id
 * @property {"obstacle" | "lava" | "slime" | "teleporter" | "text" | "door" | "button"} type
 * @property {"0" | "1" | "2" | "3"} dir
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {Object} size
 * @property {number} size.x
 * @property {number} size.y
 * @property {Object} center
 * @property {number} center.x
 * @property {number} center.y
 * @property {string} text
 * @property {boolean} opened
 * @property {boolean} pressed
 * @property {boolean} switch
 * @property {0 | 1} layer
 * @property {[number, number, number]} color
 * @property {number} opacity
 * @property {number} angle
 * @property {number[]} linkIds
 * @property {number[]} linkIdsOn
 * @property {number[]} linkIdsOff
 * @property {SkapObject[]} linksOn
 * @property {SkapObject[]} linksOff
 * 
 * @typedef SkapEntity
 * @property {"bomb" | "bouncer" | "spike" | "normal" | "megaBouncer" | "taker" | "wavy" | "freezer" | "snek" | "immune" | "monster" | "stutter" | "contractor" | "expanding" | "turretBullet" | "enemyBullet" | "shield" | "healingGhost" | "meteorBullet" | "path"} type
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
 * snek >:(
 * @property {number} dir
 * @property {{ x: number, y: number, radius: number, time: number }[]} states
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
    // Particles
    particles.dash = particles.dash.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.r += 0.1;
        return (p.o -= 0.1) > 0;
    });
    particles.shrink = particles.shrink.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        return (p.r -= 0.1) > 0.2;
    });
    particles.bomb = particles.bomb.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        return (p.o -= 0.1) > 0;
    });
    particles.explosion = particles.explosion.filter(p => {
        p.r += 5;
        return (p.o -= 0.05) > 0;
    });
    particles.ghost = particles.ghost.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.r -= 0.05;
        return (p.o -= 0.05) > 0;
    });
    particles.refuel = particles.refuel.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        return (p.o -= 0.05) > 0;
    });
    particles.jetpack = particles.jetpack.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        return (p.o -= 0.02) > 0;
    });
    // Camera
    if (freeCam) {
        camX += camSpeed / camScale * (keysDown.has(othercontrols[6]) - keysDown.has(othercontrols[4]));
        camY += camSpeed / camScale * (keysDown.has(othercontrols[5]) - keysDown.has(othercontrols[3]));
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineCap = "round";


    ctx.fillStyle = renderSettings.colors.obstacle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = parsedMap.background;
    ctx.fillRect(
        Math.round(canvas.width / 2 - camScale * camX),
        Math.round(canvas.height / 2 - camScale * camY),
        Math.round(map.areaSize.x * camScale),
        Math.round(map.areaSize.y * camScale)
    );


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
            players: {},
            playerList: ["Sorry, but the data has not yet loaded.", "", true],
            entities: []
        }
    }
    let mX = (mouse.x - canvas.width / 2) / camScale + camX;
    let mY = (mouse.y - canvas.height / 2) / camScale + camY;
    aimXSpan.innerHTML = mX.toFixed(3);
    aimYSpan.innerHTML = mY.toFixed(3);
    send({
        e: "aim",
        m: [
            mX,
            mY
        ]
    });

    if (renderSettings.render.obstacle) {
        // Render obstacles
        ctx.fillStyle = renderSettings.colors.obstacle;
        for (let obj of parsedMap.obstacle) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    // Render the ****ing teleporters (they suck)
    if (renderSettings.render.teleporter) {
        for (let obj of parsedMap.teleporter) {
            let gradient;
            switch (obj.dir) {
                case "0":
                    gradient = ctx.createLinearGradient(
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY))
                    );
                    break;
                case "1":
                    gradient = ctx.createLinearGradient(
                        Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x - camX)), 0,
                        Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)), 0
                    );
                    break;
                case "2":
                    gradient = ctx.createLinearGradient(
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY)),
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY))
                    );
                    break;
                case "3":
                    gradient = ctx.createLinearGradient(
                        Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)), 0,
                        Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x - camX)), 0
                    );
                    break;
            }
            if (gradient) {
                gradient.addColorStop(0, parsedMap.background);
                gradient.addColorStop(1, renderSettings.colors.obstacle);
            } else gradient = parsedMap.background;
            ctx.fillStyle = gradient;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    ctx.fillStyle = renderSettings.colors.lava;
    if (renderSettings.render.lava) {
        // Render lava
        for (let obj of parsedMap.lava) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    if (renderSettings.render.movLava) {
        // Render movLava
        for (let obj of parsedMap.movingLava) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    if (renderSettings.render.rotLava) {
        // Render rotLava
        ctx.globalAlpha = 1;
        for (let obj of parsedMap.rotatingLava) {
            ctx.save();
            ctx.translate(
                Math.round(canvas.width / 2 + camScale * (obj.center.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.center.y - camY))
            );
            ctx.rotate(obj.angle);
            ctx.fillRect(-camScale * obj.size.x / 2, -camScale * obj.size.y / 2, camScale * obj.size.x, camScale * obj.size.y);
            ctx.restore();
        }
    }
    if (renderSettings.render.ice) {
        // Render ice
        ctx.fillStyle = renderSettings.colors.ice;
        for (let obj of parsedMap.ice) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    if (renderSettings.render.slime) {
        // Render slime
        ctx.fillStyle = renderSettings.colors.slime;
        for (let obj of parsedMap.slime) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    // Render buttons
    ctx.setLineDash([]);
    for (let obj of parsedMap.button) {
        ctx.beginPath();
        ctx.moveTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[0][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[0][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[1][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[1][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[2][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[2][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[3][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[3][1] - camY))
        );
        ctx.fillStyle = obj.pressed ? renderSettings.colors.buttonPressed : renderSettings.colors.button;
        ctx.fill();
    }
    // Render switches?
    for (let obj of parsedMap.switch) {
        ctx.beginPath();
        ctx.moveTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[0][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[0][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[1][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[1][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[2][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[2][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (obj.points[3][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.points[3][1] - camY))
        );
        ctx.fillStyle = obj.switch ? renderSettings.colors.buttonPressed : renderSettings.colors.button;
        ctx.fill();
    }
    // Renders
    ctx.fillStyle = renderSettings.colors.doorFill;
    ctx.lineWidth = camScale;
    for (let obj of parsedMap.door) {
        ctx.strokeStyle = obj.opened ? renderSettings.colors.doorOpenedOutline : renderSettings.colors.doorClosedOutline;
        ctx.strokeRect(
            Math.round(canvas.width / 2 + camScale * (obj.pos.x + 0.5 - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y + 0.5 - camY)),
            Math.round(camScale * (obj.size.x - 1)),
            Math.round(camScale * (obj.size.y - 1))
        );
        if (!obj.opened) ctx.fillRect(
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
            Math.round(camScale * obj.size.x),
            Math.round(camScale * obj.size.y)
        );
        for (let b of obj.linksOn) {
            ctx.beginPath();
            ctx.strokeStyle = b.pressed || b.switch ? renderSettings.colors.doorLineOn : renderSettings.colors.doorLineOff;
            ctx.moveTo(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX), canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY));
            ctx.lineTo(canvas.width / 2 + camScale * (b.pos.x + b.size.x / 2 - camX), canvas.height / 2 + camScale * (b.pos.y + b.size.y / 2 - camY));
            ctx.stroke();
        }
        for (let b of obj.linksOff) {
            ctx.beginPath();
            ctx.strokeStyle = b.pressed || b.switch ? renderSettings.colors.doorLineOff : renderSettings.colors.doorLineOn;
            ctx.moveTo(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX), canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY));
            ctx.lineTo(canvas.width / 2 + camScale * (b.pos.x + b.size.x / 2 - camX), canvas.height / 2 + camScale * (b.pos.y + b.size.y / 2 - camY));
            ctx.stroke();
        }
    }
    // Render blocks(0)
    ctx.globalAlpha = 1;
    if (renderSettings.render.block0) {
        for (let obj of parsedMap.block0) {
            ctx.fillStyle = obj.color;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }

    // ENTITIES
    for (let obj of e.entities) {
        switch (obj.type) {
            case "bomb":
                ctx.globalAlpha = obj.opacity;
                ctx.beginPath();
                ctx.ellipse(
                    canvas.width / 2 + camScale * (obj.pos.x - camX),
                    canvas.height / 2 + camScale * (obj.pos.y - camY),
                    camScale * (obj.region + obj.radius),
                    camScale * (obj.region + obj.radius),
                    0, 0, 7
                );
                ctx.fillStyle = obj.exploding ? renderSettings.colors.mineExpRegion : renderSettings.colors.mineRegion;
                ctx.fill();
                ctx.drawImage(
                    renderSettings.textures.enemies.bomb[obj.phase & 1],
                    canvas.width / 2 + camScale * (obj.pos.x - obj.radius - camX),
                    canvas.height / 2 + camScale * (obj.pos.y - obj.radius - camY),
                    camScale * obj.radius * 2,
                    camScale * obj.radius * 2
                );
                break;
            case "following":
                ctx.globalAlpha = obj.opacity;
                ctx.beginPath();
                ctx.ellipse(
                    canvas.width / 2 + camScale * (obj.pos.x - camX),
                    canvas.height / 2 + camScale * (obj.pos.y - camY),
                    camScale * (obj.region + obj.radius),
                    camScale * (obj.region + obj.radius),
                    0, 0, 7
                );
                ctx.fillStyle = renderSettings.colors.followingRegion;
                ctx.fill();
                ctx.drawImage(
                    renderSettings.textures.enemies.following,
                    canvas.width / 2 + camScale * (obj.pos.x - obj.radius - camX),
                    canvas.height / 2 + camScale * (obj.pos.y - obj.radius - camY),
                    camScale * obj.radius * 2,
                    camScale * obj.radius * 2
                );
                break;
            case "contractor":
                ctx.globalAlpha = obj.opacity;
                ctx.beginPath();
                ctx.ellipse(
                    canvas.width / 2 + camScale * (obj.pos.x - camX),
                    canvas.height / 2 + camScale * (obj.pos.y - camY),
                    camScale * (obj.region + obj.radius),
                    camScale * (obj.region + obj.radius),
                    0, 0, 7
                );
                ctx.fillStyle = obj.triggered ? renderSettings.colors.contracTriggerRegion : renderSettings.colors.contracRegion;
                ctx.fill();
                ctx.drawImage(
                    renderSettings.textures.enemies.contractor[obj.triggered & 1],
                    canvas.width / 2 + camScale * (obj.pos.x - obj.radius - camX),
                    canvas.height / 2 + camScale * (obj.pos.y - obj.radius - camY),
                    camScale * obj.radius * 2,
                    camScale * obj.radius * 2
                );
                break;
            case "bouncer":
            case "normal":
            case "reverse":
            case "spike":
            case "megaBouncer":
            case "freezer":
            case "taker":
            case "immune":
            case "monster":
            case "stutter":
            case "expanding":
            case "wavy":
            case "shooter":
            case "expander":
            case "gravityUp":
            case "gravityDown":
            case "gravityLeft":
            case "gravityRight":
                ctx.globalAlpha = obj.opacity;
                ctx.drawImage(renderSettings.textures.enemies[obj.type], canvas.width / 2 + camScale * (obj.pos.x - obj.radius - camX), canvas.height / 2 + camScale * (obj.pos.y - obj.radius - camY), camScale * obj.radius * 2, camScale * obj.radius * 2);
                break;
            case "rotating":
                ctx.save();
                ctx.translate(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
                ctx.rotate(obj.angle);
                ctx.globalAlpha = obj.opacity;
                ctx.drawImage(renderSettings.textures.enemies.rotating, -camScale * obj.radius, -camScale * obj.radius, camScale * obj.radius * 2, camScale * obj.radius * 2);
                ctx.restore();
                break;
            case "turretBullet":
            case "enemyBullet":
                ctx.globalAlpha = 1;
                ctx.fillStyle = renderSettings.colors.lava;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY), camScale * obj.radius, camScale * obj.radius, 0, 0, 7);
                ctx.fill();
                break;
            case "meteorBullet":
                ctx.globalAlpha = 1;
                ctx.fillStyle = renderSettings.colors.meteor;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY), camScale * obj.radius, camScale * obj.radius, 0, 0, 7);
                ctx.fill();
                break;
            case "path":
                ctx.fillStyle = renderSettings.colors.blueFire;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY), camScale * obj.radius, camScale * obj.radius, 0, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
            case "tail":
                ctx.fillStyle = renderSettings.colors.tail;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY), camScale * obj.radius, camScale * obj.radius, 0, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
            case "shield":
                ctx.lineWidth = camScale * obj.size.y * 2;
                ctx.strokeStyle = renderSettings.colors.shield;
                ctx.globalAlpha = 1;
                ctx.save();
                ctx.translate(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
                ctx.rotate(obj.dir);
                ctx.beginPath();
                ctx.moveTo(-camScale * obj.size.x, 0);
                ctx.lineTo(camScale * obj.size.x, 0);
                ctx.stroke();
                ctx.restore();
                break;
            case "healingGhost":
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY), camScale * obj.radius, camScale * obj.radius, 0, 0, 7);
                ctx.fillStyle = renderSettings.colors.ghost;
                ctx.fill();
                break;
            case "frostEntity":
                ctx.globalAlpha = obj.opacity;
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY), camScale * obj.radius, camScale * obj.radius, 0, 0, 7);
                ctx.fillStyle = renderSettings.colors.frost;
                ctx.fill();
                break;
            case "snek":
                ctx.save();
                ctx.globalAlpha = 1;
                for (let i = obj.states.length - 1, o = obj.states[i]; i >= 0; i--, o = obj.states[i]) {
                    ctx.drawImage(renderSettings.textures.enemies.snekBody, canvas.width / 2 + camScale * (o.x - obj.radius - camX), canvas.height / 2 + camScale * (o.y - obj.radius - camY), camScale * obj.radius * 2, camScale * obj.radius * 2);
                }
                ctx.globalAlpha = obj.opacity;
                ctx.translate(canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
                ctx.rotate(obj.dir);
                ctx.drawImage(renderSettings.textures.enemies.snekHead, -camScale * obj.radius, -camScale * obj.radius, camScale * obj.radius * 3, camScale * obj.radius * 2);
                ctx.restore();
                break;
            default:
                ctx.globalAlpha = obj.opacity || 1;
                ctx.drawImage(renderSettings.textures.enemies.none, canvas.width / 2 + camScale * (obj.pos.x - obj.radius - camX), canvas.height / 2 + camScale * (obj.pos.y - obj.radius - camY), camScale * obj.radius * 2, camScale * obj.radius * 2);
                break;
        }
    }

    // Particles
    ctx.fillStyle = renderSettings.colors.dash;
    for (let p of particles.dash) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + camScale * (p.x - camX), canvas.height / 2 + camScale * (p.y - camY), camScale * p.r, camScale * p.r, 0, 0, 7);
        ctx.globalAlpha = p.o;
        ctx.fill();
    }
    ctx.fillStyle = renderSettings.colors.shrink;
    ctx.globalAlpha = 1;
    for (let p of particles.shrink) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + camScale * (p.x - camX), canvas.height / 2 + camScale * (p.y - camY), camScale * p.r, camScale * p.r, 0, 0, 7);
        ctx.fill();
    }
    ctx.fillStyle = renderSettings.colors.bombParticle;
    for (let p of particles.bomb) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + camScale * (p.x - camX), canvas.height / 2 + camScale * (p.y - camY), camScale * 2, camScale * 2, 0, 0, 7);
        ctx.globalAlpha = p.o;
        ctx.fill();
    }
    ctx.fillStyle = renderSettings.colors.explosion;
    for (let p of particles.explosion) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + camScale * (p.x - camX), canvas.height / 2 + camScale * (p.y - camY), camScale * p.r, camScale * p.r, 0, 0, 7);
        ctx.globalAlpha = p.o;
        ctx.fill();
    }
    ctx.fillStyle = renderSettings.colors.ghostParticles;
    for (let p of particles.ghost) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + camScale * (p.x - camX), canvas.height / 2 + camScale * (p.y - camY), camScale * p.r, camScale * p.r, 0, 0, 7);
        ctx.globalAlpha = p.o;
        ctx.fill();
    }
    ctx.fillStyle = renderSettings.colors.refuel;
    for (let p of particles.refuel) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + camScale * (p.x - camX), canvas.height / 2 + camScale * (p.y - camY), camScale, camScale, 0, 0, 7);
        ctx.globalAlpha = p.o;
        ctx.fill();
    }
    ctx.fillStyle = renderSettings.colors.jetpack;
    for (let p of particles.jetpack) {
        ctx.globalAlpha = p.o;
        ctx.fillRect(canvas.width / 2 + camScale * (p.x - 2.5 - camX), canvas.height / 2 + camScale * (p.y - 1 - camY), 5 * camScale, 2 * camScale);
    }

    // Render turrets
    ctx.globalAlpha = 1;
    for (let obj of parsedMap.turret) {
        ctx.save();
        ctx.translate(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX), canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY));
        ctx.rotate(obj.dir);
        ctx.fillStyle = renderSettings.colors.turretCannon;
        ctx.fillRect(0, -camScale * 2, camScale * 5, camScale * 4);
        ctx.fillStyle = renderSettings.colors.turretBody;
        ctx.beginPath();
        ctx.ellipse(0, 0, camScale * obj.size.x / 2, camScale * obj.size.y / 2, 0, 0, 7);
        ctx.fill();
        ctx.restore();
    }
    // Render players
    ctx.font = camScale * 2 + "px Tahoma, Verdana, Segoe, sans-serif";
    for (let i in e.players) {
        let p = e.players[i];
        let died = p.states.includes("Died");
        let freeze = p.states.includes("Freeze");
        // Initiate hat
        let hat = renderSettings.textures.hats.none;
        if (RENDER_HAT) p.hat = RENDER_HAT;
        if (renderSettings.textures.hats.hasOwnProperty(p.hat)) {
            hat = renderSettings.textures.hats[p.hat];
        }
        // Skin?
        let skin = p.name;
        if (RENDER_SKIN) skin = RENDER_SKIN;

        ctx.save();
        ctx.translate(canvas.width / 2 + camScale * (p.pos.x - camX), canvas.height / 2 + camScale * (p.pos.y - camY));
        ctx.rotate(p.gravDir / 2 * Math.PI);
        ctx.beginPath();
        // Body
        if (renderSettings.textures.skins.hasOwnProperty(skin) && !died && !freeze) {
            ctx.drawImage(renderSettings.textures.skins[skin], -p.radius * camScale, -p.radius * camScale, 2 * p.radius * camScale, 2 * p.radius * camScale);
        }
        if (skin === "wolfie" || skin === "wolfer" || skin === "wolfy") {
            ctx.ellipse(p.radius * -0.105 * camScale, p.radius * 0.4 * camScale, p.radius * 0.557 * camScale, p.radius * 0.55 * camScale, 0, 0, 7);
        } else {
            ctx.ellipse(0, 0, p.radius * camScale, p.radius * camScale, 0, 0, 7);
        }
        ctx.fillStyle = died
            ? freeze
                ? renderSettings.colors.playerFreezeDead
                : renderSettings.colors.playerDead
            : freeze
                ? renderSettings.colors.playerFreeze
                : renderSettings.textures.skins.hasOwnProperty(skin)
                    ? "#00000000"
                    : fromColArr(p.color);
        ctx.fill();

        // Hat
        if (hat) {
            if (!died && !freeze && skin === "wolfie" || skin === "wolfer" || skin === "wolfy") {
                ctx.drawImage(
                    hat.texture,
                    camScale * hat.offset[0] * p.radius * 0.55,
                    camScale * hat.offset[1] * p.radius * 0.55,
                    camScale * hat.size[0] * p.radius * 0.5,
                    camScale * hat.size[1] * p.radius * 0.5
                );
            } else {
                ctx.drawImage(
                    hat.texture,
                    camScale * hat.offset[0] * p.radius,
                    camScale * hat.offset[1] * p.radius,
                    camScale * hat.size[0] * p.radius,
                    camScale * hat.size[1] * p.radius
                );
            }
        }
        // Name
        ctx.fillStyle = died
            ? freeze
                ? renderSettings.colors.playerFreezeDead
                : renderSettings.colors.playerDead
            : freeze
                ? renderSettings.colors.playerFreeze
                : "#202020";
        if (skin === "wolfie" || skin === "wolfer" || skin === "wolfy") {
            ctx.fillText(p.name, 0, camScale * hat.textOffset * p.radius / 2);
        } else {
            ctx.fillText(p.name, 0, camScale * hat.textOffset * p.radius);
        }

        // fuelBar™️
        ctx.fillStyle = died
            ? freeze
                ? renderSettings.colors.playerFreezeDead
                : renderSettings.colors.playerDead
            : freeze
                ? renderSettings.colors.playerFreeze
                : "#ffff40";
        ctx.fillRect(-camScale * 5, camScale * (p.radius + 1), camScale * p.fuel, camScale * 2.5);
        ctx.strokeStyle = "#202020";
        ctx.lineWidth = camScale / 2;
        ctx.strokeRect(-camScale * 5, camScale * (p.radius + 1), camScale * 10, camScale * 2.5);
        ctx.restore();
    }
    // Render blocks(1)
    ctx.globalAlpha = 1;
    if (renderSettings.render.block1) {
        for (let obj of parsedMap.block1) {
            ctx.fillStyle = obj.color;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    // Render grav zones
    ctx.setLineDash([Math.round(2 * camScale), Math.round(6 * camScale)]);
    ctx.lineDashOffset = Math.round((time += 0.5) * camScale);
    ctx.lineWidth = Math.round(camScale);
    ctx.lineCap = "round";
    for (let obj of parsedMap.gravityZone) {
        ctx.strokeStyle = renderSettings.colors.gravOutline[obj.dir];
        ctx.fillStyle = renderSettings.colors.gravFill[obj.dir];
        ctx.strokeRect(
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
            Math.round(camScale * obj.size.x),
            Math.round(camScale * obj.size.y)
        );
        ctx.fillRect(
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
            Math.round(camScale * obj.size.x),
            Math.round(camScale * obj.size.y)
        );
    }
    // Render boxes (build power)
    for (let obj of parsedMap.box) {
        ctx.fillStyle = renderSettings.colors.box;
        ctx.fillRect(
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
            Math.round(camScale * obj.size.x),
            Math.round(camScale * obj.size.y)
        );
    }
    // Render rewards
    for (let obj of parsedMap.reward) {
        ctx.fillStyle = renderSettings.colors.box;
        ctx.drawImage(
            obj.image,
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y + Math.sin(time / 15) * 3 - camY)),
            Math.round(camScale * obj.size.x),
            Math.round(camScale * obj.size.y)
        );
    }
    // Render hat rewards
    for (let obj of parsedMap.hatReward) {
        ctx.fillStyle = renderSettings.colors.box;
        ctx.drawImage(
            obj.image,
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y + Math.sin(time / 15) * 3 - camY)),
            Math.round(camScale * obj.size.x),
            Math.round(camScale * obj.size.y)
        );
    }
    // Render text
    ctx.font = camScale * 5 + "px Russo One, Verdana, Arial, Helvetica, sans-serif";
    ctx.strokeStyle = "#000000";
    ctx.setLineDash([]);
    for (let obj of parsedMap.text) {
        ctx.strokeText(obj.text, canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
        ctx.fillStyle = "#ffffff";
        ctx.fillText(obj.text, canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
        ctx.fillStyle = "#000000";
    }
    // Render hitboxes
    ctx.setLineDash([]);
    if (renderSettings.render.hitbox) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = renderSettings.colors.hitbox;
        for (let o of map.objects)
            ctx.strokeRect(
                Math.round(canvas.width / 2 + camScale * (o.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (o.pos.y - camY)),
                Math.round(camScale * o.size.x),
                Math.round(camScale * o.size.y)
            );
    }
    // Render teleporter hitboxes (for hidden ones)
    if (renderSettings.render.teleporterHitbox) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = renderSettings.colors.teleporterHitbox;
        for (let o of parsedMap.teleporter)
            ctx.strokeRect(
                Math.round(canvas.width / 2 + camScale * (o.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (o.pos.y - camY)),
                Math.round(camScale * o.size.x),
                Math.round(camScale * o.size.y)
            );
    }
}
/**
 * @param {number[]} arr 
 */
function fromColArr(arr) {
    return `rgba(${arr.join(", ")})`;
}