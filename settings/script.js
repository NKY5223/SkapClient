const controls = [
    localStorage.getItem("up") ?? "w",
    localStorage.getItem("left") ?? "a",
    localStorage.getItem("down") ?? "s",
    localStorage.getItem("right") ?? "d",
    localStorage.getItem("shift") ?? "shift",
    localStorage.getItem("sprint") ?? " ",
    localStorage.getItem("power0") ?? "",
    localStorage.getItem("power1") ?? "",
    localStorage.getItem("combo") ?? "",
    localStorage.getItem("respawn") ?? "r"
];
const othercontrols = [
    localStorage.getItem("zoomOut") ?? "u",
    localStorage.getItem("zoomIn") ?? "i",
    localStorage.getItem("freeCam") ?? "f",
    localStorage.getItem("freeCamUp") ?? "arrowup",
    localStorage.getItem("freeCamLeft") ?? "arrowleft",
    localStorage.getItem("freeCamDown") ?? "arrowdown",
    localStorage.getItem("freeCamRight") ?? "arrowright",
    localStorage.getItem("hitbox") ?? "o"
];
const controlInputs = document.getElementsByClassName("control");
const othercontrolInputs = document.getElementsByClassName("othercontrol");

for (let i in controls) {
    const input = controlInputs.item(i);
    input.value = controls[i];

    input.addEventListener("input", () => {
        controls[i] = input.value.toLowerCase();
        localStorage.setItem(["up", "left", "down", "right", "shift", "sprint", "power0", "power1", "combo", "respawn"][i], input.value);
    });
}
for (let i in othercontrols) {
    const input = othercontrolInputs.item(i);
    input.value = othercontrols[i];

    input.addEventListener("input", () => {
        controls[i] = input.value.toLowerCase();
        localStorage.setItem(["zoomOut", "zoomIn", "freeCam", "freeCamUp", "freeCamLeft", "freeCamDown", "freeCamRight", "hitbox"][i], input.value);
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

const powerKeybinds = document.getElementsByClassName("powerkeybind");
const powerPresets = document.getElementsByClassName("powerpreset");
for (let i = 0; i < powerPresets.length; i++) {
    const powerPreset = powerPresets.item(i);
    const powerKeybind = powerKeybinds.item(i);
    powerPreset.value = localStorage.getItem(powerPreset.id);
    powerKeybind.value = localStorage.getItem(powerKeybind.id);
    powerKeybind.addEventListener("input", () => {
        localStorage.setItem(powerKeybind.id, powerKeybind.value);
    });
    powerPreset.addEventListener("input", () => {
        localStorage.setItem(powerPreset.id, powerPreset.value);
    });
}

const censorInput = document.getElementById("censor");
censorInput.checked = Boolean(localStorage.getItem("censor"));
censorInput.addEventListener("input", () => {
    if (censorInput.checked) {
        localStorage.setItem("censor", "heavy");
    } else {
        localStorage.removeItem("censor");
    }
});

const emoji0 = document.getElementById("emoji0");
const emoji1 = document.getElementById("emoji1");
const emoji2 = document.getElementById("emoji2");
switch (localStorage.getItem("emoji")) {
    case "0":
        emoji0.checked = true;
        break;
    case "1":
        emoji1.checked = true;
        break;
    case "2":
        emoji2.checked = true;
        break;
    default:
        emoji0.checked = true;
        localStorage.setItem("emoji", "0");
        break;
}

emoji0.addEventListener("input", () => {
    localStorage.setItem("emoji", "0");
});
emoji1.addEventListener("input", () => {
    localStorage.setItem("emoji", "1");
});
emoji2.addEventListener("input", () => {
    localStorage.setItem("emoji", "2");
});