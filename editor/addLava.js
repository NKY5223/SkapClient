function addLava() {
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
        let lava = createLava(posX, posY, 0, 0);
        currentArea.objects.lava.push(lava);
        menu.appendChild(lava.element);
        selectedObject = lava;

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            lava.size.x = Math.max(x - posX, 0);
            lava.size.y = Math.max(y - posY, 0);
            lava.inputs.w.value = lava.size.x;
            lava.inputs.h.value = lava.size.y;
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