// Zooming
canvas.addEventListener("wheel", e => {
    if (e.ctrlKey) return;
    let m = 0.85 ** (e.deltaY / 125);
    let x = (e.offsetX - canvas.width / 2) / camScale + camX;
    let y = (e.offsetY - canvas.height / 2) / camScale + camY;
    camX = (m * x - x + camX) / m;
    camY = (m * y - y + camY) / m;
    camScale *= m;
});
canvas.addEventListener("mousedown", e => {
    if (e.button === 1) e.preventDefault();
    if (e.button !== 0) return;
    let target = targetedObject(e);
    /**
     * @param {MouseEvent} e 
     */
    let resize = e => { };

    if (target) {
        if (selectedObject && "element" in selectedObject) hide(selectedObject.element);

        if (target.type === "rotLavaPoint") {
            let rotLava = target.rotLava;
            resize = e => {
                let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);

                rotLava.inputs.pX.value = target.x = Math.round(x - mouseX + posX);
                rotLava.inputs.pY.value = target.y = Math.round(y - mouseY + posY);
            }
            selectedObject = rotLava;
            show(selectedObject.element);
        } else {
            selectedObject = target;
            show(selectedObject.element);
        }
        const { x: posX, y: posY } = target.pos ?? target;
        const { x: sizeX, y: sizeY } = target.size ?? { x: 0, y: 0 };
        const mouseX = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
        const mouseY = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
        if (target.type !== "rotLavaPoint")
            switch (selectMode) {
                case "u":
                    resize = e => {
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                        if (posY - y + sizeY > 0) {
                            target.pos.y = y;
                            target.size.y = posY - y + sizeY;
                        } else {
                            target.pos.y = posY + sizeY;
                            target.size.y = 0;
                        }
                        target.inputs.y.value = target.pos.y;
                        target.inputs.h.value = target.size.y;
                    }
                    break;
                case "ur":
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                        if (posX - x < 0) {
                            target.size.x = x - posX;
                        } else {
                            target.size.x = 0;
                        }
                        if (posY - y + sizeY > 0) {
                            target.pos.y = y;
                            target.size.y = posY - y + sizeY;
                        } else {
                            target.pos.y = posY + sizeY;
                            target.size.y = 0;
                        }
                        target.inputs.x.value = target.pos.x;
                        target.inputs.y.value = target.pos.y;
                        target.inputs.w.value = target.size.x;
                        target.inputs.h.value = target.size.y;
                    }
                    break;
                case "r":
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        if (posX - x < 0) {
                            target.size.x = x - posX;
                        } else {
                            target.size.x = 0;
                        }
                        target.inputs.x.value = target.pos.x;
                        target.inputs.w.value = target.size.x;
                    }
                    break;
                case "dr":
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                        if (posX - x < 0) {
                            target.size.x = x - posX;
                        } else {
                            target.size.x = 0;
                        }
                        if (posY - y < 0) {
                            target.size.y = y - posY;
                        } else {
                            target.size.y = 0;
                        }
                        target.inputs.x.value = target.pos.x;
                        target.inputs.y.value = target.pos.y;
                        target.inputs.w.value = target.size.x;
                        target.inputs.h.value = target.size.y;
                    }
                    break;
                case "d":
                    resize = e => {
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                        if (posY - y < 0) {
                            target.size.y = y - posY;
                        } else {
                            target.size.y = 0;
                        }
                        target.inputs.y.value = target.pos.y;
                        target.inputs.h.value = target.size.y;
                    }
                    break;
                case "dl":
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                        if (posX - x + sizeX > 0) {
                            target.pos.x = x;
                            target.size.x = posX - x + sizeX;
                        } else {
                            target.pos.x = posX + sizeX;
                            target.size.x = 0;
                        }
                        if (posY - y < 0) {
                            target.size.y = y - posY;
                        } else {
                            target.size.y = 0;
                        }
                        target.inputs.x.value = target.pos.x;
                        target.inputs.y.value = target.pos.y;
                        target.inputs.w.value = target.size.x;
                        target.inputs.h.value = target.size.y;
                    }
                    break;
                case "l":
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        if (posX - x + sizeX > 0) {
                            target.pos.x = x;
                            target.size.x = posX - x + sizeX;
                        } else {
                            target.pos.x = posX + sizeX;
                            target.size.x = 0;
                        }
                        target.inputs.x.value = target.pos.x;
                        target.inputs.w.value = target.size.x;
                    }
                    break;
                case "ul":
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                        if (posX - x + sizeX > 0) {
                            target.pos.x = x;
                            target.size.x = posX - x + sizeX;
                        } else {
                            target.pos.x = posX + sizeX;
                            target.size.x = 0;
                        }
                        if (posY - y + sizeY > 0) {
                            target.pos.y = y;
                            target.size.y = posY - y + sizeY;
                        } else {
                            target.pos.y = posY + sizeY;
                            target.size.y = 0;
                        }
                        target.inputs.x.value = target.pos.x;
                        target.inputs.y.value = target.pos.y;
                        target.inputs.w.value = target.size.x;
                        target.inputs.h.value = target.size.y;
                    }
                    break;
                case "m":
                    if (target.type === "rotatingLava") {
                        const { x: pX, y: pY } = target.point;
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);

                            target.inputs.x.value = target.pos.x = x - mouseX + posX;
                            target.inputs.y.value = target.pos.y = y - mouseY + posY;
                            
                            target.inputs.pX.value = target.point.x = pX + x - mouseX;
                            target.inputs.pY.value = target.point.y = pY + y - mouseY;
                        }
                        break;
                    }
                    resize = e => {
                        let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                        let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);

                        target.pos.x = x - mouseX + posX;
                        target.pos.y = y - mouseY + posY;

                        target.inputs.x.value = target.pos.x;
                        target.inputs.y.value = target.pos.y;
                    }
                    break;
            }
        lockCursor = true;
        canvas.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", () => {
            lockCursor = false;
            canvas.removeEventListener("mousemove", resize);
        });

    } else {
        if (selectedObject) hide(selectedObject.element);
        selectedObject = null;
    }

    if (e.detail > 1 && selectedObject && selectedObject.type === "teleporter" && selectedObject.targetArea !== currentArea.name) {
        for (let area of map.areas) {
            if (selectedObject.targetArea === area.name) {
                hide(currentArea.element);
                currentArea = area;
                if (selectedObject) hide(selectedObject.element);
                selectedObject = null;

                timeOnEnter = Date.now();

                show(area.element);
                return;
            }
        }
        if (confirm(`Did not find area ${selectedObject.targetArea}, would you like to create it?`)) {
            addArea(selectedObject.targetArea);
        }
    }
});

