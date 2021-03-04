const controls = (localStorage.getItem("keys") || "w a s d shift   r").split(" ");
const controlInputs = document.getElementsByClassName("control");

for (let i in controls) {
    controlInputs[i].value = controls[i];
    controlInputs[i].addEventListener("input", () => {
        controls[i] = controlInputs[i].value.toLowerCase();
        localStorage.setItem("keys", controls.join(" "));
    });
}

const debugInput = document.getElementById("debug");
debugInput.checked = localStorage.getItem("debug");
debugInput.addEventListener("input", () => {
    if (debugInput.checked) {
        localStorage.setItem("debug", "yes");
    } else {
        localStorage.removeItem("debug");
    }
});

const overlayInput = document.getElementById("overlay");
overlayInput.checked = localStorage.getItem("overlay");
overlayInput.addEventListener("input", () => {
    if (overlayInput.checked) {
        localStorage.setItem("overlay", "yes");
    } else {
        localStorage.removeItem("overlay");
    }
});

const unbanInput = document.getElementById("unbanInput");
const unbanBtn = document.getElementById("unbanBtn");
unbanBtn.addEventListener("click", () => {
    if (unbanInput.value === btoa(60000 * Math.floor(Date.now() / 60000) + "8756rftg8uretfiy")) {
        localStorage.removeItem("banned");
    }
});