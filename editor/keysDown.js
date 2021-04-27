var keysDown = new Set();
document.addEventListener("keydown", e => {
    if (e.repeat || e.target instanceof HTMLInputElement) return;
    keysDown.add(e.key?.toLowerCase());
});
document.addEventListener("keyup", e => {
    keysDown.delete(e.key?.toLowerCase());
})