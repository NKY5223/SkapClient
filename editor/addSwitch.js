function addSwitch() {
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
        let Switch = createSwitch(posX, posY, 0, 0);
        currentArea.objects.switch.push(Switch);
        objectmenu.appendChild(Switch.element);
        if (selectedObject) hide(selectedObject.element);
        selectedObject = Switch;

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            Switch.size.x = Math.max(x - posX, 0);
            Switch.size.y = Math.max(y - posY, 0);
            Switch.inputs.w.value = Switch.size.x;
            Switch.inputs.h.value = Switch.size.y;
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