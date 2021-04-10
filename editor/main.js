// Zooming
document.addEventListener("keydown", e => {
    if (!e.ctrlKey) switch (e.key?.toLowerCase()) {
        case othercontrols[0]:
            camScale /= 1.5;
            break;
        case othercontrols[1]:
            camScale *= 1.5;
            break;
    }
});

// Start rendering
(function run() {
    render();
    window.requestAnimationFrame(run);
})();


/**
 * @param {string} obj
 * @param {string} exportName 
 */
function download(obj = { error: "Object not supplied" }, exportName = "map") {
    // Copied from stackoverflow
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(obj);

    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", exportName + ".json");

    document.body.appendChild(a); // required for firefox
    a.click();
    a.remove();
}