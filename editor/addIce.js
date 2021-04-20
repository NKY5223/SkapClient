function addIce() {
    lockCursor = true;
    canvas.style.cursor = "crosshair";

    obstacleBtn.disabled = true;
    lavaBtn.disabled = true;
    slimeBtn.disabled = true;
    iceBtn.disabled = true;

    function mousedown(e) {
        if (e.button === 2) {
            canvas.removeEventListener("mousedown", mousedown);
            return;
        }
        obstacleBtn.disabled = false;
        lavaBtn.disabled = false;
        slimeBtn.disabled = false;
        iceBtn.disabled = false;
        canvas.style.cursor = "nwse-resize";

        let posX = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
        let posY = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
        let ice = createIce(posX, posY, 0, 0);
        currentArea.objects.ice.push(ice);
        menu.appendChild(ice.element);
        selectedObject = ice;

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            ice.size.x = Math.max(x - posX, 0);
            ice.size.y = Math.max(y - posY, 0);
            ice.inputs.w.value = ice.size.x;
            ice.inputs.h.value = ice.size.y;
        }

        canvas.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseup", () => {
            canvas.removeEventListener("mousedown", mousedown);
            canvas.removeEventListener("mousemove", mousemove);
            lockCursor = false;
        });
    }
    disabled = false;
    lavaBtn.disabled = false;
    slimeBtn.disabled = false;
    iceBtn.disabled = false; canvas.addEventListener("mousedown", mousedown);
}