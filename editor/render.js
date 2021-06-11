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

    let time = (Date.now() - timeOnEnter) / 1000;

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
        for (let obj of currentArea.objects.circularObject.filter(obj => obj.objectType === "obstacle")) {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.radius - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.radius - camY)),
                Math.round(camScale * obj.radius),
                Math.round(camScale * obj.radius),
                0, 0, 7
            );
            ctx.fill();
        }
        // Render movObstacle
        // Shadow
        ctx.globalAlpha = 0.4;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "obstacle")) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }

        ctx.globalAlpha = 1;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "obstacle")) {
            const times = obj.points.map((point, index, points) => {
                let next = points[(index + points.length - 1) % points.length];
                return Math.sqrt((next.x - point.x) * (next.x - point.x) + (next.y - point.y) * (next.y - point.y)) / point.vel;
            });
            const totalTime = times.reduce((a, n) => a + n, 0);

            const currentTime = time % totalTime;

            let timeI = 0;
            let { x, y } = obj.points[0];
            for (let i in obj.points) {
                let pointTime = times[(i + 1) % times.length];

                if (timeI <= currentTime && currentTime <= timeI + pointTime) {
                    let point = obj.points[i];
                    let next = obj.points[(Number(i) + 1) % obj.points.length];

                    let ratio = (currentTime - timeI) / pointTime;
                    x = point.x + ratio * (next.x - point.x);
                    y = point.y + ratio * (next.y - point.y);

                    break;
                }
                timeI += pointTime;
            }

            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
        ctx.fillStyle = renderSettings.colors.point;
        ctx.strokeStyle = renderSettings.colors.point;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "obstacle")) {
            for (let point of obj.points) {
                ctx.beginPath();
                ctx.ellipse(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY)),
                    2 * camScale, 2 * camScale, 0, 0, 7
                );
                ctx.fill();
            }

            // Lines
            ctx.lineWidth = camScale;
            
            ctx.beginPath();
            ctx.moveTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            for (let point of obj.points) {
                ctx.lineTo(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY))
                );
            }
            ctx.lineTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            ctx.stroke();
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
            if (!(obj.enemyType in renderSettings.textures.enemies)) tex = renderSettings.textures.enemies.none;

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
        // Shadow
        ctx.globalAlpha = 0.4;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "lava")) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }

        ctx.globalAlpha = 1;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "lava")) {
            const times = obj.points.map((point, index, points) => {
                let next = points[(index + points.length - 1) % points.length];
                return Math.sqrt((next.x - point.x) * (next.x - point.x) + (next.y - point.y) * (next.y - point.y)) / point.vel;
            });
            const totalTime = times.reduce((a, n) => a + n, 0);

            const currentTime = time % totalTime;

            let timeI = 0;
            let { x, y } = obj.points[0];
            for (let i in obj.points) {
                let pointTime = times[(i + 1) % times.length];

                if (timeI <= currentTime && currentTime <= timeI + pointTime) {
                    let point = obj.points[i];
                    let next = obj.points[(Number(i) + 1) % obj.points.length];

                    let ratio = (currentTime - timeI) / pointTime;
                    x = point.x + ratio * (next.x - point.x);
                    y = point.y + ratio * (next.y - point.y);

                    break;
                }
                timeI += pointTime;
            }

            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
        ctx.fillStyle = renderSettings.colors.point;
        ctx.strokeStyle = renderSettings.colors.point;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "lava")) {
            for (let point of obj.points) {
                ctx.beginPath();
                ctx.ellipse(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY)),
                    2 * camScale, 2 * camScale, 0, 0, 7
                );
                ctx.fill();
            }

            // Lines
            ctx.lineWidth = camScale;
            
            ctx.beginPath();
            ctx.moveTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            for (let point of obj.points) {
                ctx.lineTo(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY))
                );
            }
            ctx.lineTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            ctx.stroke();
        }

        // Render rotLava
        // Shadow
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = renderSettings.colors.lava;
        for (let obj of currentArea.objects.rotatingLava) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }

        ctx.globalAlpha = 1;
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

        ctx.fillStyle = renderSettings.colors.point;
        for (let obj of currentArea.objects.rotatingLava) {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (obj.point.x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.point.y - camY)),
                0.5 * camScale, 0.5 * camScale, 0, 0, 7
            );
            ctx.fill();
        }

        ctx.fillStyle = renderSettings.colors.lava;
        for (let obj of currentArea.objects.circularObject.filter(obj => obj.objectType === "lava")) {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.radius - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.radius - camY)),
                Math.round(camScale * obj.radius),
                Math.round(camScale * obj.radius),
                0, 0, 7
            );
            ctx.fill();
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
        for (let obj of currentArea.objects.circularObject.filter(obj => obj.objectType === "ice")) {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.radius - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.radius - camY)),
                Math.round(camScale * obj.radius),
                Math.round(camScale * obj.radius),
                0, 0, 7
            );
            ctx.fill();
        }
        // Render movLava
        // Shadow
        ctx.globalAlpha = 0.4;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "ice")) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }

        ctx.globalAlpha = 1;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "ice")) {
            const times = obj.points.map((point, index, points) => {
                let next = points[(index + points.length - 1) % points.length];
                return Math.sqrt((next.x - point.x) * (next.x - point.x) + (next.y - point.y) * (next.y - point.y)) / point.vel;
            });
            const totalTime = times.reduce((a, n) => a + n, 0);

            const currentTime = time % totalTime;

            let timeI = 0;
            let { x, y } = obj.points[0];
            for (let i in obj.points) {
                let pointTime = times[(i + 1) % times.length];

                if (timeI <= currentTime && currentTime <= timeI + pointTime) {
                    let point = obj.points[i];
                    let next = obj.points[(Number(i) + 1) % obj.points.length];

                    let ratio = (currentTime - timeI) / pointTime;
                    x = point.x + ratio * (next.x - point.x);
                    y = point.y + ratio * (next.y - point.y);

                    break;
                }
                timeI += pointTime;
            }

            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
        ctx.fillStyle = renderSettings.colors.point;
        ctx.strokeStyle = renderSettings.colors.point;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "ice")) {
            for (let point of obj.points) {
                ctx.beginPath();
                ctx.ellipse(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY)),
                    2 * camScale, 2 * camScale, 0, 0, 7
                );
                ctx.fill();
            }

            // Lines
            ctx.lineWidth = camScale;
            
            ctx.beginPath();
            ctx.moveTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            for (let point of obj.points) {
                ctx.lineTo(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY))
                );
            }
            ctx.lineTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            ctx.stroke();
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
        for (let obj of currentArea.objects.circularObject.filter(obj => obj.objectType === "slime")) {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.radius - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.radius - camY)),
                Math.round(camScale * obj.radius),
                Math.round(camScale * obj.radius),
                0, 0, 7
            );
            ctx.fill();
        }
        // Render movLava
        // Shadow
        ctx.globalAlpha = 0.4;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "slime")) {
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }

        ctx.globalAlpha = 1;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "slime")) {
            const times = obj.points.map((point, index, points) => {
                let other = points[(index + points.length - 1) % points.length];
                return Math.sqrt((other.x - point.x) * (other.x - point.x) + (other.y - point.y) * (other.y - point.y)) / point.vel;
            });
            const totalTime = times.reduce((a, n) => a + n, 0);

            const currentTime = time % totalTime;

            let timeI = 0;
            let { x, y } = obj.points[0];
            for (let i in obj.points) {
                let pointTime = times[(i + 1) % times.length];

                if (timeI <= currentTime && currentTime <= timeI + pointTime) {
                    let point = obj.points[i];
                    let next = obj.points[(Number(i) + 1) % obj.points.length];

                    let ratio = (currentTime - timeI) / pointTime;
                    x = point.x + ratio * (next.x - point.x);
                    y = point.y + ratio * (next.y - point.y);

                    break;
                }
                timeI += pointTime;
            }

            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (x - obj.size.x / 2 - camX)),
                Math.round(canvas.height / 2 + camScale * (y - obj.size.y / 2 - camY)),
                Math.round(camScale * obj.size.x),
                Math.round(camScale * obj.size.y)
            );
        }
        ctx.fillStyle = renderSettings.colors.point;
        ctx.strokeStyle = renderSettings.colors.point;
        for (let obj of currentArea.objects.movingObject.filter(obj => obj.objectType === "slime")) {
            for (let point of obj.points) {
                ctx.beginPath();
                ctx.ellipse(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY)),
                    2 * camScale, 2 * camScale, 0, 0, 7
                );
                ctx.fill();
            }

            // Lines
            ctx.lineWidth = camScale;
            
            ctx.beginPath();
            ctx.moveTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            for (let point of obj.points) {
                ctx.lineTo(
                    Math.round(canvas.width / 2 + camScale * (point.x - camX)),
                    Math.round(canvas.height / 2 + camScale * (point.y - camY))
                );
            }
            ctx.lineTo(
                Math.round(canvas.width / 2 + camScale * (obj.points[0].x - camX)),
                Math.round(canvas.height / 2 + camScale * (obj.points[0].y - camY))
            );
            ctx.stroke();
        }
    }
    // Render buttons
    ctx.setLineDash([]);
    ctx.fillStyle = renderSettings.colors.button;
    for (let obj of currentArea.objects.button) {
        ctx.beginPath();
        const points = [
            [
                obj.pos.x + (obj.dir === 0 ? obj.size.x * 0.1 : 0),
                obj.pos.y + (obj.dir === 3 ? obj.size.y * 0.1 : 0)
            ],
            [
                obj.pos.x + (obj.dir === 0 ? obj.size.x * 0.9 : obj.size.x),
                obj.pos.y + (obj.dir === 1 ? obj.size.y * 0.1 : 0)
            ],
            [
                obj.pos.x + (obj.dir === 2 ? obj.size.x * 0.9 : obj.size.x),
                obj.pos.y + (obj.dir === 1 ? obj.size.y * 0.9 : obj.size.y)
            ],
            [
                obj.pos.x + (obj.dir === 2 ? obj.size.x * 0.1 : 0),
                obj.pos.y + (obj.dir === 3 ? obj.size.y * 0.9 : obj.size.y)
            ]
        ];
        ctx.moveTo(
            Math.round(canvas.width / 2 + camScale * (points[0][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[0][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (points[1][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[1][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (points[2][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[2][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (points[3][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[3][1] - camY))
        );
        ctx.fill();
    }
    // Render switches?
    for (let obj of currentArea.objects.switch) {
        ctx.beginPath();
        const points = [
            [
                obj.pos.x - (obj.dir === 3 ? 2 : 0),
                obj.pos.y
            ],
            [
                obj.pos.x + obj.size.x,
                obj.pos.y - (obj.dir === 0 ? 2 : 0)
            ],
            [
                obj.pos.x + (obj.dir === 1 ? 2 : 0) + obj.size.x,
                obj.pos.y + obj.size.y
            ],
            [
                obj.pos.x,
                obj.pos.y + (obj.dir === 2 ? 2 : 0) + obj.size.y
            ]
        ];
        ctx.moveTo(
            Math.round(canvas.width / 2 + camScale * (points[0][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[0][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (points[1][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[1][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (points[2][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[2][1] - camY))
        );
        ctx.lineTo(
            Math.round(canvas.width / 2 + camScale * (points[3][0] - camX)),
            Math.round(canvas.height / 2 + camScale * (points[3][1] - camY))
        );
        ctx.fill();
    }
    // Render doors
    ctx.fillStyle = renderSettings.colors.doorFill;
    ctx.strokeStyle = renderSettings.colors.doorClosedOutline;
    ctx.lineWidth = camScale;
    for (let obj of currentArea.objects.door) {
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
        ctx.strokeStyle = renderSettings.colors.doorLineOff;
        for (let s of currentArea.objects.switch.filter(s => obj.linkIds.includes(s.id))) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX), canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY));
            ctx.lineTo(canvas.width / 2 + camScale * (s.pos.x + s.size.x / 2 - camX), canvas.height / 2 + camScale * (s.pos.y + s.size.y / 2 - camY));
            ctx.stroke();
        }
        for (let b of currentArea.objects.button.filter(b => obj.linkIds.includes(b.id))) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX), canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY));
            ctx.lineTo(canvas.width / 2 + camScale * (b.pos.x + b.size.x / 2 - camX), canvas.height / 2 + camScale * (b.pos.y + b.size.y / 2 - camY));
            ctx.stroke();
        }
        ctx.strokeStyle = renderSettings.colors.doorLineOn;
        for (let s of currentArea.objects.switch.filter(s => obj.linkIds.includes(-s.id) && !obj.linkIds.includes(s.id))) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x / 2 - camX), canvas.height / 2 + camScale * (obj.pos.y + obj.size.y / 2 - camY));
            ctx.lineTo(canvas.width / 2 + camScale * (s.pos.x + s.size.x / 2 - camX), canvas.height / 2 + camScale * (s.pos.y + s.size.y / 2 - camY));
            ctx.stroke();
        }
        for (let b of currentArea.objects.button.filter(b => obj.linkIds.includes(-b.id) && !obj.linkIds.includes(b.id))) {
            ctx.beginPath();
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
    ctx.fillStyle = renderSettings.colors.turretBody;
    for (let obj of currentArea.objects.turret) {
        ctx.beginPath();
        ctx.ellipse(
            Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY)),
            camScale * 3, camScale * 3, 0, 0, 7
        );
        ctx.fill();
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
    ctx.lineDashOffset = Math.round(time * 25 * camScale);
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
        for (let type of types) {
            for (let o of getObjects(type)) {
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
                if (type === "turret") {
                    ctx.beginPath();
                    ctx.ellipse(
                        Math.round(canvas.width / 2 + camScale * (o.pos.x - camX)),
                        Math.round(canvas.height / 2 + camScale * (o.pos.y - camY)),
                        3 * camScale, 3 * camScale, 0, 0, 7
                    );
                    ctx.stroke();
                    continue;
                }
                if (type === "rotLavaPoint") continue;
                if (type === "turretRegion") continue;
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
        if (selectedObject.type === "turret") {
            ctx.beginPath();
            ctx.ellipse(
                Math.round(canvas.width / 2 + camScale * (selectedObject.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (selectedObject.pos.y - camY)),
                3 * camScale, 3 * camScale, 0, 0, 7
            );
            ctx.stroke();

            ctx.fillStyle = renderSettings.colors.turretRegion;
            ctx.fillRect(
                Math.round(canvas.width / 2 + camScale * (selectedObject.region.pos.x - camX)),
                Math.round(canvas.height / 2 + camScale * (selectedObject.region.pos.y - camY)),
                Math.round(camScale * selectedObject.region.size.x),
                Math.round(camScale * selectedObject.region.size.y)
            );
            return;
        }
        // if (selectedObject.type === "movingObject") return;
        ctx.strokeRect(
            Math.round(canvas.width / 2 + camScale * (selectedObject.pos.x - camX)),
            Math.round(canvas.height / 2 + camScale * (selectedObject.pos.y - camY)),
            Math.round(camScale * selectedObject.size.x),
            Math.round(camScale * selectedObject.size.y)
        );
    }
}