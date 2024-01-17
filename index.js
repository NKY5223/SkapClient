import Controller from "./js/Controller.js";
import Game from "./js/Game.js";
import Loader from "./js/Loader.js";
import { DashParticle, ExplosionParticle, FeatherParticle, JetpackParticle, ShrinkingParticle, vecPol } from "./js/Particle.js";
import Renderer from "./js/Renderer.js";

const game = new Game("wss://skap.io", false, msgpack);
// window.game = game; // Expose game to console

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
 * @param {keyof HTMLElementTagNameMap} tagname
 * @param {string[]} classes 
 * @param {string} id 
 * @param {(string|Node)[]} content
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

/** @type {{ controls: { [name: string]: Trigger[] }, powerPresets: { powers: [number, number], control: Trigger[] }[], SUPER_SECRET_DEV_MODE_REAL: boolean }} */
const settings = (_ => {
    try {
        return JSON.parse(localStorage.getItem("settings") ?? "throw error pls");
    } catch (err) {
        return {
            controls: {
                up: [{ trigger: "KeyW", ctrl: -1, alt: 0, shift: 0 }],
                left: [{ trigger: "KeyA", ctrl: -1, alt: 0, shift: 0 }],
                down: [{ trigger: "KeyS", ctrl: -1, alt: 0, shift: 0 }],
                right: [{ trigger: "KeyD", ctrl: 0, alt: 0, shift: 0 }],

                sprint: [{ trigger: "Space", ctrl: -1, alt: 0, shift: 0 }],
                halt: [{ trigger: "ShiftLeft", ctrl: -1, alt: 0, shift: 0 },
                { trigger: "ShiftRight", ctrl: -1, alt: 0, shift: 0 }],
                respawn: [{ trigger: "KeyR", ctrl: -1, alt: 0, shift: 0 }],

                power1: [{ trigger: "LMB", ctrl: 0, alt: 0, shift: 0 }],
                power2: [{ trigger: "RMB", ctrl: 0, alt: 0, shift: 0 }],
                powercombo: [{ trigger: "MMB", ctrl: 0, alt: 0, shift: 0 }],
                powerswap: [{ trigger: "KeyT", ctrl: -1, alt: 0, shift: 0 }],

                zoomIn: [{ trigger: "KeyI", ctrl: -1, alt: 0, shift: 0 }],
                zoomOut: [{ trigger: "KeyU", ctrl: -1, alt: 0, shift: 0 }],

                cameraMode: [{ trigger: "KeyF", ctrl: -1, alt: -1, shift: -1 }],
                cameraReset: [{ trigger: "KeyF", ctrl: 1, alt: -1, shift: 1 }],
                cameraPlayer: [{ trigger: "KeyF", ctrl: -1, alt: -1, shift: 1 }],

                camUp: [{ trigger: "ArrowUp", ctrl: -1, alt: -1, shift: -1 }],
                camLeft: [{ trigger: "ArrowLeft", ctrl: -1, alt: -1, shift: -1 }],
                camDown: [{ trigger: "ArrowDown", ctrl: -1, alt: -1, shift: -1 }],
                camRight: [{ trigger: "ArrowRight", ctrl: -1, alt: -1, shift: -1 }],

                outline: [{ trigger: "KeyO", ctrl: -1, alt: 0, shift: -0 }]
            },
            powerPresets: [
                { powers: [7, 0], control: [{ trigger: "Digit1", ctrl: -1, alt: 0, shift: 0 }] },
                { powers: [3, 1], control: [{ trigger: "Digit2", ctrl: -1, alt: 0, shift: 0 }] },
                { powers: [2, 9], control: [{ trigger: "Digit3", ctrl: -1, alt: 0, shift: 0 }] },
                { powers: [4, 2], control: [{ trigger: "Digit4", ctrl: -1, alt: 0, shift: 0 }] },
                { powers: [6, 11], control: [{ trigger: "Digit5", ctrl: -1, alt: 0, shift: 0 }] },
                { powers: [12, 13], control: [{ trigger: "Digit6", ctrl: -1, alt: 0, shift: 0 }] },
            ],
        };
    }
})();
updateSettings();

function updateSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}
// window.settings = settings;
// window.updateSettings = updateSettings;

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
    
    controller.allUp();
});
settingsBackBtn.addEventListener("click", _ => {
    hide(settingsMenu);
    settingsBackBtn.blur();

    controller.enable();
    inSettingsMenu = false;
});
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

    const el = createElement("button", customGame.private ? ["customGame", "private"] : ["customGame"], null, settings.SUPER_SECRET_DEV_MODE_REAL ? [name, row1, row2] : [name, row1]);
    if (customGame.private) {
        if (settings.SUPER_SECRET_DEV_MODE_REAL) {
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
// window.controller = controller; // Expose controller to console

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
const allPowers = new Array(settings.SUPER_SECRET_DEV_MODE_REAL ? 14 : 12).fill().map((_, i) => i);

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
        game.changePower(power, slot, false, settings.SUPER_SECRET_DEV_MODE_REAL);
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

    if (settings.SUPER_SECRET_DEV_MODE_REAL) return;
    powerWrapper1.dataset.disabled = +game.state.me.states.includes("Died");
    powerWrapper2.dataset.disabled = +game.state.me.states.includes("Died");
});

