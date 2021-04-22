/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const controls = (localStorage.getItem("controls") || "w a s d shift   r").split(" ");
const othercontrols = (localStorage.getItem("othercontrols") || "u i f arrowup arrowleft arrowdown arrowright o").split(" ");

const renderSettings = {
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
        hitbox: true,
        teleporterHitbox: false
    },
    colors: {
        obstacle: "rgb(48, 56, 117.6)", // Is variable (shit) (no moar shit)
        lava: "#d01000",
        slime: "#00c000",
        ice: "#00ffff",
        box: "#00000060",
        hitbox: "#ffff00",
        teleporterHitbox: "#0000ffc0",
        selected: "#ff0000",
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
        tail: "#d0a020e0",
        dash: "#00ffc0c0",
        shrink: "#b000ff",
        bombParticle: "#d0100010",
        explosion: "#00000008",
        ghostParticles: "#40a040c0",
        refuel: "#ffff00c0",
        jetpack: "#c0c0c020"
    },
    textures: {
        enemies: {
            bouncer: loadImage("enemies/bouncer.svg"),
            megaBouncer: loadImage("enemies/megabouncer.svg"),
            freezer: loadImage("enemies/freezer.svg"),
            spike: loadImage("enemies/spike.svg"),
            normal: loadImage("enemies/normal.svg"),
            reverse: loadImage("enemies/reverse.svg"),
            rotating: loadImage("enemies/rotating.svg"),
            bomb: [
                loadImage("enemies/bomb0.svg"),
                loadImage("enemies/bomb1.svg")
            ],
            contractor: [
                loadImage("enemies/contractor0.svg"),
                loadImage("enemies/contractor1.svg")
            ],
            taker: loadImage("enemies/taker.svg"),
            immune: loadImage("enemies/immune.svg"),
            monster: loadImage("enemies/monster.svg"),
            following: loadImage("enemies/following.svg"),
            stutter: loadImage("enemies/stutter.svg"),
            snekHead: loadImage("enemies/snekHead.svg"),
            snekBody: loadImage("enemies/snekBody.svg"),
            wavy: loadImage("enemies/wavy.svg"),
            shooter: loadImage("enemies/shooter.svg"),
            expander: loadImage("enemies/expander.svg"),
            gravityUp: loadImage("enemies/gravityUp.svg"),
            gravityDown: loadImage("enemies/gravityDown.svg"),
            gravityLeft: loadImage("enemies/gravityLeft.svg"),
            gravityRight: loadImage("enemies/gravityRight.svg"),

            none: loadImage("enemies/none.svg")
        },
        hats: {
            none: {
                offset: [0, 0],
                textOffset: -1.3,
                size: [0, 0],
                texture: loadImage("https://skap.io/textures/hats/none.png")
            },
            catEars: {
                offset: [-1.09, -2.0],
                textOffset: -1.6,
                size: [2.2, 2.2],
                texture: loadImage("https://skap.io/textures/hats/catEars.png")
            },
            tophat: {
                offset: [-1.3, -2.4],
                textOffset: -2.4,
                size: [2.6, 2.6],
                texture: loadImage("https://skap.io/textures/hats/topHat.png")
            },
            guest: {
                offset: [0, 0],
                textOffset: -1.3,
                size: [0, 0],
                texture: loadImage("https://skap.io/textures/hats/none.png")
            },
            santa: {
                offset: [-1.3, -2.4],
                textOffset: -1.9,
                size: [3.2, 3.2],
                texture: loadImage("https://skap.io/textures/hats/santa.png")
            },
            militaryHat: {
                offset: [-1.55, -2],
                textOffset: -1.9,
                size: [3, 3],
                texture: loadImage("https://skap.io/textures/hats/militaryHat.png")
            },
            nookyHat: {
                offset: [-1.2, -2.8],
                textOffset: -1.6,
                size: [2.6, 2.6],
                texture: loadImage("https://skap.io/textures/hats/nookyHat.png")
            },
            ravelHat: {
                offset: [-1.2, -2.8],
                textOffset: -3,
                size: [2.6, 2.6],
                texture: loadImage("https://skap.io/textures/hats/eggplant.png")
            },
            wolf: {
                offset: [-1.5, -2.0],
                textOffset: -2.2,
                size: [3, 3],
                texture: loadImage("https://skap.io/textures/hats/wolf.png")
            },
            trumpHat: {
                offset: [-1.53, -2.1],
                textOffset: -1.7,
                size: [3.2, 3.2],
                texture: loadImage("https://skap.io/textures/hats/trumpHat1.png")
            },
            bunnyEars: {
                offset: [-1.4, -3],
                textOffset: -2.2,
                size: [3, 3],
                texture: loadImage("https://skap.io/textures/hats/bunnyEars.png")
            },
            crown: {
                offset: [-1.55, -2.65],
                textOffset: -2.2,
                size: [3.2, 3.2],
                texture: loadImage("https://skap.io/textures/hats/crown.png")
            },
            kite: {
                offset: [-0.8, -0.8],
                textOffset: -1.3,
                size: [1.6, 1.6],
                texture: loadImage("https://skap.io/textures/hats/kite.png")
            },
            sakura: {
                offset: [-1.05, -1.4],
                textOffset: -1.3,
                size: [2.0, 2.0],
                texture: loadImage("https://skap.io/textures/hats/sakura.png")
            },
            cowboy: {
                offset: [-1.6, -2.4],
                textOffset: -2,
                size: [3.2, 3.2],
                texture: loadImage("https://skap.io/textures/hats/cowboy.png")
            },
            party: {
                offset: [-1.36, -2.1],
                textOffset: -2.4,
                size: [2.65, 2.65],
                texture: loadImage("https://skap.io/textures/hats/party.png")
            },
            bimbo: {
                offset: [-1.2, -1.8],
                textOffset: -1.5,
                size: [2.4, 2.4],
                texture: loadImage("https://skap.io/textures/hats/bimbo.png")
            },
            uwu: {
                offset: [-2.8, -3.5],
                textOffset: -2.4,
                size: [5.6, 5.6],
                texture: loadImage("https://skap.io/textures/hats/wowo.png")
            },
            flowerHat: {
                offset: [-1.55, -2.4],
                textOffset: -2.1,
                size: [3.2, 3.2],
                texture: loadImage("https://skap.io/textures/hats/flowerHat.png")
            }
        },
        powers: [
            loadImage("https://skap.io/textures/powers/shrinker.svg"),
            loadImage("https://skap.io/textures/powers/explosion.svg"),
            loadImage("https://skap.io/textures/powers/build.svg"),
            loadImage("https://skap.io/textures/powers/meteor.svg"),
            loadImage("https://skap.io/textures/powers/refuel.svg"),
            loadImage("https://skap.io/textures/powers/feather.svg"),
            loadImage("https://skap.io/textures/powers/shield.svg"),
            loadImage("https://skap.io/textures/powers/dash.svg"),
            loadImage("https://skap.io/textures/powers/lantern.svg"),
            loadImage("https://skap.io/textures/powers/ghost.svg"),
            loadImage("https://skap.io/textures/powers/frost.svg"),
            loadImage("https://skap.io/textures/powers/shell.svg"),
            loadImage("none.svg"),
        ],
    }
};

