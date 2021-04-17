// Zooming
document.addEventListener("keydown", e => {
    if (!e.ctrlKey) switch (e.key?.toLowerCase()) {
        case othercontrols[0]:
            camScale /= 1.5;
            break;
        case othercontrols[1]:
            camScale *= 1.5;
            break;
    }
});
canvas.addEventListener("click", e => {
    selectedObject = null;
    for (let i = currentMap.objects.obstacle.length - 1; i >= 0; i--) {
        const obstacle = currentMap.objects.obstacle[i];
        const [point0, point1] = points(obstacle);

        if (pointInRect({ x: e.offsetX, y: e.offsetY }, point0, point1)) {
            selectedObject = obstacle;
            break;
        }
    }
});

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