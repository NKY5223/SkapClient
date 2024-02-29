import Controller from "./js/Controller.js";
import Game from "./js/Game.js";
import Loader from "./js/Loader.js";
import { DashParticle, ExplosionParticle, FeatherParticle, JetpackParticle, ShrinkingParticle, vecPol } from "./js/Particle.js";
import Renderer from "./js/Renderer.js";

const game = new Game("wss://skap.io", false, msgpack);

// #region Utils
/**
 * Show element
 * @param {HTMLElement} el 
 */
function show(el) { el.hidden = false; }
/**
 * Hide element
 * @param {HTMLElement} el 
 */
function hide(el) { el.hidden = true; }
/**
 * Show and hide elements
 * @param {HTMLElement} open 
 * @param {HTMLElement} close 
 */
function showHide(open, close) {
    close.hidden = true;
    open.hidden = false;
}

let activeScreen = document.querySelector(".screen.active");
/**
 * 
 * @param {HTMLElement} screen 
 * @param {0 | 1} direction 0 = to left, 1 = to right
 */
function changeScreen(screen, direction = 0) {
    let dir = ["left", "right"][+!!direction];
    let notdir = ["right", "left"][+!!direction];

    activeScreen.classList.remove("initial");
    activeScreen.classList.remove("active");
    activeScreen.classList.add("inactive");
    activeScreen.classList.remove(notdir);
    activeScreen.classList.add(dir);
    setTimeout(e => e.classList.contains("inactive") && hide(e), 1000, activeScreen);

    show(screen);
    screen.classList.remove("initial");
    screen.classList.remove("inactive");
    screen.classList.add("active");
    screen.classList.remove(notdir);
    screen.classList.add(dir);

    document.activeElement?.blur();

    activeScreen = screen;
}

/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} tagname
 * @param {string[]} classes 
 * @param {string} id 
 * @param {(string|Node)[]} content
 * 
 * @returns {HTMLElementTagNameMap[T]}
 */
function createElement(tagname, classes = [], id = null, content = []) {
    let el = document.createElement(tagname);
    if (classes) el.classList.add(...classes);
    if (id) el.id = id;
    if (content) el.append(...content);
    return el;
}
// #endregion

// #region Settings
// localStorage.clear();
/** @typedef {import("./js/Controller.js").Trigger} Trigger */

const prevSettingsVersions = [undefined, "meta controls"];
const currentSettingsVersion = "meta controls";
/** @type {{ version?: string, controls: { [name: string]: Trigger[] }, powerPresets: { powers: [number, number], control: Trigger[] }[], dev?: boolean }} */
const settings = (_ => {
    try {
        return JSON.parse(localStorage.getItem("settings") ?? "throw error pls");
    } catch (err) {
        return {
            version: currentSettingsVersion,
            controls: {
                up: [{ trigger: "KeyW", ctrl: -1, alt: 0, shift: 0, meta: 0 }],
                left: [{ trigger: "KeyA", ctrl: -1, alt: 0, shift: 0, meta: 0 }],
                down: [{ trigger: "KeyS", ctrl: -1, alt: 0, shift: 0, meta: 0 }],
                right: [{ trigger: "KeyD", ctrl: 0, alt: 0, shift: 0, meta: 0 }],

                sprint: [{ trigger: "Space", ctrl: -1, alt: 0, shift: 0, meta: 0 }],
                halt: [{ trigger: "ShiftLeft", ctrl: -1, alt: 0, shift: 0, meta: 0 },
                { trigger: "ShiftRight", ctrl: -1, alt: 0, shift: 0, meta: 0 }],
                respawn: [{ trigger: "KeyR", ctrl: -1, alt: 0, shift: 0, meta: 0 }],

                power1: [{ trigger: "LMB", ctrl: 0, alt: 0, shift: 0, meta: 0 }],
                power2: [{ trigger: "RMB", ctrl: 0, alt: 0, shift: 0, meta: 0 }],
                powercombo: [{ trigger: "MMB", ctrl: 0, alt: 0, shift: 0, meta: 0 }],
                powerswap: [{ trigger: "KeyT", ctrl: -1, alt: 0, shift: 0, meta: 0 }],

                zoomIn: [{ trigger: "KeyI", ctrl: -1, alt: 0, shift: 0, meta: 0 }],
                zoomOut: [{ trigger: "KeyU", ctrl: -1, alt: 0, shift: 0, meta: 0 }],

                cameraMode: [{ trigger: "KeyF", ctrl: -1, alt: -1, shift: -1, meta: 0 }],
                cameraReset: [{ trigger: "KeyF", ctrl: 1, alt: -1, shift: 1, meta: 0 }],
                cameraPlayer: [{ trigger: "KeyF", ctrl: -1, alt: -1, shift: 1, meta: 0 }],

                camUp: [{ trigger: "ArrowUp", ctrl: -1, alt: -1, shift: -1, meta: 0 }],
                camLeft: [{ trigger: "ArrowLeft", ctrl: -1, alt: -1, shift: -1, meta: 0 }],
                camDown: [{ trigger: "ArrowDown", ctrl: -1, alt: -1, shift: -1, meta: 0 }],
                camRight: [{ trigger: "ArrowRight", ctrl: -1, alt: -1, shift: -1, meta: 0 }],

                outline: [{ trigger: "KeyO", ctrl: -1, alt: 0, shift: -0, meta: 0 }]
            },
            powerPresets: [],
        };
    }
})();
if (settings.version !== currentSettingsVersion) {
    if (settings.version === undefined) {
        settings.version = "meta controls";
        for (let k in settings.controls) {
            settings.controls[k].forEach(v => v.meta = 0);
            settings.powerPresets.forEach(v => v.control.meta = 0);
        }
    }
}
updateSettings();

function updateSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}
// #endregion

// #region Dev Mode
/** @type {HTMLLinkElement} */
const icon = document.getElementById("iconLink");

if (settings.dev) {
    icon.href = "assets/logos/skapclientdevbg.svg";
    document.title = "SkapClient 🛠";
}
// #endregion

// #region Controls Settings & Settings Menu
const settingsMenu = document.getElementById("settings");
const settingsBackBtn = document.getElementById("settingsBackBtn");
const settingsBtn = document.getElementById("settingsBtn");
let inSettingsMenu = false;

