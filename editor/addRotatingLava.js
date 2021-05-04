function addRotatingLava() {
    lockCursor = true;
    canvas.style.cursor = "crosshair";

    obstacleBtn.disabled = true;
    lavaBtn.disabled = true;
    slimeBtn.disabled = true;
    iceBtn.disabled = true;

    function mousedown(e) {
        if (e.button === 2) {
            lockCursor = false;
            canvas.style.cursor = "initial";
            obstacleBtn.disabled = false;
            lavaBtn.disabled = false;
            slimeBtn.disabled = false;
            iceBtn.disabled = false;
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
        let rotLava = createRotatingLava(posX, posY, 0, 0);
        currentArea.objects.rotatingLava.push(rotLava);
        objectmenu.appendChild(rotLava.element);
        if (selectedObject) hide(selectedObject.element);
        selectedObject = rotLava;

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            rotLava.size.x = Math.max(x - posX, 0);
            rotLava.size.y = Math.max(y - posY, 0);
            rotLava.inputs.w.value = rotLava.size.x;
            rotLava.inputs.h.value = rotLava.size.y;
        }

        canvas.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseup", () => {
            obstacleBtn.disabled = false;
            lavaBtn.disabled = false;
            slimeBtn.disabled = false;
            iceBtn.disabled = false;
            canvas.removeEventListener("mousedown", mousedown);
            canvas.removeEventListener("mousemove", mousemove);
            lockCursor = false;
        });
    }
    canvas.addEventListener("mousedown", mousedown);
}