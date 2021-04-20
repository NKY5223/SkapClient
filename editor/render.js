let time = 0;
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
 *
 * 
 * @typedef SkapMap
 * @property {Object} areaSize
 * @property {number} areaSize.x
 * @property {number} areaSize.y
 * @property {[number, number, number]} areaColor
 * @property {[number, number, number, number]} backgroundColor
 * @property {SkapObject[]} objects
 * 
 * @typedef {Object<string, SkapObject[]>} ParsedMap
 * 
 * @typedef State
 * @property {{id: string, fuel: number, oneCooldown: number | null, twoCooldown: number | null, oneHeat: number, twoHeat: number}} infos
 * @property {Object<string, Player>} players id:Player
 * @property {[string, string, boolean][]} playerList
 * @property {SkapEntity[]} entities
 * 
 * @typedef Hat
 * @property {[number, number]} offset
 * @property {[number, number]} size
 * @property {number} textOffset
 * @property {HTMLImageElement} texture
 * 
 * @typedef RenderOptions
 * @property {Object<string, boolean>} render
 * @property {Object<string, string>} colors
 * @property {Object} textures
 * @property {Object<string, HTMLImageElement | HTMLImageElement[]>} textures.enemies
 * @property {Object<string, Hat>} textures.hats
 * @property {HTMLImageElement[]} textures.powers
 * @property {Object<string, HTMLImageElement>} textures.skins
 * @property {HTMLImageElement} textures.trail
 * 
 * @typedef Particle
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * 
 * @param {ParsedMap} currentArea.objects
 * 
 * @param {SkapMap} map
 * 
 * @param {RenderOptions} renderSettings
 * 
 * @param {number} camX
 * @param {number} camY
 */
function render() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineCap = "round";

    camX += camSpeed / camScale * (keysDown.has(othercontrols[6]) - keysDown.has(othercontrols[4]) + keysDown.has(controls[3]) - keysDown.has(controls[1]));
    camY += camSpeed / camScale * (keysDown.has(othercontrols[5]) - keysDown.has(othercontrols[3]) + keysDown.has(controls[2]) - keysDown.has(controls[0]));


    ctx.fillStyle = currentArea?.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = currentArea?.background;
    ctx.fillRect(
        Math.round(canvas.width / 2 - camScale * camX),
        Math.round(canvas.height / 2 - camScale * camY),
        Math.round(currentArea?.size[0] * camScale),
        Math.round(currentArea?.size[1] * camScale),
    );


    if (!currentArea) return;
    if (renderSettings.render.obstacle) {
        // Render obstacles
        ctx.fillStyle = currentArea?.color;
        for (let obj of currentArea.objects.obstacle) {
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
        for (let obj of currentArea.objects.teleporter) {
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
                gradient.addColorStop(0, currentArea.background);
                gradient.addColorStop(1, currentArea?.color);
            } else gradient = currentArea.background;
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
        for (let obj of currentArea.objects.lava) {
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
        for (let obj of currentArea.objects.movingLava) {
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
        for (let obj of currentArea.objects.rotatingLava) {
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
        for (let obj of currentArea.objects.ice) {
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
        for (let obj of currentArea.objects.slime) {
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
    for (let obj of currentArea.objects.button) {
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
    for (let obj of currentArea.objects.switch) {
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
    // Render doors
    ctx.fillStyle = renderSettings.colors.doorFill;
    ctx.lineWidth = camScale;
    for (let obj of currentArea.objects.door) {
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
        for (let obj of currentArea.objects.block0) {
            ctx.fillStyle = obj.color;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    // Render images(0)
    for (let i in currentArea.objects.image0) {
        let obj = currentArea.objects.image0[i];
        try {
            ctx.drawImage(
                obj.image,
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        } catch (err) {
            console.error(currentArea.objects.image0.splice(i, 1)[0], err);
        }
    }

    // Render turrets
    ctx.globalAlpha = 1;
    for (let obj of currentArea.objects.turret) {
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
    // Render blocks(1)
    ctx.globalAlpha = 1;
    if (renderSettings.render.block1) {
        for (let obj of currentArea.objects.block1) {
            ctx.fillStyle = obj.color;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    // Render images(1)
    for (let i in currentArea.objects.image1) {
        let obj = currentArea.objects.image1[i];
        try {
            ctx.drawImage(
                obj.image,
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        } catch (err) {
            console.error(currentArea.objects.image1.splice(i, 1)[0], err);
        }
    }
    // Render grav zones
    ctx.setLineDash([Math.round(2 * camScale), Math.round(6 * camScale)]);
    ctx.lineDashOffset = Math.round((time += 0.5) * camScale);
    ctx.lineWidth = Math.round(camScale);
    ctx.lineCap = "round";
    for (let obj of currentArea.objects.gravityZone) {
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
    // Render rewards
    for (let obj of currentArea.objects.reward) {
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
    for (let obj of currentArea.objects.hatReward) {
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
    if (renderSettings.render.text) {
        for (let obj of currentArea.objects.text) {
            ctx.strokeText(obj.text, canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
            ctx.fillStyle = "#ffffff";
            ctx.fillText(obj.text, canvas.width / 2 + camScale * (obj.pos.x - camX), canvas.height / 2 + camScale * (obj.pos.y - camY));
            ctx.fillStyle = "#000000";
        }
    }
    // Render hitboxes
    ctx.setLineDash([]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = renderSettings.colors.hitbox;
    for (let type in currentArea.objects) {
        for (let o of currentArea.objects[type]) {
            ctx.strokeRect(
                Math.round(canvas.width / 2 + camScale * (o.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (o.pos.y - camY)),
                Math.round(camScale * o.size.x),
                Math.round(camScale * o.size.y)
            );
        }
    }
    // Render selected hitbox
    if (selectedObject) {
        ctx.strokeStyle = renderSettings.colors.selected;
        ctx.strokeRect(
            Math.round(canvas.width / 2 + camScale * (selectedObject.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (selectedObject.pos.y - camY)),
            Math.round(camScale * selectedObject.size.x),
            Math.round(camScale * selectedObject.size.y)
        );
    }
}
/**
 * @param {number[]} arr 
 */
function fromColArr(arr) {
    return `rgba(${arr.join(", ")})`;
}