settingsMenu.addEventListener("mousedown", e => e.stopPropagation());
settingsMenu.addEventListener("mouseup", e => e.stopPropagation());
settingsMenu.addEventListener("contextmenu", e => e.stopImmediatePropagation());
settingsMenu.addEventListener("keydown", e => e.stopPropagation());
settingsMenu.addEventListener("keyup", e => e.stopPropagation());

settingsBtn.addEventListener("click", _ => {
    show(settingsMenu);
    controller.disable();
    inSettingsMenu = true;

    chatInput.tabIndex = -1;
    chatSendBtn.tabIndex = -1;
    settingsBtn.tabIndex = -1;

    controller.allUp();
});
settingsBackBtn.addEventListener("click", _ => {
    hide(settingsMenu);
    settingsBackBtn.blur();

    chatInput.tabIndex = 0;
    chatSendBtn.tabIndex = 0;
    settingsBtn.tabIndex = 0;

    controller.enable();
    inSettingsMenu = false;
});

/** @type {HTMLDialogElement} */
const settingsControlOverlay = document.getElementById("controlOverlay");
const settingsController = new Controller(settingsControlOverlay);
settingsController.disable();

const controlsSection = document.getElementById("controlSettings");

for (let name in settings.controls) {
    controlsSection.append(createControlElWithName(name, updateSettings, settings.controls[name]));
}

function createControlElWithName(name, updateCB, triggers = []) {
    const nameEl = createElement("h4", ["controlName"], null, [name]);
    return createElement("div", ["controlWrapper"], null, [
        nameEl, createControlEl(updateCB, triggers)
    ]);
}
function createControlEl(updateCB, triggers = []) {
    function updateTrigger(trigger) {
        return (remove = false) => {
            if (remove) {
                if (triggers.includes(trigger))
                    triggers.splice(triggers.indexOf(trigger), 1);
            }
            update();
        }
    }
    function update() {
        updateCB(triggers);
    }
    const triggerEls = triggers.map(trigger => createTriggerEl(trigger, updateTrigger(trigger)));
    const triggersWrapper = createElement("div", ["triggersWrapper"], null, triggerEls);
    const addButton = createElement("button", ["addTriggerBtn"]);

    addButton.addEventListener("click", async _ => {
        const trigger = await requestTrigger();
        triggers.push(trigger);
        triggersWrapper.append(createTriggerEl(trigger, updateTrigger(trigger)));

        update();
    });

    return createElement("div", ["control"], null, [
        triggersWrapper,
        addButton
    ]);
}

/** 
 * @param {Trigger} trigger 
 * @param {(remove?: boolean) => void} updateCB 
 */
function createTriggerEl(trigger, updateCB) {
    function update() {
        triggerKeyEl.dataset.trigger = trigger.trigger;

        triggerModifierButtonEls.ctrl.dataset.value = trigger.ctrl;
        triggerModifierButtonEls.shift.dataset.value = trigger.shift;
        triggerModifierButtonEls.alt.dataset.value = trigger.alt;
        triggerModifierButtonEls.meta.dataset.value = trigger.meta;

        triggerModifierPlusEls.ctrl.dataset.value = trigger.ctrl;
        triggerModifierPlusEls.shift.dataset.value = trigger.shift;
        triggerModifierPlusEls.alt.dataset.value = trigger.alt;
        triggerModifierPlusEls.meta.dataset.value = trigger.meta;

        triggerModifierMinusEls.ctrl.dataset.value = trigger.ctrl;
        triggerModifierMinusEls.shift.dataset.value = trigger.shift;
        triggerModifierMinusEls.alt.dataset.value = trigger.alt;
        triggerModifierMinusEls.meta.dataset.value = trigger.meta;

        updateCB();
    }
    function modifierUpdater(key) {
        return value => {
            trigger[key] = value;
            update();
        }
    }
    const triggerModifierButtonEls = {
        ctrl: createTriggerModifierEl("ctrl", modifierUpdater("ctrl")),
        shift: createTriggerModifierEl("shift", modifierUpdater("shift")),
        alt: createTriggerModifierEl("alt", modifierUpdater("alt")),
        meta: createTriggerModifierEl("meta", modifierUpdater("meta")),
    };
    const triggerModifierPlusEls = {
        ctrl: createElement("kbd", ["modifierKey", "ctrl", "plus"]),
        shift: createElement("kbd", ["modifierKey", "shift", "plus"]),
        alt: createElement("kbd", ["modifierKey", "alt", "plus"]),
        meta: createElement("kbd", ["modifierKey", "meta", "plus"]),
    };
    const triggerModifierMinusEls = {
        ctrl: createElement("kbd", ["modifierKey", "ctrl", "minus"]),
        shift: createElement("kbd", ["modifierKey", "shift", "minus"]),
        alt: createElement("kbd", ["modifierKey", "alt", "minus"]),
        meta: createElement("kbd", ["modifierKey", "meta", "minus"]),
    };
    const triggerKeyEl = createElement("kbd", ["triggerKey"]);
    triggerKeyEl.tabIndex = 0;
    triggerKeyEl.addEventListener("click", async _ => {
        const newTrigger = await requestTrigger();
        trigger.trigger = newTrigger.trigger;

        update();
    });

    const triggerEl = createElement("div", ["trigger"], null, [
        ...Object.values(triggerModifierPlusEls),
        triggerKeyEl,
        ...Object.values(triggerModifierMinusEls),
    ]);
    const removeBtn = createElement("button", ["deleteTriggerBtn"]);
    removeBtn.addEventListener("click", _ => {
        wrapperEl.remove();
        updateCB(true);
    });
    const wrapperEl = createElement("span", ["triggerWrapper"], null, [
        removeBtn,
        triggerEl,
        triggerModifierButtonEls.ctrl,
        triggerModifierButtonEls.shift,
        triggerModifierButtonEls.alt,
        triggerModifierButtonEls.meta,
    ]);

    update();

    return wrapperEl;
}
const modifierCyclicMap = new Map([["0", 1], ["1", -1], ["-1", 0]]);
function createTriggerModifierEl(type, modifierUpdater) {
    const el = createElement("button", ["modifierBtn", type]);

    el.tabIndex = 0;
    el.title = type;

    el.addEventListener("keyup", e => {
        if (e.code === "Enter" || e.code === "Space") el.click();
    });
    el.addEventListener("click", _ => {
        modifierUpdater(modifierCyclicMap.get(el.dataset.value));
    });

    return el;
}

