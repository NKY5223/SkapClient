let time = 0;
function render() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineCap = "round";

    camX += camSpeed / camScale * (keysDown.has(controls[3]) - keysDown.has(controls[1]));
    camY += camSpeed / camScale * (keysDown.has(controls[2]) - keysDown.has(controls[0]));


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
                case 0:
                    gradient = ctx.createLinearGradient(
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY))
                    );
                    break;
                case 1:
                    gradient = ctx.createLinearGradient(
                        Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x - camX)), 0,
                        Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)), 0
                    );
                    break;
                case 2:
                    gradient = ctx.createLinearGradient(
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY)),
                        0, Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY))
                    );
                    break;
                case 3:
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
    // Render spawner
    ctx.fillStyle = renderSettings.colors.spawner;
    if (renderSettings.render.spawner) {
        for (let obj of currentArea.objects.spawner) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );

            let tex = renderSettings.textures.enemies[obj.enemyType];
            if (tex instanceof Array) tex = tex[0];
            if (["snek", "daddySnek", "babySnek"].includes(obj.enemyType)) tex = renderSettings.textures.enemies.snekHead;

            let size = Math.min(obj.size.x, Math.min(obj.size.y, 2 * obj.radius));

            ctx.drawImage(
                tex,
                Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX - size / 2)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY - size / 2)),
                Math.round(camScale * (["snek", "daddySnek", "babySnek"].includes(obj.enemyType) ? 1.5 * size : size)),
                Math.round(camScale * size)
            )
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
        // Render movLava
        for (let obj of currentArea.objects.movingLava) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
        // Render rotLava
        ctx.globalAlpha = 1;
        let time = (Date.now() - timeOnEnter) / 1000;
        for (let obj of currentArea.objects.rotatingLava) {
            ctx.save();
            ctx.translate(
                Math.round(canvas.width / 2 + camScale * (obj.point.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.point.y - camY))
            );
            ctx.rotate((obj.startAngle + time * obj.speed) * Math.PI / 180);
            ctx.fillRect(camScale * (obj.pos.x - obj.point.x), camScale * (obj.pos.y - obj.point.y), camScale * obj.size.x, camScale * obj.size.y);
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
    if (renderSettings.render.block0) {
        for (let obj of currentArea.objects.block.filter(o => !o.layer)) {
            ctx.fillStyle = obj.color;
            ctx.globalAlpha = obj.opacity;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    ctx.globalAlpha = 1;
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
    if (renderSettings.render.block1) {
        for (let obj of currentArea.objects.block.filter(o => o.layer)) {
            ctx.fillStyle = obj.color;
            ctx.globalAlpha = obj.opacity;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
    }
    ctx.globalAlpha = 1;
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
    if (renderSettings.render.hitbox) {
        ctx.strokeStyle = renderSettings.colors.hitbox;
        for (let type in currentArea.objects) {
            for (let o of currentArea.objects[type]) {
                if (type === "text") {
                    ctx.beginPath();
                    ctx.ellipse(
                        Math.round(canvas.width / 2 + camScale * (o.pos.x - camX)),
                        Math.round(canvas.height / 2 + camScale * (o.pos.y - camY)),
                        5 * camScale, 5 * camScale, 0, 0, 7
                    );
                    ctx.stroke();
                    continue;
                }
                ctx.strokeRect(
                    Math.round(canvas.width / 2 + camScale * (o.pos.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (o.pos.y - camY)),
                    Math.round(camScale * o.size.x),
                    Math.round(camScale * o.size.y)
                );
            }
        }
    }
    // Render selected hitbox
    if (selectedObject) {
        ctx.strokeStyle = renderSettings.colors.selected;
        if (selectedObject.type === "text") {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (selectedObject.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (selectedObject.pos.y - camY)),
                5 * camScale, 5 * camScale, 0, 0, 7
            );
            ctx.stroke();
            return;
        }
        ctx.strokeRect(
            Math.round(canvas.width / 2 + camScale * (selectedObject.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (selectedObject.pos.y - camY)),
            Math.round(camScale * selectedObject.size.x),
            Math.round(camScale * selectedObject.size.y)
        );
    }
}