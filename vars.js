if (localStorage.getItem("banned")) {
    rickroll();
}

const ws = new WebSocket("wss://skap.io");
const URLParams = new URLSearchParams(location.search);

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("render");
const ctx = canvas.getContext("2d");

let renderSettings = {
    render: {
        obstacle: true,
        lava: true,
        movLava: true,
        rotLava: true,
        slime: true,
        ice: true,
        block0: true,
        text: true,
        teleporter: true,
        block1: true,
        hitbox: false
    },
    colors: {
        obstacle: "#ffffff", // Is variable (shit) (no moar shit)
        lava: "#d01000",
        slime: "#00c000",
        ice: "#00ffff",
        box: "#00000060",
        hitbox: "#ffff00c0",
        gravOutline: [
            "#ffff00",
            "#ff0000",
            "#0000ff",
            "#00ff00"
        ],
        gravFill: [
            "#ffff0008",
            "#ff000008",
            "#0000ff08",
            "#00ff0008"
        ],
        button: "#404040",
        buttonPressed: "#505050",
        doorClosedOutline: "#404040",
        doorFill: "#404040c0",
        doorOpenedOutline: "#40404080",

        doorLineOn: "#ffff0040",
        doorLineOff: "#40404040",

        turretBody: "#404040",
        turretCannon: "#303030",

        mineRegion: "#00000010",
        mineExpRegion: "#d0100010",

        followingRegion: "#00000010",

        contracRegion: "#8080a010",
        contracTriggerRegion: "#c000c010",

        playerDead: "#ff0000",
        playerFreeze: "#00ffff",
        playerFreezeDead: "#ff0080",

        meteor: "#c08000e0",
        ghost: "#20a040e0",
        blueFire: "#4040ff10",
        shield: "#383838e0",
        frost: "#00ffff40",
        dash: "#00ffc0c0",
        shrink: "#b000ff",
        bombParticle: "#d0100010",
        explosion: "#00000008",
        ghostParticles: "#40a040c0",
        refuel: "#ffff00c0"
    },
    textures: {
        enemies: {
            bouncer: loadImage("enemies/bouncer"),
            megaBouncer: loadImage("enemies/megabouncer"),
            freezer: loadImage("enemies/freezer"),
            spike: loadImage("enemies/spike"),
            normal: loadImage("enemies/normal"),
            reverse: loadImage("enemies/reverse"),
            rotating: loadImage("enemies/rotating"),
            bomb: [
                loadImage("enemies/bomb0"),
                loadImage("enemies/bomb1")
            ],
            contractor: [
                loadImage("enemies/contractor0"),
                loadImage("enemies/contractor1")
            ],
            taker: loadImage("enemies/taker"),
            immune: loadImage("enemies/immune"),
            monster: loadImage("enemies/monster"),
            following: loadImage("enemies/following"),
            stutter: loadImage("enemies/stutter"),
            snekHead: loadImage("enemies/snekHead"),
            snekBody: loadImage("enemies/snekBody"),
            wavy: loadImage("enemies/wavy"),
            shooter: loadImage("enemies/shooter"),
            expander: loadImage("enemies/expander"),
            gravityUp: loadImage("enemies/gravityUp"),
            gravityDown: loadImage("enemies/gravityDown"),
            gravityLeft: loadImage("enemies/gravityLeft"),
            gravityRight: loadImage("enemies/gravityRight"),

            none: loadImage("enemies/none")
        },
        hats: {}
    }
};
let parsedMap = {
    background: "#ffffff",
    obstacle: [],
    teleporter: [],
    lava: [],
    rotatingLava: [],
    movingLava: [],
    ice: [],
    slime: [],
    button: [],
    switch: [],
    door: [],
    block0: [],
    text: [],
    turret: [],
    block1: [],
    box: []
};
let camScale = 5;
let camX = 0;
let camY = 0;
let camSpeed = 5;
let freeCam = false;

let gravZoneAnim = 0;

let keys;
if (localStorage.getItem("keys")) keys = localStorage.getItem("keys").split(" ");
else keys = ["w", "a", "s", "d", "shift", "", "", "r"];

let map = null;
let data = null;
let particles = {
    dash: [],
    shrink: [],
    bomb: [],
    explosion: [],
    ghost: [],
    refuel: []
};
let bypassProfan = true;
let mouse = { x: 0, y: 0 };
let user = "";
const ping = document.getElementById("ping");