/**
 * @typedef SkapMap
 * @property {{name: string | null, creator: string | null, spawnPos: [number, number], spawnArea: string, version: number | null, skapclient_version: number | null}} settings
 * @property {Area[]} areas
**/
/**
 * @type {SkapMap}
 */
const map = {
    settings: {
        name: null,
        creator: null,
        spawnPos: [0, 0],
        spawnArea: "Home",
        version: null,
        skapclient_version: null
    },
    areas: []
};

let camScale = 5;
const camSpeed = 10;
let camX = 50;
let camY = 50;
let selectedObject = null;
/** @type {Area} */
let currentArea = null;

const selectBuffer = 5;
/** @type {null | "u" | "ur" | "r" | "dr" | "d" | "dl" | "l" | "ul"} */
let selectMode = null;
let lockCursor = false;

const menu = document.getElementById("menu");
const areamenu = document.getElementById("areamenu");
const objectmenu = document.getElementById("objectmenu");
const togglemenu = document.getElementById("togglemenu");

const downloadBtn = document.getElementById("download");
const importInput = document.getElementById("import");

const obstacleBtn = document.getElementById("createObstacle");
const lavaBtn = document.getElementById("createLava");
const slimeBtn = document.getElementById("createSlime");
const iceBtn = document.getElementById("createIce");

const contextmenu = document.getElementById("contextmenu");
const contextBtns = {
    obstacle: document.getElementById("createObstacleFromContext"),
    lava: document.getElementById("createLavaFromContext"),
    slime: document.getElementById("createSlimeFromContext"),
    ice: document.getElementById("createIceFromContext"),
    area: document.getElementById("createArea")
};

const togglebottommenu = document.getElementById("togglebottommenu");
const bottommenu = document.getElementById("bottommenu");
const areaList = document.getElementById("areaList");

/**
 * LOAD IMAGE
 * @param {string} src 
 */
function loadImage(src) {
    let image = new Image();
    image.src = src.startsWith("http") ? src : `../Textures/${src}`;
    image.onerror = () => {
        console.log("ERROR AT", image.src);
    }
    return image;
}
/**
 * @param {string} str 
 */
function htmlspecialchars(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/**
 * @typedef VectorLike
 * @property {number} x
 * @property {number} y
 */