/** @returns {Promise<Trigger>} */
function requestTrigger() {
    return new Promise((resolve, reject) => {
        if (settingsControlOverlay.open) {
            reject();
            return;
        }

        settingsControlOverlay.showModal();
        settingsController.enable();

        settingsController.onceTrigger(trigger => {
            resolve(trigger);

            settingsController.disable();
            settingsControlOverlay.close();
        });
    });
}

// #endregion

// #region Session Cookie Login
const cookies = document.cookie.split(";").find(s => s.startsWith("session="));
if (cookies) game.session(cookies.slice("session=".length)).then(handleLogin);
// #endregion

// #region Login, Register and Guest
const titleScreen = document.getElementById("titleScreen");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

usernameInput.addEventListener("keydown", e => e.stopPropagation());
passwordInput.addEventListener("keydown", e => e.stopPropagation());
usernameInput.addEventListener("keyup", e => e.stopPropagation());
passwordInput.addEventListener("keyup", e => e.stopPropagation());

loginBtn.addEventListener("click", _ => {
    getToken().then(token => {
        game.login(
            usernameInput.value,
            passwordInput.value,
            token
        ).then(handleLogin).catch(handleLoginFail);
    });
});
const registerBtn = document.getElementById("registerBtn")
registerBtn.addEventListener("click", _ => {
    getToken().then(token => {
        game.register(
            usernameInput.value,
            passwordInput.value
        ).then(handleLogin).catch(handleLoginFail);
    });
});

const guestBtn = document.getElementById("guestBtn");
guestBtn.addEventListener("click", _ => {
    getToken().then(token => {
        game.guest(token).then(handleLogin).catch(handleLoginFail);
    });
});

const loginMsg1 = document.getElementById("loginMsg1");
const loginMsg2 = document.getElementById("loginMsg2");
const loginForm = document.getElementById("loginForm");
const logoutDiv = document.getElementById("logoutDiv");
function handleLogin(msg) {
    document.cookie = "session=" + msg.cookie;

    loginMsg2.innerText = msg.t;
    show(loginMsg2)
    showHide(logoutDiv, loginForm);

    usernameInput.value = "";
    passwordInput.value = "";
};
function handleLoginFail(msg) {
    if (msg.t === "wrong username or password") { loginMsg1.innerText = "Incorrect username or password"; }
    else if (msg.t === "this username is already taken") { loginMsg1.innerText = "This username is already taken"; }
    else loginMsg1.innerText = msg.t;
    show(loginMsg1);
    return;
}
function getToken() {
    return grecaptcha.execute("6Ld2wFMaAAAAAIL8fjR5Bwg6kn3fP2t-b9NFoK_R", { action: "submit" });
}
// #endregion

// #region Logout
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", _ => {
    game.logout().then(_ => {
        loginMsg1.innerText = "Logged out successfully";
        showHide(loginForm, logoutDiv);
    });
});
// #endregion

// #region Changing Room
const changingRoomBtn = document.getElementById("changingRoomBtn");
const changingRoomBackBtn = document.getElementById("changingRoomBackBtn");
const changingRoom = document.getElementById("changingRoom");

/** @type {HTMLInputElement} */
const playerColorInput = document.getElementById("playerBody");

changingRoomBtn.addEventListener("click", _ => {
    game.getStyle().then(({ c: currentColor, h: hats, s: currentHat }) => {
        showPlayerColor(currentColor);
        changeScreen(changingRoom);
    });
});
playerColorInput.addEventListener("input", _ => {
    let c = playerColorInput.value.slice(1).match(/[0-9a-f]{2}/g).map(s => parseInt(s, 16));

    showPlayerColor(c);
});
playerColorInput.addEventListener("change", _ => {
    let c = playerColorInput.value.slice(1).match(/[0-9a-f]{2}/g).map(s => parseInt(s, 16));

    game.changeColor(c);
});

changingRoomBackBtn.addEventListener("click", _ => {
    changeScreen(titleScreen, 1);
});

/** @param {[number, number, number]} c */
function showPlayerColor(c) {
    playerColorInput.value = "#" + c.map(n => n.toString(16).padStart(2, "0")).join("");
    playerColorInput.style.setProperty("--border", c.map(n => 0.75 * n).join());
}
// #endregion

// #region Game List
const browseBtn = document.getElementById("browseBtn");
const gameListRefreshBtn = document.getElementById("gameListRefreshBtn");
const gameList = document.getElementById("gameList");

browseBtn.addEventListener("click", requestGames);
gameListRefreshBtn.addEventListener("click", requestGames);

function requestGames() {
    game.requestGames().then(games => {
        while (gameList.lastElementChild.classList.contains("customGame")) gameList.lastChild.remove();

        gameList.append(...games.map(createGameItem));

        changeScreen(gameList, 0);
    }).catch(console.error);
}
/**
 * @param {import("./js/Game.js").CustomGame} customGame 
 * @returns {HTMLLIElement}
 */
function createGameItem(customGame) {
    const name = createElement("span", ["cgName"], null, [customGame.name]);

    const row1 = createElement("div", ["row"], null, [
        createElement("span", ["cgPlayers"], null, [`Players: ${customGame.players} / ${customGame.capacity}`]),
        createElement("span", ["cgMap"], null, [`Map: ${customGame.mapName} by ${customGame.creator}`])
    ]);

    const row2 = createElement("div", ["row"], null, customGame.private ? [
        createElement("span", ["cgUUID"], null, [`UUID: ${customGame.id}`]),
        createElement("span", ["cgPassword"], null, [`Password: ${customGame.private}`])
    ] : [
        createElement("span", ["cgUUID"], null, [`UUID: ${customGame.id}`])
    ]);

    const el = createElement("button", customGame.private ? ["customGame", "private"] : ["customGame"], null, settings.dev ? [name, row1, row2] : [name, row1]);
    if (customGame.private) {
        if (settings.dev) {
            el.addEventListener("click", _ => {
                game.joinGame(customGame.id, customGame.private);
            });
            return el;
        }
        el.addEventListener("click", _ => {
            game.joinGame(customGame.id, prompt("Enter game password"));
        });
        return el;
    }
    el.addEventListener("click", _ => {
        game.joinGame(customGame.id);
    });
    return el;
}

const gameListBackBtn = document.getElementById("gameListBackBtn");
gameListBackBtn.addEventListener("click", _ => {
    changeScreen(titleScreen, 1);
});
// #endregion

