const ws = new WebSocket("wss://skap.io");

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("render");
const ctx = canvas.getContext("2d");
    ctx.textBaseline = "middle";

const obstaclePNG = new Image();
obstaclePNG.src = "obstacle.png";
// Replace with images eventually (might need to restrict zoom in)
let fill = {
    background: "#808080",
    obstacle: ctx.createPattern(obstaclePNG, "repeat"),
    obstacleColor: "#404040",
    lava: "#d00000",
    slime: "#00c000",
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

    doorClosedOutline: "#404040",
    doorClosedFill: "#404040c0",
    doorOpenedOutline: "#40404080",
    doorOpenedFill: "#40404000",

    turretBody: "#404040",
    turretCannon: "#303030",
    bullet: "#d00000",

    mineOuter: "#000000",
    mineInner: "#d00000",
    minePhaseOuter: "#202020",
    minePhaseInner: "#ffffff",
    mineRegion: "#00000020",
    mineExpRegion: "#d0000020",

    bouncerGreen: "#00c000",
    bouncerBlack: "#000000",

    spikeFill: "#d00000",
    spikeOutline: "#000000",

    // For normal AND reverse
    normalOutline: "#000000",
    normalTop: "#000000",
    normalBottom: "#d00000"
};
obstaclePNG.addEventListener("load", () => {
    fill.obstacle = ctx.createPattern(obstaclePNG, "repeat")
    fill.obstacle.setTransform(new DOMMatrix([
        0.125, 0, 0, 0.125, 0, 0
    ]));
});
let camScale = 5;
let camX = 0;
let camY = 0;
let camSpeed = 2;
let freeCam = false;

let keys = ["w", "a", "s", "d", "shift", "", "", "r"];

let map = null;
let bypassProfan = true;

let chatFocus = false;
let viewWS = Boolean(localStorage.getItem("viewWS"));
const profanCheck = atob("c2hpdCBmdWNrIG1pbmdlIGNvY2sgdGl0cyBwZW5pcyBjbGl0IHB1c3N5IG1lYXRjdXJ0YWluIGppenogcHJ1bmUgZG91Y2hlIHdhbmtlciBqZXJr").split(" ");
const seriousProfanCheck = atob("bmlnZ2VyIG5pZ2dhIGZhZ2dvdCBjdW50IHdob3JlIHJhcGU=").split(" ");

let maxLU = 0;
let lastUpdate = 0;
let minLU = 1000;

// HTML Elements
// Other stuff
const wsDiv = document.getElementById("ws");
const alertDiv = document.getElementById("alert");

if (viewWS) {
    customAlert("WS messages SHOWN<br><small>(Note: Is spammy)</small>");
    show(wsDiv);
} else hide(wsDiv);

// Login
const username = document.getElementById("username");
const password = document.getElementById("password");
const guest = document.getElementById("guest");
const login = document.getElementById("login");
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
 * safe
 */
String.prototype.safe = function () {
    return this.replace(/&/, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}