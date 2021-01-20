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
        slime: true,
        ice: true,
        block0: true,
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
        doorClosedFill: "#404040c0",
        doorOpenedOutline: "#40404080",
        doorOpenedFill: "#40404000",

        turretBody: "#404040",
        turretCannon: "#303030",
        bullet: "#d01000",

        mineRegion: "#00000010",
        mineExpRegion: "#d0100010",

        contracRegion: "#8080a010",
        contracTriggerRegion: "#c000c010",

        playerDead: "#ff0000",
        playerFreeze: "#00ffff",

        meteor: "#c08000",
        ghost: "#20a040",
        blueFire: "#4040ff10",
        shield: "#383838"
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
            monster: loadImage("enemies/monster")
        },
        hats: {
            santa: loadImage("https://skap.io/textures/hats/santa.png")
        }
    }
};
let parsedMap = {
    background: "#ffffff",
    obstacle: [],
    block0: [],
    slime: [],
    ice: [],
    lava: [],
    teleporter: [],
    block1: []
};
// Merge these two vars with this ^^^
// Replace with images eventually (might need to restrict zoom in)
let camScale = 5;
let camX = 0;
let camY = 0;
let camSpeed = 5;
let freeCam = false;

let keys;
if (localStorage.getItem("keys")) keys = localStorage.getItem("keys").split(" ");
else keys = ["w", "a", "s", "d", "shift", "", "", "r"];

let map = null;
let data = null;
let bypassProfan = true;
let mouse = {x: 0, y: 0};

let chatFocus = false;
let blocked = localStorage.getItem("blocked") ? localStorage.getItem("blocked").split(" ") : [];
let viewWS = Boolean(localStorage.getItem("viewWS"));
let noUS = false;
const devs = ["NKY", "NKY5223", "NKYv2", "NKYv3", "ZeroTix", "ZeroFix", "haha0201"];
const profanCheck = atob("c2hpdCBmdWNrIG1pbmdlIGNvY2sgdGl0cyBwZW5pcyBjbGl0IHB1c3N5IG1lYXRjdXJ0YWluIGppenogcHJ1bmUgZG91Y2hlIHdhbmtlciBqZXJr").split(" ");
const seriousProfanCheck = atob("bmlnZ2VyIG5pZ2dhIGZhZ2dvdCBjdW50IHdob3JlIHJhcGU=").split(" ");

let maxLU = 0;
let lastUpdate = 0;
let minLU = 1000;
let lastFrame = 0;

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

// GameList
const gamesDiv = document.getElementById("gamesDiv");
const gameListDiv = document.getElementById("games");
const refresh = document.getElementById("refresh");

// GameDiv
const gameDiv = document.getElementById("gameDiv");
const playerList = document.getElementById("playerList");
const chat = document.getElementById("chatContent");
const chatInput = document.getElementById("chatInput");
const fuelBar = document.getElementById("fuelBarInner");
const lastUpdateDisplay = document.getElementById("lastUpdateDisplay");
const minMaxUpdate = document.getElementById("minMaxUpdateDisplay");
const FPSDisplay = document.getElementById("FPS");
const posXSpan = document.getElementById("posX");
const posYSpan = document.getElementById("posY");
const velXSpan = document.getElementById("velX");
const velYSpan = document.getElementById("velY");

const deathM = document.getElementById("deathText");
const freezeM = document.getElementById("freezeText");

// Functions
/**
 * Custom Alert UwU <3
 * @param {string} s The message
 * @param {number} t Fade time
 */
function customAlert(s, t = 1) {
    alertDiv.innerHTML = s;
    alertDiv.style.opacity = 1;
    let i = 0;
    let interv = setInterval(() => {
        i += 0.01;
        if (i >= t) {
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
    ws.send(JSON.stringify(obj));
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
    return this.replace(/&/, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}