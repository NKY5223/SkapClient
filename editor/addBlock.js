function addBlock() {
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
        let block = createBlock(posX, posY, 0, 0);
        currentArea.objects.block0.push(block);
        objectmenu.appendChild(block.element);
        if (selectedObject) hide(selectedObject.element);
        selectedObject = block;

        block.inputs.layer.addEventListener("input", () => {
            const from = block.inputs.layer.checked ? currentArea.objects.block0 : currentArea.objects.block1;
            const to = block.inputs.layer.checked ? currentArea.objects.block1 : currentArea.objects.block0;
            if (from.includes(block)) {
                to.push(from.splice(from.indexOf(block), 1)[0]);
            }
            block.type = "block" + block.inputs.layer.checked ? "1" : "0";
        });

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            block.size.x = Math.max(x - posX, 0);
            block.size.y = Math.max(y - posY, 0);
            block.inputs.w.value = block.size.x;
            block.inputs.h.value = block.size.y;
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