// #region Create Game
const createGameMenuBtn = document.getElementById("createGameMenuBtn");
const createGameMenu = document.getElementById("createGameMenu");
createGameMenuBtn.addEventListener("click", _ => {
    changeScreen(createGameMenu, 0);

    currentMap = null;
    createGameFileName.innerText = "Upload file (defaults to overworld)";

    createGameFile.disabled = false;
    createGameName.disabled = false;
    createGamePerms.disabled = false;
    createGameBtn.disabled = false;
    createGameBtn.innerText = "Create Game!";
});

/** @type {HTMLInputElement} */
const createGameName = document.getElementById("createGameName");
/** @type {HTMLInputElement} */
const createGameFile = document.getElementById("createGameFile");
const createGameFileName = document.getElementById("createGameFileName");
/** @type {HTMLInputElement} */
const createGamePassword = document.getElementById("createGamePassword");
/** @type {HTMLInputElement} */
const createGamePerms = document.getElementById("createGamePerms");
const createGameBtn = document.getElementById("createGameBtn");

let currentMap = null;

game.on("login", _ => {
    createGameName.placeholder = game.USERNAME + "'s custom game";
});
createGameFile.addEventListener("change", _ => {
    if (!createGameFile.files.length) return;
    const file = createGameFile.files[0];

    file.text().then(json => {
        createGameFileName.innerText = "Parsing...";

        createGameFile.disabled = true;
        currentMap = JSON.parse(json);
        createGameFile.disabled = false;

        createGameFileName.innerText = `${currentMap.settings.name} by ${currentMap.settings.creator} (${formatFileSize(file.size)})`;
    });
});
/** @param {number} bytes  */
function formatFileSize(bytes) {
    const order = Math.floor(Math.log(bytes) / Math.log(1000));
    return `${(bytes / 1000 ** order).toFixed(2)} ${["", "K", "M", "G", "T", "?"][Math.min(order, 5)]}B`;
}

createGameBtn.addEventListener("click", _ => {
    createGameFile.disabled = true;
    createGameName.disabled = true;
    createGamePerms.disabled = true;
    createGameBtn.disabled = true;
    createGameBtn.innerText = "Creating Game...";

    const settings = {
        name: createGameName.value,

        perms: createGamePerms.checked,

        private: !!createGamePassword.value,
        password: createGamePassword.value,

        restrictPowers: false,
        powersList: new Array(12).fill().map((_, i) => i),

        uploadMap: false,

        speedrun: false,
    };

    if (!currentMap) {
        game.createGame(null, settings);
        return;
    }
    game.createGame(currentMap, settings);
});
// #endregion

// #region Join
const gameDiv = document.getElementById("gameDiv");
game.once("join", _ => {
    document.activeElement?.blur();
    changeScreen(gameDiv, 0);
});
game.on("join", _ => {
    chatAsClient("Joined game");
});
// #endregion

// #region Player List
const playerList = document.getElementById("playerList");
game.on("updateState", state => {
    while (playerList.firstChild) playerList.lastChild.remove();

    playerList.append(...state.playerList.map(([name, area, dead, frozen]) =>
        createElement("li", ["playerLI", dead ? "dead" : false, frozen ? "frozen" : false].filter(t => t), null, [`${name}: ${area}`])));
});
// #endregion

// #region Controls
const controller = new Controller(document.documentElement, settings.controls);

["up", "left", "down", "right", "halt", "sprint", "power1", "power2", "powercombo", "respawn"].forEach(name => {
    controller.onDown(name, e => game.input(name, true));
    controller.onUp(name, e => game.input(name, false));
});


controller.onDown("outline", e => renderer.settings.outline.render = !renderer.settings.outline.render);

game.on("join", _ => {
    controller.enable();
});
gameDiv.addEventListener("contextmenu", e => e.preventDefault());

let mouseX = 0;
let mouseY = 0;
gameDiv.addEventListener("mousemove", e => {
    if (!game.GAME) return;

    mouseX = e.clientX;
    mouseY = e.clientY;

    mouseAim(mouseX, mouseY);
});
game.on("updateState", _ => mouseAim(mouseX, mouseY));
function mouseAim(x, y) {
    game.aimAt(
        (x - gameDiv.clientWidth / 2) / renderer.camera.scale + renderer.camera.x,
        (y - gameDiv.clientHeight / 2) / renderer.camera.scale + renderer.camera.y
    );
}

document.addEventListener("blur", _ => {
    if (!game.GAME) return;
    controller.allUp();
});
// #endregion

// #region Powers
const powerSlot1 = document.getElementById("powerSlot1");
const powerSlot2 = document.getElementById("powerSlot2");
const powerWrapper1 = document.getElementById("powerWrapper1");
const powerWrapper2 = document.getElementById("powerWrapper2");
const powerTray1 = document.getElementById("powerTray1");
const powerTray2 = document.getElementById("powerTray2");
const powerItems1 = [];
const powerItems2 = [];
const allPowers = new Array(14).fill().map((_, i) => i);

for (let power of allPowers) {
    let el = createPowerItem(power, 0);

    hide(el);
    powerTray1.append(el);
    powerItems1.push(el);
}
for (let power of allPowers) {
    let el = createPowerItem(power, 1);

    hide(el);
    powerTray2.append(el);
    powerItems2.push(el);
}
function createPowerItem(power, slot) {
    let el = createElement("li", ["powerItem"]);
    el.dataset.power = power;

    el.addEventListener("click", _ => {
        game.changePower(power, slot, false, settings.dev);
    });

    return el;
}

game.on("unlockPower", power => {
    if (!allPowers.includes(power)) return;

    if (powerWrapper1.hidden) show(powerWrapper1);
    else if (powerWrapper2.hidden) show(powerWrapper2);

    show(powerItems1[power]);
    show(powerItems2[power]);
});
game.on("changePower", ({ power, slot }) => {
    [powerSlot1, powerSlot2][slot].dataset.power = power;
});
game.on("join", _ => {
    if (game.powers.length >= 1) powerSlot1.dataset.power = game.activePowers[0];
    if (game.powers.length >= 2) powerSlot2.dataset.power = game.activePowers[1];
});