let chatFocus = false;
let blocked = localStorage.getItem("blocked") ? localStorage.getItem("blocked").split(" ") : [];
let viewWS = Boolean(localStorage.getItem("viewWS"));
let debug = Boolean(localStorage.getItem("debug"));
let noUS = false;
const devs = ["NKY", "NKY5223", "NKYv2", "NKYv3", "NKYv4", "3225YKN", "ZeroTix", "ZeroFix"];
const banned = [];
const profanCheck = atob("c2hpdCBmdWNrIG1pbmdlIGNvY2sgdGl0cyBwZW5pcyBjbGl0IHB1c3N5IG1lYXRjdXJ0YWluIGppenogcHJ1bmUgZG91Y2hlIHdhbmtlciBqZXJr").split(" ");
const seriousProfanCheck = atob("bmlnZ2VyIG5pZ2dhIGZhZ2dvdCBjdW50IHdob3JlIHJhcGU=").split(" ");
const URLRegex = /(\s|^)(https?:\/\/[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+((\/[A-Za-z0-9-_]+)*)?(\.[a-z]+)?\/?(\?[A-Za-z0-9\._\-]+(=[A-Za-z0-9\._\-%]+)?(&[A-Za-z0-9\._\-]+(=[A-Za-z0-9\._\-%]+)?)*)?(#[A-Za-z0-9\._\-]+(=[A-Za-z0-9\._\-]+)?(&[A-Za-z0-9\._\-]+(=[A-Za-z0-9\._\-]+)?)*)?)/g;

let id = "";
let canSend = false;


let maxLU = 0;
let lastUpdate = 0;
let minLU = 1000;
let lastFrame = 0;

let maxVel = 0;
const maxVelP = document.getElementById("maxVel");

// HTML Elements
// Other stuff
const wsDiv = document.getElementById("ws");
const alertDiv = document.getElementById("alert");

if (viewWS) {
    customAlert("WS messages SHOWN<br><small>(Note: Is spammy)</small>");
    show(wsDiv);
} else hide(wsDiv);

const connectP = document.getElementById("connecting");
// Login
const username = document.getElementById("username");
const password = document.getElementById("password");
const guest = document.getElementById("guest");
const login = document.getElementById("login");
const register = document.getElementById("register");
const logout = document.getElementById("logout");
const logoutDiv = document.getElementById("logoutDiv");
const play = document.getElementById("play");
const loginData = document.getElementById("loginData");
const loginDiv = document.getElementById("loginDiv");

const playerColor = document.getElementById("playerColor");
const changingRoom = document.getElementById("changingRoom");
const changingRoomBtn = document.getElementById("changingRoomBtn");
const backtoLoginFromChangingRoom = document.getElementById("backToLogout");

// Changelog
const changelogBtn = document.getElementById("changelogBtn");
const changelog = document.getElementById("changelog");
const closeChangelog = document.getElementById("closeChangelog")

// GameList
const backtoLogin = document.getElementById("backtoLogin");
const gamesDiv = document.getElementById("gamesDiv");
const gameListDiv = document.getElementById("games");
const refresh = document.getElementById("refresh");

// createGame
const createGameMenuBtn = document.getElementById("createGameMenuBtn");
const createGameMenu = document.getElementById("createGameMenu");
const gameName = document.getElementById("gameName");
const gameFile = document.getElementById("gameFile");
const gameFileLabel = document.getElementById("gameFileLabel");
const createGameBtn = document.getElementById("createGameBtn");
const perms = document.getElementById("perms");
const private = document.getElementById("private");
const gamePwWrapper = document.getElementById("gamePwWrapper");
const gamePw = document.getElementById("gamePw");
const powerRestrict = document.getElementById("powerRestrict");
const uploadMap = document.getElementById("uploadMap");

// GameDiv
const gameDiv = document.getElementById("gameDiv");
const playerList = document.getElementById("playerList");
const chat = document.getElementById("chatContent");
const chatInput = document.getElementById("chatInput");
const fuelBar = document.getElementById("fuelBarInner");
const lastUpdateDiv = document.getElementById("lastUpdateDiv");
const lastUpdateDisplay = document.getElementById("lastUpdateDisplay");
const minMaxUpdate = document.getElementById("minMaxUpdateDisplay");
const FPSDisplay = document.getElementById("FPS");
const posDiv = document.getElementById("pos");
const posXSpan = document.getElementById("posX");
const posYSpan = document.getElementById("posY");
const velSpan = document.getElementById("vel");
const velXSpan = document.getElementById("velX");
const velYSpan = document.getElementById("velY");
const aimXSpan = document.getElementById("aimX");
const aimYSpan = document.getElementById("aimY");
if (debug) {
    show(posDiv);
    show(lastUpdateDiv);
}

const deathM = document.getElementById("deathText");
const freezeM = document.getElementById("freezeText");

const power0 = document.getElementById("power0input");
const power1 = document.getElementById("power1input");
const power0CD = document.getElementById("power0CD");
const power1CD = document.getElementById("power1CD");
const power0Heat = document.getElementById("power0Heat");
const power1Heat = document.getElementById("power1Heat");
let powers = new Set();

// Functions
/**
 * Custom Alert UwU <3
 * @param {string} s The message
 * @param {number} t Fade time
 */
function customAlert(s, t = 1) {
    alertDiv.innerHTML = s;
    show(alertDiv);
    alertDiv.style.opacity = 1;
    let i = 0;
    let interv = setInterval(() => {
        i += 0.01;
        if (i >= t) {
            hide(alertDiv);
            clearInterval(interv);
        }
        alertDiv.style.opacity -= 0.01 / t;
    }, 10)
}
/**
 * ws.send
 * @param {Object} obj Object
 * @param {string} obj.e The event
 */
function send(obj) {
    if (canSend) ws.send(JSON.stringify(obj));
}
/**
 * Hide Element
 * @param {Element} el Element
 */
function hide(el) {
    el.classList.add("hidden");
}
/**
 * Show Element
 * @param {Element} el Element
 */
function show(el) {
    el.classList.remove("hidden");
}
/**
 * LOAD IMAGE
 * @param {string} src 
 */
function loadImage(src) {
    let image = new Image();
    image.src = src.startsWith("http") ? src : `Textures/${src}.svg`;
    return image;
}
/**
 * safe
 */
String.prototype.safe = function () {
    return this.replace(/&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/**
 * clamp when
 * @param {number} min 
 * @param {number} num 
 * @param {number} max 
 */
function clamp(min, num, max) {
    return Math.max(Math.min(num, max), min);
}

/**
 * When i want to punish u
 */
function rickroll() {
    location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}