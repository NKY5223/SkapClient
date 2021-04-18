// Zooming
canvas.addEventListener("wheel", e => {
    let m = 0.85 ** (e.deltaY / 125);
    let x = (e.offsetX - canvas.width / 2) / camScale + camX;
    let y = (e.offsetY - canvas.height / 2) / camScale + camY;
    camX = (m * x - x + camX) / m;
    camY = (m * y - y + camY) / m;
    camScale *= m;
});
canvas.addEventListener("mousedown", e => {
    for (let type of ["text", "hatReward", "reward", "gravityZone", "image1", "block1", "turret", "image0", "block0", "door", "switch", "button", "slime", "ice", "rotatingLava", "movingLava", "lava", "teleporter", "obstacle"]) {
        for (let i = currentMap.objects[type].length - 1; i >= 0; i--) {
            const obj = currentMap.objects[type][i];
            const [point0, point1] = points(obj);

            if (pointInRect({ x: e.offsetX, y: e.offsetY }, point0, point1)) {
                if (selectedObject) hide(selectedObject.element);
                selectedObject = obj;
                show(selectedObject.element);
                return;
            }
        }
    }
    if (selectedObject) hide(selectedObject.element);
    selectedObject = null;
});
canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
});

{
    map.maps.push(createArea("Home", "#000a57", 0.8, "#e6e6e6", 100, 100));
    currentMap = map.maps[0];
    menu.appendChild(currentMap.element);

    let obstacle = createObstacle(0, 0, 10, 10);
    currentMap.objects.obstacle.push(obstacle);
    menu.appendChild(obstacle.element);
    hide(obstacle.element);

    let lava = createLava(5, 5, 10, 10);
    currentMap.objects.lava.push(lava);
    menu.appendChild(lava.element);
    hide(lava.element);
}

// Start rendering
(function run() {
    render();
    window.requestAnimationFrame(run);
})();

/**
 * @param {string} obj
 * @param {string} exportName 
 */
function download(obj = { error: "Object not supplied" }, exportName = "map") {
    // Copied from stackoverflow
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(obj);

    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", exportName + ".json");

    document.body.appendChild(a); // required for firefox
    a.click();
    a.remove();
}
/**
 * @param {SkapObject} obj
 * @returns {[VectorLike, VectorLike]}
 */
function points(obj) {
    return [
        {
            x: Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            y: Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY))
        },
        {
            x: Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x - camX)),
            y: Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY))
        }
    ];
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