/** 
 * @param {MouseEvent} e 
 * @returns {SkapObject}
 */
function targetedObject(e) {
    for (let type of types) {
        let objects = getObjects(type);

        for (let i = objects.length - 1; i >= 0; i--) {
            const obj = objects[i];
            const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = points(type === "rotLavaPoint" ? { pos: obj, size: { x: 0, y: 0 } } : obj);
            const mouse = { x: e.offsetX, y: e.offsetY };
            if (type === "text") {
                if (pointInCircle(mouse, { x: x0, y: y0 }, 5 * camScale + selectBuffer)) {
                    return obj;
                }
                continue;
            } else if (type === "rotLavaPoint") {
                if (pointInCircle(mouse, { x: x0, y: y0 }, 0.5 * camScale + selectBuffer)) {
                    return obj;
                }
                continue;
            }
            if (pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer })) return obj;
        }
    }
    return null;
}

canvas.addEventListener("mousemove", e => {
    if (lockCursor) return;
    for (let type of types) {
        let arr = getObjects(type);

        for (let i = arr.length - 1; i >= 0; i--) {
            const obj = arr[i];
            const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = points(type === "rotLavaPoint" ? { pos: obj, size: { x: 0, y: 0 } } : obj);
            const mouse = point(e);

            if (type === "text") {
                if (pointInCircle(mouse, { x: x0, y: y0 }, 5 * camScale + selectBuffer)) {
                    canvas.style.cursor = "pointer";
                    selectMode = "m";
                    return;
                }
                continue;
            } else if (type === "rotLavaPoint") {
                if (pointInCircle(mouse, { x: x0, y: y0 }, 0.5 * camScale + selectBuffer)) {
                    canvas.style.cursor = "pointer";
                    selectMode = "m";
                    return;
                }
                continue;
            }

            const outer = pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer });
            const up = pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y0 + selectBuffer });
            const left = pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x0 + selectBuffer, y: y1 + selectBuffer });
            const down = pointInRect(mouse, { x: x0 - selectBuffer, y: y1 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer });
            const right = pointInRect(mouse, { x: x1 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer });
            const middle = pointInRect(mouse, { x: x0, y: y0 }, { x: x1, y: y1 });

            if (middle) {
                canvas.style.cursor = "grab";
                selectMode = "m";
            } else if (down) {
                if (left) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "dl";
                } else if (right) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "dr";
                } else {
                    canvas.style.cursor = "ns-resize";
                    selectMode = "d";
                }
            } else if (right) {
                if (up) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "ur";
                } else if (down) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "dr";
                } else {
                    canvas.style.cursor = "ew-resize";
                    selectMode = "r";
                }
            } else if (up) {
                if (left) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "ul";
                } else if (right) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "ur";
                } else {
                    canvas.style.cursor = "ns-resize";
                    selectMode = "u";
                }
            } else if (left) {
                if (up) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "ul";
                } else if (down) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "dl";
                } else {
                    canvas.style.cursor = "ew-resize";
                    selectMode = "l";
                }
            } else {
                canvas.style.cursor = "initial";
                selectMode = null;
            }

            if (outer) return;
        }
    }
    canvas.style.cursor = "initial";
});
canvas.addEventListener("contextmenu", e => {
    if (e.target === contextmenu) return;
    e.preventDefault();

    contextmenu.style.left = e.x + 1 + "px";
    contextmenu.style.top = e.y + 1 + "px";

    if (selectedObject) show(contextBtns.objectActions);
    else hide(contextBtns.objectActions);
    if (selectedObject) contextBtns.deleteObject.innerHTML = `Delete Selected Object<br>(${capitalise(selectedObject.type)})`;
    if (map.areas.length === 1) hide(contextBtns.deleteArea);
    else show(contextBtns.deleteArea);

    show(contextmenu);
});
document.addEventListener("click", e => {
    if (e.target === contextmenu || e.target.parentNode === contextmenu && e.button === 2) return;
    if (e.target === canvas && e.button === 2) return;
    hide(contextmenu);
});
document.addEventListener("keydown", e => {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key.toLowerCase() === (localStorage.getItem("hitbox") ?? "o")) renderSettings.render.hitbox = !renderSettings.render.hitbox;
});
resizemenu.addEventListener("mousedown", () => {
    resizing = true;
});
resizemenu.addEventListener("mouseup", () => {
    resizing = false;
});
document.addEventListener("mousemove", e => {
    if (resizing) {
        menu.style.width = Math.max(window.innerWidth - e.pageX - 15, 200) + "px";
    }
});
togglemenu.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});
togglebottommenu.addEventListener("click", () => {
    bottommenu.classList.toggle("hidden");
});
downloadBtn.addEventListener("click", () => {
    if (!map.settings.name) map.settings.name = prompt("Map name?");
    if (map.settings.name === null) return;
    if (!map.settings.creator) map.settings.creator = prompt("Map creator's username in skap?");
    if (map.settings.creator === null) return;
    download(map.settings.name || "map");
});
importInput.addEventListener("input", () => {
    importInput.files[0].text()
        .then(value => loadFile(value))
        .catch(console.error);
});

