function addCircularObject() {
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
        let circularObject = createCircularObject(posX, posY, 0);
        currentArea.objects.circularObject.push(circularObject);
        objectmenu.appendChild(circularObject.element);
        if (selectedObject) hide(selectedObject.element);
        selectedObject = circularObject;

        function mousemove(e) {
            let x = (e.offsetX - canvas.width / 2) / camScale + camX;
            let y = (e.offsetY - canvas.height / 2) / camScale + camY;
            circularObject.inputs.radius.value = circularObject.radius = Math.round(Math.min(Math.max(x - posX, 0), Math.max(y - posY, 0)) / 2);
            circularObject.size.x = circularObject.size.y = circularObject.radius * 2;
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