game.on("updateState", _ => {
    powerSlot1.style.setProperty("--cooldown", game.state.infos.oneCooldown || 0);
    powerSlot1.style.setProperty("--heat", game.state.infos.oneHeat || 0);
    powerSlot2.style.setProperty("--cooldown", game.state.infos.twoCooldown || 0);
    powerSlot2.style.setProperty("--heat", game.state.infos.twoHeat || 0);

    if (settings.dev) return;
    powerWrapper1.dataset.disabled = +game.state.me.states.includes("Died");
    powerWrapper2.dataset.disabled = +game.state.me.states.includes("Died");
});

controller.onDown("powerswap", _ => {
    game.changePower(game.activePowers[1], 0, false, settings.dev);
});
// #endregion

// #region Power Presets (Settings)
const powerPresetsDiv = document.getElementById("powerPresets");
const addPowerPresetBtn = document.getElementById("addPowerPreset");

// me when stupid (i lazy but i fucking despise this)

// truly one of the typeofs of all time
/** 
 * @param {(typeof settings)["powerPresets"][number]} powerPreset 
 * @param {(powerPreset: (typeof settings)["powerPresets"][number], remove?: boolean) => void} updateCB
 */
function createPowerPresetEl(powerPreset, updateCB) {
    function update(remove = false) {
        updateCB(powerPreset, remove);
    }
    const powersEl = createPowerPresetPowersEl(powerPreset.powers, _ => update());
    const controlEl = createControlEl(_ => update(), powerPreset.control);
    const removeBtn = createElement("button", ["deletePowerPresetBtn"]);

    removeBtn.addEventListener("click", _ => {
        el.remove();
        update(true);
    });
    const el = createElement("div", ["powerPreset"], null, [
        powersEl, removeBtn,
        controlEl
    ]);

    return el;
}
/** 
 * @param {(typeof settings)["powerPresets"][number]["powers"]} powers
 * @param {(powers: [number, number]) => void} updateCB
 */
function createPowerPresetPowersEl(powers, updateCB) {
    function update() {
        updateCB(powers);
    }
    const power0 = createPowerPresetPowerEl(powers[0], power => { powers[0] = power; update() });
    const power1 = createPowerPresetPowerEl(powers[1], power => { powers[1] = power; update() });
    return createElement("div", ["powerPresetPowers"], null, [
        power0, power1
    ]);
}
/** 
 * @param {(typeof settings)["powerPresets"][number]["powers"][number]} power 
 * @param {(power: number) => void} updateCB
 */
function createPowerPresetPowerEl(power, updateCB) {
    const el = createElement("input", ["powerPresetPower"]);
    el.type = "number";
    el.min = Math.min(...allPowers);
    el.max = Math.max(...allPowers);
    el.value = power;

    const bg = createElement("div", ["powerPresetPowerBG"], null, [el]);
    bg.dataset.power = power;

    el.addEventListener("input", _ => {
        if (el.value === "") return;
        const val = +el.value;
        if (!allPowers.includes(val)) return;
        updateCB(val);
        bg.dataset.power = val;
    });
    return bg;
}
addPowerPresetBtn.addEventListener("click", _ => {
    /** @type {(typeof settings)["powerPresets"][number]} */
    const powerPreset = {
        powers: [0, 0],
        control: []
    };
    settings.powerPresets.push(powerPreset);
    console.log(settings.powerPresets);
    powerPresetsDiv.append(createPowerPresetEl(powerPreset, updatePowerPresets));
    updatePowerPresets();
});

powerPresetsDiv.append(...settings.powerPresets.map(powerPreset =>
    createPowerPresetEl(powerPreset, updatePowerPresets)
));

function updatePowerPresets(powerPreset, remove = false) {
    // console.log(powerPreset, remove);
    if (remove) {
        settings.powerPresets.splice(settings.powerPresets.indexOf(powerPreset), 1);
    }
    for (let name in controller.controls) {
        if (name.startsWith("powerPreset")) controller.deleteControl(name);
    }
    for (let id in settings.powerPresets) {
        const powerPreset = settings.powerPresets[id];
        controller.addControl(`powerPreset${id}`, powerPreset.control);
        controller.onDown(`powerPreset${id}`, _ => {
            game.changePower(powerPreset.powers[0], 0, true, settings.dev);
            game.changePower(powerPreset.powers[1], 1, true, settings.dev);
        });
    }
    updateSettings();
}
// #endregion

// #region Chat Message

// #region Receive Chat Message
const chatDiv = document.getElementById("chatDiv");

