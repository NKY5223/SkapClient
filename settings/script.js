const controls = (localStorage.getItem("controls") || "w a s d shift   r").split(" ");
const othercontrols = (localStorage.getItem("othercontrols") || "u i f arrowup arrowleft arrowdown arrowright o").split(" ");
const controlInputs = document.getElementsByClassName("control");
const othercontrolInputs = document.getElementsByClassName("othercontrol");

for (let i in controls) {
    controlInputs[i].value = controls[i];
    controlInputs[i].addEventListener("input", () => {
        controls[i] = controlInputs[i].value.toLowerCase();
        localStorage.setItem("controls", controls.join(" "));
    });
}
for (let i in othercontrols) {
    othercontrolInputs[i].value = othercontrols[i];
    othercontrolInputs[i].addEventListener("input", () => {
        othercontrols[i] = othercontrolInputs[i].value.toLowerCase();
        localStorage.setItem("othercontrols", othercontrols.join(" "));
    });
}

const keyInput = document.getElementById("keyInput");
const keyP = document.getElementById("keyP");
keyInput.addEventListener("keydown", e => {
    keyP.innerHTML = e.key?.toLowerCase();
    keyInput.value = "";
});

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
        alert("Unbanned. Now don't get banned again.");
    }
});