window.addEventListener("beforeunload", e => {
    e.preventDefault();
    return e.returnValue = "Have you saved your map?";
});

obstacleBtn.addEventListener("click", addObstacle);
lavaBtn.addEventListener("click", addLava);
slimeBtn.addEventListener("click", addSlime);
iceBtn.addEventListener("click", addIce);

contextBtns.obstacle.addEventListener("click", addObstacle);
contextBtns.lava.addEventListener("click", addLava);
contextBtns.slime.addEventListener("click", addSlime);
contextBtns.ice.addEventListener("click", addIce);
contextBtns.block.addEventListener("click", addBlock);
contextBtns.teleporter.addEventListener("click", addTeleporter);
contextBtns.text.addEventListener("click", addText);
contextBtns.spawner.addEventListener("click", addSpawner);
contextBtns.gravZone.addEventListener("click", addGravZone);
contextBtns.rotLava.addEventListener("click", addRotatingLava);
contextBtns.area.addEventListener("click", () => addArea());

contextBtns.deleteObject.addEventListener("click", () => {
    if (selectedObject) {
        let arr = currentArea.objects[selectedObject.type];
        if (arr.includes(selectedObject)) {
            arr.splice(arr.indexOf(selectedObject), 1);
            selectedObject.element.remove();
            selectedObject = null;
        }
    }
});
contextBtns.deleteArea.addEventListener("click", () => {
    if (currentArea && map.areas.length !== 1 && confirm("Are you sure you want to delete this area?")) {
        let arr = map.areas;
        if (arr.includes(currentArea)) {
            arr.splice(arr.indexOf(currentArea), 1);
            currentArea.element.remove();
            currentArea.button.remove();
            currentArea = arr[0];
            show(currentArea.element);
        }
    }
});







addArea("Home");
// Start rendering
(function run() {
    render();
    window.requestAnimationFrame(run);
})();








/**
 * @param {SkapObject} obj
 * @returns {[VectorLike, VectorLike]}
 */
function points(obj) {
    return obj.pos && obj.size ? [
        {
            x: Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            y: Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY))
        },
        {
            x: Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x - camX)),
            y: Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY))
        }
    ] : [{ x: 0, y: 0 }, { x: 0, y: 0 }];
}
/**
 * @param {MouseEvent} e 
 * @returns {VectorLike}
 */
function point(e) {
    return { x: e.offsetX, y: e.offsetY };
}
/**
 * @param {VectorLike} point 
 * @param {VectorLike} point0 
 * @param {VectorLike} point1 
 */
function pointInRect(point, point0, point1) {
    return point.x > point0.x && point.x < point1.x && point.y > point0.y && point.y < point1.y;
}
/**
 * @param {VectorLike} point 
 * @param {VectorLike} pos 
 * @param {number} r 
 */
function pointInCircle(point, pos, r) {
    return (point.x - pos.x) * (point.x - pos.x) + (point.y - pos.y) * (point.y - pos.y) <= r * r;
}
/**
 * @param {Element} element 
 */
function hide(element) {
    element.classList.add("hidden");
}
/**
 * @param {Element} element 
 */
function show(element) {
    element.classList.remove("hidden");
}
function capitalise(str = "") {
    str = String(str);
    if (str.length <= 1) return str;
    return str[0].toUpperCase() + str.slice(1);
}