const inviteRegex = /^INVITE ([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?: (.+))?$/;
const inviteAuthors = ["SkapClientAdmin"];
game.on("message", msg => {
    const content = msg.content.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    const { author, level } = msg;

    if (inviteAuthors.includes(author)) {
        const inviteMatch = content.match(inviteRegex);
        if (inviteMatch) {
            const id = inviteMatch[1];
            createChatMsg(author, level, createChatInvite(id), true);
            return;
        }
    }

    createChatMsg(author, level, content);
});

/** @param {string} id  */
function createChatInvite(id) {
    const el = createElement("button", ["invite"], null, ["Invitation to custom game"]);

    if (settings.dev) el.dataset.id = id;

    el.addEventListener("click", _ => {
        el.disabled = true;
        el.innerText = "Joining...";
        game.joinGame(id).then(_ => {
            el.innerText = "Joined!";
        });
    });

    return el;
}

const HUD = document.getElementById("HUD");
HUD.addEventListener("mousedown", e => e.stopPropagation());
HUD.addEventListener("mouseup", e => e.stopPropagation());
HUD.addEventListener("contextmenu", e => e.stopPropagation());
HUD.addEventListener("keydown", e => e.stopPropagation());
HUD.addEventListener("keyup", e => e.stopPropagation());

function createChatMsg(author = "Author", level = 0, content = "Message", html = false) {
    let chatMsg = html ? (
        createElement("p", ["chatMsg"], null, [
            createElement("span", ["author"], null, [author + ":"]),
            content
        ])
    ) : (
        createElement("p", ["chatMsg"], null, [
            createElement("span", ["author"], null, [author + ":"]),
            createElement("span", ["message"], null, [content])
        ])
    );
    chatMsg.dataset.author = author;
    chatMsg.dataset.level = level;

    let shouldScroll = chatDiv.scrollHeight - chatDiv.scrollTop - chatDiv.clientHeight < 16;

    chatDiv.append(chatMsg);

    if (shouldScroll) chatDiv.scrollTo(0, chatDiv.scrollHeight);

    return chatMsg;
}
function chatAsClient(content = "Message", html = false) {
    createChatMsg("[CLIENT]", 1, content, html);
}
// #endregion

// #region Send Chat Message
/** @type {HTMLInputElement} */
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

chatInput.addEventListener("keydown", e => {
    e.stopPropagation();
    switch (e.code) {
        case "Enter": {
            if (chatInput.value.match(/\S/)) sendChatMessage(chatInput.value);
            chatInput.value = "";
            chatInput.blur();

            setCharsLeft();
            break;
        }
        case "Escape": {
            chatInput.blur();
            break;
        }
    }
});
chatSendBtn.addEventListener("click", _ => {
    if (chatInput.value.match(/\S/)) sendChatMessage(chatInput.value);
    chatInput.value = "";
    chatSendBtn.blur();
});
chatInput.addEventListener("focus", _ => {
    if (!game.GAME) return;
    ["up", "left", "down", "right", "halt", "sprint", "power1", "power2", "powercombo", "respawn"].forEach(k => game.input(k, false));
});
function sendChatMessage(msg) {
    game.sendChatMessage(msg);
}
// #endregion

// #region Chars Left
const charsLeftSpan = document.getElementById("charsLeft");
chatInput.addEventListener("input", _ => {
    setCharsLeft();
});
function setCharsLeft(v = chatInput.value) {
    charsLeftSpan.dataset.chars = 200 - calcMessageLength(v);
}
function calcMessageLength(msg) {
    return msg.length;
}

document.addEventListener("keydown", e => {
    if (inSettingsMenu) return;
    if (document.activeElement !== chatInput && e.code === "Enter" && game.GAME) {
        chatInput.focus();
    }
    if (document.activeElement !== chatInput && e.code === "Slash" && game.GAME) {
        chatInput.focus();
    }
});
// #endregion

// #region Ping
let pingTime = null;
game.on("sendMessage", msg => {
    if (msg.toLowerCase() !== "ping") return;
    if (pingTime !== null) {
        chatAsClient("Already pinging");
        return;
    }
    pingTime = Date.now();
});
game.on("message", ({ content, author }) => {
    if (content.toLowerCase() !== "ping") return;
    if (author !== game.USERNAME) return;
    if (pingTime === null) {
        return;
    }
    chatAsClient(`Pong! ${Date.now() - pingTime}ms`);
    pingTime = null;
});
// #endregion

// #region Commands
/** @type {{ name: string, req?: () => boolean, preventSend?: boolean, execute: (...args: string[]) => void | string | [string, false] | [Node | string, true] }[]} */
const commands = [
    {
        name: "clear",
        preventSend: true,
        execute: _ => {
            Array.from(chatDiv.children).forEach(child => child.remove());
            return [createElement("span", ["clearedChatMsg"], null, ["Cleared chat"]), true];
        }
    },
    {
        name: "test",
        preventSend: true,
        req: _ => settings.dev,
        execute: (...args) => {
            return `/test args: ${args.join(", ")}`;
        }
    },
    {
        name: "eval",
        preventSend: true,
        execute: (...args) => {
            (async () => {
                if (!confirm(
                    "Are you sure you want to run this script?\nIt could give the authors control of your account.\n5"
                )) return;
                if (!confirm(
                    "Are you SURE you want to run this script?\nIt could give the authors control of your account, or grab your IP.\n4"
                )) return;
                if (!confirm(
                    "Are you ABSOLUTELY SURE you want to run this script?\nIt could give the authors control of your account, or grab your IP, or worse.\n3"
                )) return;
                if (!confirm(
                    "Do you trust the authors of this script and are ABSOLUTELY SURE you want to run this script?\nIt could give the authors control of your account, or grab your IP, or worse.\nCancel now, or prepare to face the consequences.\n2"
                )) return;
                if (!confirm(
                    "Final warning. It is not my fault if you lose your account or get doxxed, alright?\n1"
                )) return;
                chatAsClient("Fetching script...");
                try {
                    const url = args[0];
                    const res = await fetch(url);
                    const text = await res.text();
                    chatAsClient("Running script.");
                    // !!!!! danger
                    const result = eval(text);
                    return `Script result: ${JSON.stringify(result)}`;
                } catch (err) {
                    chatAsClient("Could not fetch/run script.");
                }
            })();
            return;
        }
    },
];

const argRegex = / (?:(?:"(.+?)")|(\S+))/g;
game.on("sendMessage", /** @param {string} msg */ msg => {
    return commands.reduce((result, command) => {
        if (!msg.startsWith(`/${command.name}`)) return result;
        if (command.req && !command.req()) return result;

        const args = Array.from(msg.matchAll(argRegex)).map(a => a[1] ?? a[2]);
        const output = command.execute(...args);

        if (output) {
            if (typeof output === "string") chatAsClient(output);
            else chatAsClient(...output);
        }
        return result &&= !command.preventSend;
    }, true);
});
// #endregion

// #endregion

// #region Particles
const addParticle = new Map([
    ["explosion", particle => {
        const { x, y } = particle;
        renderer.particles.addParticle(new ExplosionParticle({ pos: { x, y } }));
    }],
    ["shrinking", particle => {
        const { x, y } = particle;
        for (let i = 0; i < 20; i++)
            renderer.particles.addParticle(new ShrinkingParticle({ pos: { x, y } }));
    }],
    ["dash", particle => {
        const { x, y, dir } = particle;
        renderer.particles.addParticle(new DashParticle({ pos: { x, y }, dir }));
    }],
    ["jetpack", player => {
        const { x, y } = player.pos;
        const { x: vx, y: vy } = player.vel;
        for (let i = 0; i < 10; i++)
            renderer.particles.addParticle(new JetpackParticle({
                pos: {
                    x: x - vx * i / 100,
                    y: y - vy * i / 100
                },
                vel: { x: vx, y: vy }
            }));
    }],
    ["feather", player => {
        if (Math.random() > 0.1) return;
        const { x, y } = player.pos;
        renderer.particles.addParticle(new FeatherParticle({ pos: { x, y } }));
    }]
]);
const addJetpackParticle = addParticle.get("jetpack");
const addFeatherParticle = addParticle.get("feather");
game.on("updateState", _ => {
    game.state.particles.forEach(particle => {
        if (addParticle.has(particle.type)) addParticle.get(particle.type)(particle);
    });
    Object.values(game.state.players).forEach(player => {
        if (player.states.includes("jetpack")) {
            addJetpackParticle(player);
        }
        if (player.states.includes("Feather") && player.vel.y) {
            addFeatherParticle(player);
        }
    });
});
game.on("initMap", _ => {
    renderer.particles.clearParticles();
});
// #endregion

// #region Camera
const nextCameraMode = Object.fromEntries(["player", "map"/*, "fit"*/].map((v, i, a) => [v, a[(i + 1) % a.length]]));
controller.onDown("cameraMode", _ => {
    const next = nextCameraMode[renderer.camera.mode] ?? "player";
    renderer.camera.mode = next;
    switch (next) {
        case "player": {
            renderer.camera.offsetX = renderer.camera.x - game.state.players[renderer.camera.player]?.pos?.x ?? 0;
            renderer.camera.offsetY = renderer.camera.y - game.state.players[renderer.camera.player]?.pos?.y ?? 0;
            chatAsClient(`Camera mode: spectating ${game.state.players[renderer.camera.player]?.name ?? ""}`);
            break;
        }
        case "map": {
            renderer.camera.offsetX = renderer.camera.x;
            renderer.camera.offsetY = renderer.camera.y;
            chatAsClient("Camera mode: fixed");
            break;
        }
        case "fit": {
            chatAsClient("Camera mode: keep players in frame");
            break;
        }
    }
});
controller.onDown("cameraPlayer", _ => {
    if (renderer.camera.mode !== "player") return;
    const prev = renderer.camera.player;
    const next = (
        ids => ids.includes(prev)
            ? ids[(ids.indexOf(prev) + 1) % ids.length]
            : game.state.infos.id
    )(Object.keys(game.state.players));

    // console.log(next, game.state.players[next]);
    renderer.camera.offsetX += game.state.players[prev]?.pos?.x ?? 0;
    renderer.camera.offsetY += game.state.players[prev]?.pos?.y ?? 0;
    renderer.camera.player = next;
    renderer.camera.offsetX -= game.state.players[next]?.pos?.x ?? 0;
    renderer.camera.offsetY -= game.state.players[next]?.pos?.y ?? 0;
    chatAsClient(`Camera: spectating ${game.state.players[renderer.camera.player]?.name ?? ""}`)
});
controller.onDown("cameraReset", _ => {
    switch (renderer.camera.mode) {
        case "player": {
            renderer.camera.offsetX = renderer.camera.offsetY = 0;
            renderer.camera.scale = 5;
            break;
        }
        case "map": {
            renderer.camera.offsetX = game.map.areaSize.x / 2;
            renderer.camera.offsetY = game.map.areaSize.y / 2;
            renderer.camera.scale = 5;
            break;
        }
        default: {
            return;
        }
    }
    chatAsClient("Camera: reset");
});
controller.onDown("zoomIn", e => {
    if (renderer.camera.mode === "fit") renderer.camera.maxFitScale *= 1.25;
    else renderer.camera.scale *= 1.25;
});
controller.onDown("zoomOut", e => {
    if (renderer.camera.mode === "fit") renderer.camera.maxFitScale /= 1.25;
    else renderer.camera.scale /= 1.25;
});
// #endregion

// #region Render
const canvas = document.getElementById("canvas");
const renderer = new Renderer(canvas, game);

let stopRender = false;
let prevFrame = null;
const cameraSpeed = 0.25;
game.once("join", _ => {
    function renderLoop(now) {
        const dt = now - prevFrame;

        let start = performance.now();

        renderer.camera.offsetX += cameraSpeed / renderer.camera.scale * dt * (controller.currentDown.has("camRight") - controller.currentDown.has("camLeft"));
        renderer.camera.offsetY += cameraSpeed / renderer.camera.scale * dt * (controller.currentDown.has("camDown") - controller.currentDown.has("camUp"));

        renderer.render(game.map, game.state, now, dt, game.newState, !!settings.dev);

        let end = performance.now();

        if (prevFrame) updateFPS(dt);
        prevFrame = now;

        updateMSPF(end - start);

        requestAnimationFrame(renderLoop);
    }
    if (!stopRender) requestAnimationFrame(renderLoop);
});
// #endregion

// #region Fuel
const fuelBar = document.getElementById("fuelBar");
if (settings.dev) hide(fuelBar);

game.on("updateState", _ => {
    fuelBar.style.setProperty("--fuel", game.state.me.fuel);
    fuelBar.style.setProperty("--prevFuel", game.state.me.prevFuel ? game.state.me.prevFuel[0] : 10);
});
// #endregion

// #region Debug
const DEBUG_LIMIT = 60;
const debugDiv = document.getElementById("debug");

if (settings.dev) show(debugDiv);

function debugFormat(number = 0, places = 0) {
    if (isNaN(number)) return "NaN";
    if (number === Infinity) return "∞";
    if (number === -Infinity) return "-∞";

    return number.toFixed(places);
}

// #region Pos, Vel
const posXSpan = document.getElementById("posX");
const posYSpan = document.getElementById("posY");
const velXSpan = document.getElementById("velX");
const velYSpan = document.getElementById("velY");
const velSpan = document.getElementById("vel");
game.on("updateState", _ => {
    let me = game.state.players[game.state.infos.id];

    posXSpan.innerText = debugFormat(me.pos.x, 2);
    posYSpan.innerText = debugFormat(me.pos.y, 2);

    velXSpan.innerText = debugFormat(me.vel.x, 2);
    velYSpan.innerText = debugFormat(me.vel.y, 2);

    velSpan.innerText = debugFormat(Math.hypot(me.vel.x, me.vel.y), 2);
});
// #endregion

// #region Aim
const aimXSpan = document.getElementById("aimX");
const aimYSpan = document.getElementById("aimY");
const aimSpan = document.getElementById("aim");
game.on("aim", aim => {
    let me = game.state.me;

    aimXSpan.innerText = debugFormat(aim.x, 2);
    aimYSpan.innerText = debugFormat(aim.y, 2);
    aimSpan.innerText = debugFormat(Math.hypot(me.pos.x - aim.x, me.pos.y - aim.y), 2);
});
// #endregion

// #region FPS
const mspf = [];

const mspfMeanSpan = document.getElementById("mspfMean");
const mspfStdDevSpan = document.getElementById("mspfStdDev");

function updateMSPF(ms) {
    mspf.push(ms);
    if (mspf.length < DEBUG_LIMIT) return; // Wait until enough data is collected

    while (mspf.length > DEBUG_LIMIT) mspf.shift();

    let mean = calcMean(mspf);
    mspfMeanSpan.innerText = debugFormat(mean, 2);
    mspfStdDevSpan.innerText = debugFormat(calcStdDev(mspf, mean), 2);
}

const fpsms = [];
const fpsSpan = document.getElementById("fps");
function updateFPS(ms) {
    fpsms.push(ms);
    if (fpsms.length < DEBUG_LIMIT) return; // Wait until enough data is collected

    while (fpsms.length > DEBUG_LIMIT) fpsms.shift();

    let mean = calcMean(fpsms);

    fpsSpan.innerText = debugFormat(1000 / mean, 0);
}
// #endregion

// #region TPS
const mspt = [];
const msptMeanSpan = document.getElementById("msptMean");
const msptStdDevSpan = document.getElementById("msptStdDev");
const tpsSpan = document.getElementById("tps");

function updateMSPT(ms) {
    mspt.push(ms);
    if (mspt.length < DEBUG_LIMIT) return; // Wait until enough data is collected

    while (mspt.length > DEBUG_LIMIT) mspt.shift();

    let mean = calcMean(mspt);
    msptMeanSpan.innerText = debugFormat(mean, 2);
    msptStdDevSpan.innerText = debugFormat(calcStdDev(mspt, mean), 2);

    tpsSpan.innerText = debugFormat(1000 / mean, 0);
}

let prevTick = null;
game.on("updateState", _ => {
    if (prevTick === null) prevTick = Date.now();

    let now = Date.now();
    updateMSPT(now - prevTick);
    prevTick = now;
});
// #endregion

// #region WS
/** @type {number[]} */
const wsReceive = [];
/** @type {number[]} */
const wsSend = [];

const wsReceiveSpan = document.getElementById("wsReceive");
const wsSendSpan = document.getElementById("wsSend");

game.socket.ws.addEventListener("message", e => {
    /** @type {number} */
    let b = e.data.byteLength;
    wsReceive.push(b);
});
game.socket.onSend(data => {
    /** @type {number} */
    let b = msgpack.encode(data).byteLength;
    wsSend.push(b);
});

game.once("join", _ => {
    let lastT = null;
    setInterval(_ => {
        if (lastT === null) {
            lastT = Date.now();
            return;
        }

        let now = Date.now();
        let t = (now - lastT) / 1000;

        wsReceiveSpan.innerText = debugFormat(calcSum(wsReceive) / t, 0);
        wsSendSpan.innerText = debugFormat(calcSum(wsSend) / t, 0);

        wsReceive.length = 0;
        wsSend.length = 0;
        lastT = now;
    }, 1000);

})
// #endregion


// #region Mathematics
/**
 * @param {number[]} arr 
 */
function calcSum(arr, f = x => x) {
    return arr.reduce((acc, n) => acc + f(n), 0);
}
/**
 * @param {number[]} arr 
 */
function calcMean(arr) {
    return arr.reduce((acc, n) => acc + n, 0) / arr.length;
}
/**
 * @param {number[]} arr 
 * @param {number?} mean 
 */
function calcStdDev(arr, mean = calcMean(arr)) {
    return Math.sqrt(calcMean(arr.map(n => n - mean).map(n => n * n)));
}
// #endregion

// #endregion

// #region Loading
Loader.webSocket(game.socket.ws);

const loadingScreen = document.getElementById("loadingScreen");
/** @type {HTMLProgressElement} */
const loadingBar = document.getElementById("loadingBar");
const skipLoadingBtn = document.getElementById("skipLoading");
const loadingHeader = document.getElementById("loading");


Loader.onimgload = Loader.onwsload = _ => {
    loadingBar.value = Loader.loaded / Loader.promises.length;
};
Loader.onimgerror = (img, err) => {
    try {
        loadingHeader.innerText = `Failed to load ${new URL(img.src).pathname.split("/").pop()}.`;
    } catch (err) {
        loadingHeader.innerText = "Failed to load an image";
    }
};
Loader.onwserror = (ws, err) => {
    console.error(err);
    loadingHeader.innerText = `Failed to connect to ${ws.url}.`;
};

skipLoadingBtn.addEventListener("click", _ => {
    if (activeScreen !== loadingScreen) return;
    show(backgroundDiv);
    changeScreen(titleScreen);
});

const backgroundDiv = document.getElementById("background");
Loader.start().then(
    _ => {
        if (activeScreen !== loadingScreen) return;
        show(backgroundDiv);
        changeScreen(titleScreen);
    },
    err => {
        hide(loadingBar);
        console.error("FUCK");
    }
);
// #endregion

// #region Easter Eggs
const title = document.getElementById("title");
game.on("message", msg => {
    if (msg.level < 0) return;
    if (msg.author !== "SkapClientAdmin") return;

    if (msg.content.match(/^do a barrel roll([!]*|\.)$/i)) {
        renderer.doABarrelRoll();
    }
});
if (settings.dev) title.classList.add("devMode");
let hueRotateStart = null;
let canToggle = true;
title.addEventListener("click", e => {
    if (e.detail < 5) canToggle = true;
    if (e.detail >= 5) {
        if (!canToggle) return;
        canToggle = false;

        if (hueRotateStart) hueRotateStart = null;
        else {
            if (!confirm("Activating this will result in flashing lights and may be nauseating. Are you sure?")) return;
            hueRotateStart = Date.now();
        }
    }
});
function hueRotate() {
    window.requestAnimationFrame(hueRotate);

    const t = hueRotateStart ? (Date.now() - hueRotateStart) / 10 : 0;
    document.body.style.setProperty("--hue-rotate", `${t}deg`);
}
window.requestAnimationFrame(hueRotate);
// #endregion

// #region WebSocket Closing
game.on("wsClose", _ => {
    chatAsClient("🔌 Connection to skap.io server closed. Refresh your page to reconnect.");
    console.error("websocket died \n%csmh prookl stop crashing the damn game", "font-size: 0.6em; color: #c0ffc0");
});
// #endregion

// #region beforeunload
window.addEventListener("beforeunload", e => {
    // e.preventDefault();
});
// #endregion

// #region Exposing to console
if (settings.dev) window.SkapClient = {
    game,
    renderer,
    controller,
    createChatMsg,
    settings,
    updateSettings,
    commands
};
// #endregion
