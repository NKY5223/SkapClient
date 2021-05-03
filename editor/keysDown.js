var keysDown = new Set();
document.addEventListener("keydown", e => {
    if (e.repeat) return;
    if (e.target instanceof HTMLInputElement) return;
    if (e.ctrlKey) return;
    keysDown.add(e.key?.toLowerCase());
});
document.addEventListener("keyup", e => {
    keysDown.delete(e.key?.toLowerCase());
})