controller.onDown("powerswap", _ => {
    game.changePower(game.activePowers[1], 0, false, settings.SUPER_SECRET_DEV_MODE_REAL);
});
// #endregion

// #region Power Presets
const powerPresets = [];
function updatePowerPresets(presets) {
    for (let id in powerPresets) {
        controller.deleteControl("POWERPRESET_" + id);
    }
    for (let [id, { control, powers }] of Object.entries(presets)) {
        controller.addControl("POWERPRESET_" + id, control);
        controller.onDown("POWERPRESET_" + id, _ => {
            if (!game.powers.includes(powers[0]) || !game.powers.includes(powers[1])) return;

            game.changePower(powers[0], 0, true, settings.SUPER_SECRET_DEV_MODE_REAL);
            game.changePower(powers[1], 1, true, settings.SUPER_SECRET_DEV_MODE_REAL);
        });
    }
}
updatePowerPresets(settings.powerPresets);
// #endregion

// #region Chat Message

// #region Receive Chat Message
const chatDiv = document.getElementById("chatDiv")
game.on("message", msg => {
    createChatMsg(msg.author, msg.level, msg.content.replaceAll("&lt;", "<").replaceAll("&gt;", ">"));
});

const HUD = document.getElementById("HUD");
HUD.addEventListener("mousedown", e => e.stopPropagation());
HUD.addEventListener("mouseup", e => e.stopPropagation());
HUD.addEventListener("contextmenu", e => e.stopPropagation());
HUD.addEventListener("keydown", e => e.stopPropagation());
HUD.addEventListener("keyup", e => e.stopPropagation());

function createChatMsg(author = "Author", level = 0, content = "Message", html = false) {
    let chatMsg = html ? (
        createElement("p", ["chatMsg"], null, [content])
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
// expose to console
// window.createChatMsg = createChatMsg;
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
        req: _ => settings.SUPER_SECRET_DEV_MODE_REAL,
        execute: (...args) => {
            return `/test args: ${args.join(", ")}`;
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
const addParticle = {
    explosion: particle => {
        const { x, y } = particle;
        renderer.particles.addParticle(new ExplosionParticle({ pos: { x, y } }));
    },
    shrinking: particle => {
        const { x, y } = particle;
        for (let i = 0; i < 20; i++)
            renderer.particles.addParticle(new ShrinkingParticle({ pos: { x, y } }));
    },
    dash: particle => {
        const { x, y, dir } = particle;
        renderer.particles.addParticle(new DashParticle({ pos: { x, y }, dir }));
    },
    jetpack: player => {
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
    },
    feather: player => {
        if (Math.random() > 0.1) return;
        const { x, y } = player.pos;
        renderer.particles.addParticle(new FeatherParticle({ pos: { x, y } }));
    }
};
game.on("updateState", _ => {
    game.state.particles.forEach(particle => {
        if (particle.type in addParticle) addParticle[particle.type](particle);
    });
    Object.values(game.state.players).forEach(player => {
        if (player.states.includes("jetpack")) {
            addParticle.jetpack(player);
        }
        if (player.states.includes("Feather") && player.vel.y) {
            addParticle.feather(player);
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
// window.renderer = renderer; // Expose renderer to console

let stopRender = false;
let prevFrame = null;
const cameraSpeed = 0.02;
game.once("join", _ => {
    function renderLoop(now) {
        const dt = now - prevFrame;

        let start = performance.now();

        renderer.camera.offsetX += cameraSpeed * renderer.camera.scale * dt * (controller.currentDown.has("camRight") - controller.currentDown.has("camLeft"));
        renderer.camera.offsetY += cameraSpeed * renderer.camera.scale * dt * (controller.currentDown.has("camDown") - controller.currentDown.has("camUp"));

        renderer.render(game.map, game.state, now, dt, game.newState, !!settings.SUPER_SECRET_DEV_MODE_REAL);

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
if (settings.SUPER_SECRET_DEV_MODE_REAL) hide(fuelBar);

game.on("updateState", _ => {
    fuelBar.style.setProperty("--fuel", game.state.me.fuel);
    fuelBar.style.setProperty("--prevFuel", game.state.me.prevFuel ? game.state.me.prevFuel[0] : 10);
});
// #endregion

// #region Debug
const DEBUG_LIMIT = 60;
const debugDiv = document.getElementById("debug");

if (settings.SUPER_SECRET_DEV_MODE_REAL) show(debugDiv);

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
Loader.onimgerror = img => {
    try {
        loadingHeader.innerText = `Failed to load ${new URL(img.src).pathname.split("/").pop()}, try refreshing or checking your network settings.`;
    } catch (err) {
        loadingHeader.innerText = "Failed to load an image";
    }
};
Loader.onwserror = ws => {
    loadingHeader.innerText = `Failed to connect to ${ws.url}, try refreshing or checking your network settings.`;
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
        console.error("Error loading;", err);
    }
);
// #endregion

// #region Easter Eggs
const title = document.getElementById("title");
game.on("message", msg => {
    if (msg.level < 0) return;
    if (msg.author !== "SkapClientAdmin") return;

    if (msg.content.match(/^do a barrel roll([!]*|\.)$/i)) {
        console.log();
        renderer.doABarrelRoll();
    }
});
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
    chatAsClient("⚠ Connection to skap.io server closed");
});
// #endregion

// #region beforeunload
window.addEventListener("beforeunload", e => {
    // e.preventDefault();
});
// #endregion



