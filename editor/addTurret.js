function addTurret() {
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
        canvas.style.cursor = "initial";

        let posX = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
        let posY = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
        let turret = createTurret(posX, posY);
        currentArea.objects.turret.push(turret);
        objectmenu.appendChild(turret.element);
        if (selectedObject) hide(selectedObject.element);
        selectedObject = turret;


        canvas.addEventListener("mouseup", () => {
            lockCursor = false;
            canvas.removeEventListener("mousedown", mousedown);
        });
    }
    canvas.addEventListener("mousedown", mousedown);
}