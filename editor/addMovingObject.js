function addMovingObject() {
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
        let movingObj = createMovingObject(0, 0);
        currentArea.objects.movingObject.push(movingObj);
        objectmenu.appendChild(movingObj.element);
        if (selectedObject) hide(selectedObject.element);
        selectedObject = movingObj;

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            
            movingObj.inputs.w.value = movingObj.size.x = Math.max(x - posX, 0);
            movingObj.inputs.h.value = movingObj.size.y = Math.max(y - posY, 0);
         
            movingObj.inputs.x.value = movingObj.points[0].x = posX + movingObj.size.x / 2;
            movingObj.inputs.y.value = movingObj.points[0].y = posY + movingObj.size.y / 2;
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