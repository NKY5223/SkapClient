import Loader from "./Loader.js";
import SkapMap from "./Map.js";
import { Particle, ParticleManager } from "./Particle.js";
import State from "./State.js";
import Validator from "./Validator.js";
import lerp from "./lerp.js";


/**
 * @typedef { string | CanvasGradient | CanvasPattern } Style
 */
export default class Renderer {
    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.game = game;

        this.prevRoom = null;

        this.camera = {
            /** @type {"player" | "map" | "fit"} */
            mode: "player",
            player: null,
            offsetX: 0,
            offsetY: 0,
            maxFitScale: 5,

            x: 0,
            y: 0,
            scale: 5,
            resolution: 1,
            actualScale: 5 * 1 * window.devicePixelRatio
        };

        this.settings = {
            backgroundColor: null,
            obstacle: {
                color: null,
                render: true,
            },
            lava: {
                color: [183, 64, 56],
                render: true,
            },
            slime: {
                color: [0, 202, 0],
                render: true,
            },
            ice: {
                color: [124, 171, 210],
                render: true,
            },
            text: {
                fill: [255, 255, 255],
                stroke: [0, 0, 0],
                strokeWidth: 1,
                fontSize: 5,
                font: "Russo One",
            },
            block0: {
                opacity: 1
            },
            block1: {
                opacity: 1
            },
            turret: {
                body: [0x40, 0x40, 0x40],
                gun: {
                    fill: [0x20, 0x20, 0x20],
                    width: 4,
                    length: 5,
                },
            },
            gravityZone: {
                0: { stroke: [255, 255, 0], fill: [255, 255, 0, .25] },
                1: { stroke: [255, 0, 0], fill: [255, 0, 0, .25] },
                2: { stroke: [0, 0, 255], fill: [0, 0, 255, .25] },
                3: { stroke: [0, 255, 0], fill: [0, 255, 0, .25] },
                none: { stroke: [0, 0, 0], fill: [0, 0, 0, .25] },
            },
            door: {
                unpressed: [0x40, 0x40, 0x40],
                pressed: [0x60, 0x60, 0x60],

                buttonShapeFactor: .1,
                switchShapeFactor: .25,

                opened: {
                    fill: [0x40, 0x40, 0x40, 0.125],
                    stroke: [0x40, 0x40, 0x40, 0.5],
                    strokeWidth: 1,
                },
                closed: {
                    fill: [0x40, 0x40, 0x40, 0.5],
                    stroke: [0x40, 0x40, 0x40, 1],
                    strokeWidth: 1,
                },
            },
            box: {
                color: [0, 0, 0, .5]
            },
            powers: {
                textures: [
                    this.loadImage("https://skap.io/textures/powers/shrinker.svg"),
                    this.loadImage("https://skap.io/textures/powers/explosion.svg"),
                    this.loadImage("https://skap.io/textures/powers/wall.svg"),
                    this.loadImage("https://skap.io/textures/powers/meteor.svg"),
                    this.loadImage("https://skap.io/textures/powers/refuel.svg"),
                    this.loadImage("https://skap.io/textures/powers/feather.svg"),
                    this.loadImage("https://skap.io/textures/powers/shield.svg"),
                    this.loadImage("https://skap.io/textures/powers/dash.svg"),
                    this.loadImage("https://skap.io/textures/powers/lantern.svg"),
                    this.loadImage("https://skap.io/textures/powers/ghost.svg"),
                    this.loadImage("https://skap.io/textures/powers/frost.svg"),
                    this.loadImage("https://skap.io/textures/powers/shell.svg"),
                    this.loadImage("./assets/entities/blueFrisbeeEntity.svg"),
                    this.loadImage("./assets/entities/redFrisbeeEntity.svg"),
                ]
            },
            player: {
                name: {
                    fill: {
                        get dead() { return this.array[1]; },
                        set dead(v) { return this.array[1] = v; },
                        get frozen() { return this.array[2]; },
                        set frozen(v) { return this.array[2] = v; },
                        get deadFrozen() { return this.array[3]; },
                        set deadFrozen(v) { return this.array[3] = v; },
                        get(dead = false, frozen = false) { return this.array[(+!!frozen) << 1 | (+!!dead)] },
                        array: [[255, 255, 255], [255, 0, 0], [124, 171, 210], [192, 64, 192]],
                    },
                    stroke: [0, 0, 0],
                    fontSize: 2,
                    font: "Righteous",
                },
                fuel: {
                    fill: [255, 224, 0],

                    usage: [255, 100, 0],
                    replenish: [100, 255, 0],

                    stroke: [0, 0, 0],
                },
                colors: {
                    // haha funi
                    get dead() { return this.array[1]; },
                    set dead(v) { return this.array[1] = v; },
                    get frozen() { return this.array[2]; },
                    set frozen(v) { return this.array[2] = v; },
                    get deadFrozen() { return this.array[3]; },
                    set deadFrozen(v) { return this.array[3] = v; },
                    get(dead = false, frozen = false) { return this.array[(+!!frozen) << 1 | (+!!dead)] },
                    array: [null, [255, 0, 0], [124, 171, 210], [192, 64, 192]],
                },
                strokeWidth: 0.25,
            },
            hats: {
                none: {
                    offset: [0, 0], size: [0, 0], texture: this.loadImage("https://skap.io/textures/hats/none.png"), layer: 1
                },
                catEars: {
                    offset: [-1.09, -2], size: [2.2, 2.2], texture: this.loadImage("https://skap.io/textures/hats/catEars.png"), layer: 1
                },
                catEars1: {
                    offset: [-1.4, -2], size: [2.8, 2.8], texture: this.loadImage("https://skap.io/textures/hats/catEars1.png"), layer: 0
                },
                catEars111: {
                    offset: [-1.4, -2], size: [2.8, 2.8], texture: this.loadImage("https://skap.io/textures/hats/catEars111.png"), layer: 0
                },
                tophat: {
                    offset: [-1.3, -2.4], size: [2.6, 2.6], texture: this.loadImage("https://skap.io/textures/hats/topHat.png"), layer: 1
                },
                guest: {
                    offset: [0, 0], size: [0, 0], texture: this.loadImage("https://skap.io/textures/hats/none.png"), layer: 1
                },
                santa: {
                    offset: [-1.4, -2.4], size: [3.4, 3.4], texture: this.loadImage("https://skap.io/textures/hats/santa.png"), layer: 1
                },
                militaryHat: {
                    offset: [-1.55, -2], size: [3, 3], texture: this.loadImage("https://skap.io/textures/hats/militaryHat.png"), layer: 1
                },
                nookyHat: {
                    offset: [-1.2, -2.8], size: [2.6, 2.6], texture: this.loadImage("https://skap.io/textures/hats/nookyHat.png"), layer: 1
                },
                ravelHat: {
                    offset: [-1.2, -2.8], size: [2.6, 2.6], texture: this.loadImage("https://skap.io/textures/hats/eggplant.png"), layer: 1
                },
                wolf: {
                    offset: [-1.5, -2], size: [3, 3], texture: this.loadImage("https://skap.io/textures/hats/wolf.png"), layer: 1
                },
                trumpHat: {
                    offset: [-1.53, -2.1], size: [3.2, 3.2], texture: this.loadImage("https://skap.io/textures/hats/trumpHat1.png"), layer: 1
                },
                bunnyEars: {
                    offset: [-1.4, -3], size: [3, 3], texture: this.loadImage("https://skap.io/textures/hats/bunnyEars.png"), layer: 1
                },
                crown: {
                    offset: [-1.55, -2.65], size: [3.2, 3.2], texture: this.loadImage("https://skap.io/textures/hats/crown.png"), layer: 1
                },
                kite: {
                    offset: [-.8, -.8], size: [1.6, 1.6], texture: this.loadImage("https://skap.io/textures/hats/kite.png"), layer: 1
                },
                sakura: {
                    offset: [-1.05, -1.4], size: [2, 2], texture: this.loadImage("https://skap.io/textures/hats/sakura.png"), layer: 1
                },
                cowboy: {
                    offset: [-1.6, -2.4], size: [3.2, 3.2], texture: this.loadImage("https://skap.io/textures/hats/cowboy.png"), layer: 1
                },
                party: {
                    offset: [-1.36, -2.1], size: [2.65, 2.65], texture: this.loadImage("https://skap.io/textures/hats/party.png"), layer: 1
                },
                bimbo: {
                    offset: [-1.2, -1.8], size: [2.4, 2.4], texture: this.loadImage("https://skap.io/textures/hats/bimbo.png"), layer: 1
                },
                uwu: {
                    offset: [-2.8, -3.5], size: [5.6, 5.6], texture: this.loadImage("https://skap.io/textures/hats/wowo.png"), layer: 1
                },
                flowerHat: {
                    offset: [-1.55, -2.4], size: [3.2, 3.2], texture: this.loadImage("https://skap.io/textures/hats/flowerHat.png"), layer: 1
                },
                panties: {
                    offset: [-1.2, -1.2], size: [2.4, 2.4], texture: this.loadImage("https://skap.io/textures/hats/panties.png"), layer: 1
                },
                panties2: {
                    offset: [-1.3, -1.3], size: [2.6, 2.6], texture: this.loadImage("https://skap.io/textures/hats/panties2.png"), layer: 1
                },
                bimboPurple: {
                    offset: [-1.45, -2], size: [2.9, 2.9], texture: this.loadImage("https://skap.io/textures/hats/bimboPurple.png"), layer: 1
                },
                bimboGreen: {
                    offset: [-1.45, -2], size: [2.9, 2.9], texture: this.loadImage("https://skap.io/textures/hats/bimboGreen.png"), layer: 1
                },
                moustache: {
                    offset: [-1.3, -1.6], size: [2.8, 2.8], texture: this.loadImage("https://skap.io/textures/hats/moustache.png"), layer: 1
                },
                onigiri: {
                    offset: [-1.05, -1.9], size: [2.1, 2.1], texture: this.loadImage("https://skap.io/textures/hats/onigiri.png"), layer: 1
                },
                ramen: {
                    offset: [-1.45, -2.5], size: [2.9, 2.9], texture: this.loadImage("https://skap.io/textures/hats/ramen.png"), layer: 1
                },
                salmonSushi: {
                    offset: [-1.3618, -2.4], size: [2.8, 2.8], texture: this.loadImage("https://skap.io/textures/hats/salmonSushi.png"), layer: 1
                },
                horns: {
                    offset: [-1.8, -2], size: [3.5, 3.5], texture: this.loadImage("https://skap.io/textures/hats/horns.png"), layer: 1
                },
                devil: {
                    offset: [-1.8, -2], size: [3.5, 3.5], texture: this.loadImage("https://skap.io/textures/hats/devil.png"), layer: 0
                },
                taria: {
                    offset: [-1.34, -2.1], size: [2.7, 2.7], texture: this.loadImage("https://skap.io/textures/hats/taria.png"), layer: 1
                },
            },
            skins: {
                SkapClientAdmin: {
                    textures: {
                        get dead() { return this.array[1]; },
                        set dead(v) { return this.array[1] = v; },
                        get frozen() { return this.array[2]; },
                        set frozen(v) { return this.array[2] = v; },
                        get deadFrozen() { return this.array[3]; },
                        set deadFrozen(v) { return this.array[3] = v; },
                        get(dead = false, frozen = false) { return this.array[(+!!frozen) << 1 | (+!!dead)] },
                        array: [
                            this.loadImage("./assets/skins/SkapClient.svg"),
                            this.loadImage("./assets/skins/SkapClientDead.svg"),
                            this.loadImage("./assets/skins/SkapClientFrozen.svg"),
                            this.loadImage("./assets/skins/SkapClientDeadFrozen.svg"),
                        ],
                    }
                }
            },
            entity: {
                /** @type {{ [type: string]: HTMLImageElement }} */
                textures: {
                    ...Object.fromEntries([
                        "normal", "reverse", "rotating", // half-lava
                        "spike", "monster", "expander", "following", "wavy", "shooter", // \
                        "immune", "stutter", "drainer", "turretBullet", "enemyBullet",  //  } full-lava
                        "snekHead", "snekBody",                                         // /
                        "bouncer", "megaBouncer", // slime
                        "freezer", // ice
                        "bomb0", "bomb1", "contractor0", "contractor1", "taker", "disabler", "harmless", "accelerator", "decelerator", // special effects
                        "gravityUp", "gravityDown", "gravityLeft", "gravityRight", // gravity

                        "meteorBullet", "restZone", "shield", "path", "healingGhost", "frostEntity", "tail", "blueFrisbeeEntity", "redFrisbeeEntity",  // friendly
                    ].map(v => [v, this.loadImage(`./assets/entities/${v}.svg`)])),
                },
                following: {
                    region: [0x00, 0x00, 0x00, 0.125],
                },
                bomb: {
                    region: [[0x00, 0x00, 0x00, 0.125], [0xff, 0x00, 0x00, 0.25]],
                },
                contractor: {
                    region: [[0x80, 0x80, 0xa0, 0.125], [0xff, 0x00, 0xff, 0.25]],
                },
                drainer: {
                    region: [[0x00, 0x00, 0x00, 0.125], [0xff, 0xe0, 0x00, 0.25]],
                },
            },
            outline: {
                width: 2,
                render: false,
            },

            easterEggs: {
                barrelRoll: null
            }
        };

        /**
         * @type {{
         *     types: string[],
         *     objects: import("./Map.js").SkapMapObject[][],
         *     color: number[],
         *     shape?: "rect" | "circle" | "rot",
         * }[]}
         */
        this.mapOutlines = [
            {
                types: ["block0", "block1"],
                color: [0xff, 0xff, 0x00, 0.75]
            },

            // #region The 4
            {
                types: ["obstacle", "movingObstacle"],
                color: [0xff, 0xff, 0x00, 0.75]
            },
            {
                types: ["lava", "movingLava"],
                color: [0xff, 0x00, 0x00, 0.75]
            },
            {
                types: ["slime", "movingSlime"],
                color: [0x00, 0xff, 0x00, 0.75]
            },
            {
                types: ["ice", "movingIce"],
                color: [0x00, 0xff, 0xff, 0.75]
            },
            // #endregion
            // #region Circular 4
            {
                types: ["circularObstacle"],
                color: [0xff, 0xff, 0x00, 0.75],
                shape: "circle",
            },
            {
                types: ["circularLava"],
                color: [0xff, 0x00, 0x00, 0.75],
                shape: "circle",
            },
            {
                types: ["circularSlime"],
                color: [0x00, 0xff, 0x00, 0.75],
                shape: "circle",
            },
            {
                types: ["circularIce"],
                color: [0x00, 0xff, 0xff, 0.75],
                shape: "circle",
            },
            // #endregion

            {
                types: ["rotatingLava"],
                color: [0xff, 0x00, 0x00, 0.75],
                shape: "rot"
            },

            {
                types: ["teleporter"],
                color: [0x00, 0x00, 0xff, 0.75],
            },

            {
                types: ["buttonPressed", "buttonUnpressed", "switchPressed", "switchUnpressed", "doorOpened", "doorClosed"],
                color: [0xff, 0xff, 0x00, 0.75]
            },

            {
                types: ["gravity0", "gravity1", "gravity2", "gravity3", "gravityZone"],
                color: [0x00, 0x00, 0x00, 0.25]
            },

            {
                types: ["turret"],
                color: [0xff, 0xff, 0x00, 0.75]
            },
        ];

        this.outlineShapeMap = {
            rect: this.batchRectObjs.bind(this),
            circle: this.batchCircleObjs.bind(this),
            rot: this.batchRotatedRectObjs.bind(this)
        };

        this.entityRenderers = {
            rotating: entity => {
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                this.ctx.save();

                this.rotateAround(entity.angle, ...this.t2w(entity.pos.x, entity.pos.y));
                this.ctx.drawImage(
                    this.settings.entity.textures.rotating,
                    ...this.t2w(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.restore();

                this.ctx.globalAlpha = 1;
            },
            following: entity => {
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                this.mapCircle(entity.pos.x, entity.pos.y, entity.region + entity.radius);
                this.fill(this.rgba(...this.settings.entity.following.region));
                this.ctx.drawImage(
                    this.settings.entity.textures.following,
                    ...this.t2w(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.globalAlpha = 1;
            },
            bomb: entity => {
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                this.mapCircle(entity.pos.x, entity.pos.y, entity.region + entity.radius);
                this.fill(this.rgba(...this.settings.entity.bomb.region[+entity.exploding]));
                this.ctx.drawImage(
                    this.settings.entity.textures["bomb" + +entity.phase],
                    ...this.t2w(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.globalAlpha = 1;
            },
            contractor: entity => {
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                this.mapCircle(entity.pos.x, entity.pos.y, entity.region + entity.radius);
                this.fill(this.rgba(...this.settings.entity.contractor.region[+entity.triggered]));
                this.ctx.drawImage(
                    this.settings.entity.textures["contractor" + +entity.triggered],
                    ...this.t2w(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.globalAlpha = 1;
            },
            drainer: entity => {
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                this.mapCircle(entity.pos.x, entity.pos.y, entity.region + entity.radius);
                this.fill(this.rgba(...this.settings.entity.drainer.region[+entity.draining]));
                this.ctx.drawImage(
                    this.settings.entity.textures.drainer,
                    ...this.t2w(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.globalAlpha = 1;
            },
            snek: entity => {
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                for (let segment of entity.states.toReversed()) {
                    this.ctx.drawImage(
                        this.settings.entity.textures.snekBody,
                        ...this.t2w(segment.x - segment.radius, segment.y - segment.radius),
                        this.t(2 * segment.radius), this.t(2 * segment.radius)
                    );
                }
                this.ctx.save();

                this.rotateAround(entity.dir, ...this.t2w(entity.pos.x, entity.pos.y));
                this.ctx.drawImage(
                    this.settings.entity.textures.snekHead,
                    ...this.t2w(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(3 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.restore();

                this.ctx.globalAlpha = 1;
            },
            shield: entity => {
                this.ctx.save();

                this.rotateAround(entity.dir, ...this.t2(entity.pos.x, entity.pos.y));
                this.ctx.drawImage(
                    this.settings.entity.textures[entity.type],
                    ...this.t2(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.restore();
            }
        };

        this.particles = new ParticleManager();

        /** @type {{ rects: [number, number, number, number][], rotatedRects: [number, number, number, number, number, number][], polygons: [number, number][][], circles: [number, number, number][]}} */
        this.batch = {
            /** [x, y, w, h] */
            rects: [],
            /** [cx, cy, w/2, h/2, cos θ, sin θ] */
            rotatedRects: [],
            /** [x, y][] */
            polygons: [],
            /** [x, y, r] */
            circles: [],
        };
    }

    /**
     * @param {SkapMap} map 
     * @param {state} state 
     * @param {number} now
     * @param {number} dt
     * @param {state} newState 
     */
    render(map, state, now, dt, newState, devMode = false) {
        if (!map) return;
        if (!state) return;
        // if (!newState.ready) return;

        // #region Setup
        const obstacleColor = this.rgb(...(this.settings.obstacle.color ?? map.blendedColor));

        this.canvas.width = Math.floor(this.canvas.clientWidth * this.camera.resolution * window.devicePixelRatio);
        this.canvas.height = Math.floor(this.canvas.clientHeight * this.camera.resolution * window.devicePixelRatio);
        this.canvas.style.backgroundColor = obstacleColor;

        const currRoom = state.playerList.find(([player]) => player === state.me.name)[1];
        const changedRoom = currRoom !== this.prevRoom;
        this.prevRoom = currRoom;

        if (changedRoom) {
            this.camera.x = state.me.pos.x;
            this.camera.y = state.me.pos.y;
        }
        switch (this.camera.mode) {
            case "player": {
                if (!this.camera.player) {
                    this.camera.player = state.infos.id;
                }
                if (!(this.camera.player in state.players)) {
                    this.camera.player = state.infos.id;
                    this.camera.offsetX = this.camera.offsetY = 0;
                }
                const player = state.players[this.camera.player];
                this.camera.x = Validator.number(player.pos.x + this.camera.offsetX, -Infinity, Infinity, map.areaSize.x / 2);
                this.camera.y = Validator.number(player.pos.y + this.camera.offsetY, -Infinity, Infinity, map.areaSize.y / 2);
                break;
            }
            case "map": {
                this.camera.x = this.camera.offsetX;
                this.camera.y = this.camera.offsetY;
                break;
            }
            case "fit": {
                const range = 400;
                const padding = 20;

                const inRange = Object.values(state.players)
                    .filter(player => Math.hypot(
                        player.pos.x - state.me.pos.x ?? this.camera.x,
                        player.pos.y - state.me.pos.y ?? this.camera.y
                    ) <= range)
                    .map(player => player.pos);
                switch (inRange.length) {
                    case 0: {
                        this.camera.x = state.me.pos.x ?? map.areaSize.x / 2;
                        this.camera.y = state.me.pos.y ?? map.areaSize.y / 2;
                        this.camera.scale = this.camera.maxFitScale;
                        break;
                    }
                    case 1: {
                        this.camera.x = inRange[0].x;
                        this.camera.y = inRange[0].y;
                        this.camera.scale = this.camera.maxFitScale;
                        break;
                    }
                    default: {
                        const x = inRange.map(pos => pos.x);
                        const y = inRange.map(pos => pos.y);

                        const left = Math.min(...x) - padding;
                        const top = Math.min(...y) - padding;
                        const right = Math.max(...x) + padding;
                        const bottom = Math.max(...y) + padding;

                        const centerX = (left + right) / 2;
                        const centerY = (top + bottom) / 2;

                        const rangeX = right - left;
                        const rangeY = bottom - top;

                        const resMutliplier = this.camera.resolution * window.devicePixelRatio;

                        const scaleX = this.width / rangeX / resMutliplier;
                        const scaleY = this.height / rangeY / resMutliplier;

                        this.camera.x = lerp(this.camera.x, centerX, 0.1);
                        this.camera.y = lerp(this.camera.y, centerY, 0.1);
                        this.camera.scale = lerp(
                            Math.min(this.camera.maxFitScale, Math.min(scaleX, scaleY)),
                            this.camera.scale, 0.1
                        );
                        break;
                    }
                }
                break;
            }
            case "mean": {
                [this.camera.x, this.camera.y] = Object.values(state.players).reduce((acc, player, _, { length }) => [
                    acc[0] + player.pos.x / length,
                    acc[1] + player.pos.y / length
                ], [0, 0]);
            }
        }
        this.camera.actualScale = this.camera.scale * this.camera.resolution * window.devicePixelRatio;

        this.ctx.reset();
        // #endregion

        this.ctx.save();

        // #region Barrel Roll
        if (this.settings.easterEggs.barrelRoll) {
            const t = 2 * Math.PI * (Date.now() - this.settings.easterEggs.barrelRoll) / 2000;
            const angle = t - Math.sin(t);
            this.rotateAround(angle, this.width / 2, this.height / 2);

            if (angle > 2 * Math.PI) this.settings.easterEggs.barrelRoll = null;
        }
        // #endregion

        // #region Background
        const backgroundColor = this.rgb(...(this.settings.backgroundColor ?? map.background));
        this.mapRect(0, 0, map.areaSize.x, map.areaSize.y);
        this.fill(backgroundColor);
        // #endregion

        // If it's plural, multiple object types are merged into one type.

        // #region Obstacles DONE
        this.batchRectObjs(map.objects.obstacle);
        this.batchRectObjs(map.objects.movingObstacle);
        this.batchCircleObjs(map.objects.circularObstacle);

        this.fillBatch(obstacleColor);
        // #endregion

        // #region Teleporter DONE
        let color0 = this.settings.backgroundColor ?? map.background;
        let color1 = this.settings.obstacle.color ?? map.blendedColor;
        for (let teleporter of map.objects.teleporter) {
            this.mapRect(teleporter.pos.x, teleporter.pos.y, teleporter.size.x, teleporter.size.y);
            this.fill(this.createTeleporterGradient(teleporter, color0, color1));
        }
        // #endregion

        // #region Lavas DOING
        this.batchRectObjs(map.objects.lava);
        this.batchRectObjs(map.objects.movingLava);
        this.batchRotatedRectObjs(map.objects.rotatingLava);
        this.batchCircleObjs(map.objects.circularLava);

        this.fillBatch(this.rgb(...this.settings.lava.color));
        // #endregion

        // #region Ices DONE
        this.batchRectObjs(map.objects.ice);
        this.batchRectObjs(map.objects.movingIce);
        this.batchCircleObjs(map.objects.circularIce);

        this.fillBatch(this.rgb(...this.settings.ice.color));
        // #endregion

        // #region Slimes DONE
        this.batchRectObjs(map.objects.slime);
        this.batchRectObjs(map.objects.movingSlime);
        this.batchCircleObjs(map.objects.circularSlime);

        this.fillBatch(this.rgb(...this.settings.slime.color));
        // #endregion

        // #region Buttons, Switches DONE
        this.batchPolygons(map.objects.buttonUnpressed.map(obj => this.createButtonPolygon(obj)));
        this.batchPolygons(map.objects.switchUnpressed.map(obj => this.createSwitchPolygon(obj)));

        this.fillBatch(this.rgb(...this.settings.door.unpressed));

        this.batchPolygons(map.objects.buttonPressed.map(obj => this.createButtonPolygon(obj)));
        this.batchPolygons(map.objects.switchPressed.map(obj => this.createSwitchPolygon(obj)));

        this.fillBatch(this.rgb(...this.settings.door.pressed));
        // #endregion

        // #region Doors DONE
        this.ctx.lineCap = "square";

        this.batchRectObjs(map.objects.doorOpened);
        this.fillBatch(this.rgba(...this.settings.door.opened.fill), true);
        this.strokeInsetBatch(this.rgba(...this.settings.door.opened.stroke), this.settings.door.opened.strokeWidth);

        this.batchRectObjs(map.objects.doorClosed);
        this.fillBatch(this.rgba(...this.settings.door.closed.fill), true);
        this.strokeInsetBatch(this.rgba(...this.settings.door.closed.stroke), this.settings.door.opened.strokeWidth);
        // #endregion

        // #region Block0 DONE
        this.ctx.save();
        this.ctx.globalAlpha = this.settings.block0.opacity;
        for (let block of map.objects.block0) {
            this.mapRect(block.pos.x, block.pos.y, block.size.x, block.size.y);
            this.fill(this.rgba(...block.color, block.opacity));
        }
        this.ctx.restore();
        // #endregion

        // #region Entities DOING
        newState.entities.all.forEach(entity => {
            // Custom Renderer
            if (this.entityRenderers.hasOwnProperty(entity.type)) {
                this.entityRenderers[entity.type](entity);
                return;
            }
            // Draw texture
            if (this.settings.entity.textures.hasOwnProperty(entity.type)) {
                this.ctx.save();
                if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

                this.ctx.drawImage(
                    this.settings.entity.textures[entity.type],
                    ...this.t2(entity.pos.x - entity.radius, entity.pos.y - entity.radius),
                    this.t(2 * entity.radius), this.t(2 * entity.radius)
                );

                this.ctx.restore();

                return;
            }
            // Unknown entity
            this.ctx.save();
            if ("opacity" in entity) this.ctx.globalAlpha = entity.opacity / 4;

            this.mapCircle(entity.pos.x, entity.pos.y, entity.radius);
            this.fill("#ff00ff");

            this.ctx.restore();
        });
        // #endregion

        // #region Particles DOING
        this.particles.update(dt / 1000);
        this.particles.render(this);
        // #endregion

        // #region Turret
        this.batchRotatedRects(map.objects.turret.map(({ pos: { x, y }, size: { x: r }, dir }) => {
            r /= 2;
            const cos = Math.cos(dir);
            const sin = Math.sin(dir);
            const w = this.settings.turret.gun.width / 2;
            const l = this.settings.turret.gun.length / 2;
            let cx = x + r;
            let cy = y + r;
            cx += cos * l;
            cy += sin * l;

            return [cx, cy, l, w, cos, sin];
        }));
        this.fillBatch(this.rgb(...this.settings.turret.gun.fill));

        this.batchCircles(map.objects.turret.map(({ pos: { x, y }, size: { x: r } }) => (r /= 2, [x + r, y + r, r])));
        this.fillBatch(this.rgb(...this.settings.turret.body));
        // #endregion

        // #region GravityZones DONE
        this.ctx.lineCap = "round";
        this.ctx.setLineDash([this.t(3), this.t(5)]);
        this.ctx.lineDashOffset = this.t(now * .01);

        this.batchRectObjs(map.objects.gravity0);
        this.fillBatch(this.rgba(...this.settings.gravityZone[0].fill), true);
        this.strokeBatch(this.rgb(...this.settings.gravityZone[0].stroke), this.t(1));

        this.batchRectObjs(map.objects.gravity1);
        this.fillBatch(this.rgba(...this.settings.gravityZone[1].fill), true);
        this.strokeBatch(this.rgb(...this.settings.gravityZone[1].stroke));

        this.batchRectObjs(map.objects.gravity2);
        this.fillBatch(this.rgba(...this.settings.gravityZone[2].fill), true);
        this.strokeBatch(this.rgb(...this.settings.gravityZone[2].stroke));

        this.batchRectObjs(map.objects.gravity3);
        this.fillBatch(this.rgba(...this.settings.gravityZone[3].fill), true);
        this.strokeBatch(this.rgb(...this.settings.gravityZone[3].stroke));

        this.batchRectObjs(map.objects.gravityZone);
        this.fillBatch(this.rgba(...this.settings.gravityZone.none.fill), true);
        this.strokeBatch(this.rgb(...this.settings.gravityZone.none.stroke));

        this.ctx.lineDashOffset = 0;
        this.ctx.setLineDash([]);
        // #endregion

        // #region Player DOING

        // #region Hat and Body
        for (const player of Object.values(state.players)) {
            if (!player.normal) continue;

            const hat = this.settings.hats[player.hat] ?? this.settings.hats.none;

            this.ctx.save();

            this.rotateAround(player.gravDir * Math.PI / 2, ...this.t2(player.pos.x, player.pos.y));

            // #region Hat 0
            if (hat.layer === 0) {
                this.ctx.drawImage(
                    hat.texture,
                    ...this.t2w(player.pos.x + hat.offset[0] * player.radius, player.pos.y + hat.offset[1] * player.radius),
                    this.t(hat.size[0] * player.radius), this.t(hat.size[1] * player.radius)
                );

                this.ctx.restore();
            }
            // #endregion

            // #region Body
            this.playerBody(player);
            // #endregion

            // #region Hat 1
            if (hat.layer === 1) {
                this.ctx.drawImage(
                    hat.texture,
                    ...this.t2w(player.pos.x + hat.offset[0] * player.radius, player.pos.y + hat.offset[1] * player.radius),
                    this.t(hat.size[0] * player.radius), this.t(hat.size[1] * player.radius)
                );

            }
            // #endregion

            this.ctx.restore();
        }
        // #endregion

        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.font = `${this.t(this.settings.player.name.fontSize)}px ${this.settings.player.name.font}`;
        this.ctx.lineWidth = this.tw(.5);
        this.ctx.strokeStyle = this.rgb(...this.settings.player.name.stroke);

        // Name
        for (let id in state.players) {
            const player = state.players[id];
            this.ctx.fillStyle = this.rgb(...this.settings.player.name.fill.get(
                player.states.includes("Died"),
                player.states.includes("Freeze")
            ));

            if (!player.normal) continue;

            this.ctx.save();
            this.rotateAround(player.gravDir * Math.PI / 2, ...this.t2(player.pos.x, player.pos.y));

            this.ctx.strokeText(player.name, ...this.t2w(player.pos.x, player.pos.y - player.radius - 1.25));
            this.ctx.fillText(player.name, ...this.t2w(player.pos.x, player.pos.y - player.radius - 1.25));

            this.ctx.restore();
        }

        this.ctx.lineWidth = this.t(.25);
        this.ctx.lineCap = "square";
        if (devMode) for (let id in state.players) { // Fuel
            let player = state.players[id];

            if (!player.normal) continue;

            this.ctx.save();
            this.rotateAround(player.gravDir * Math.PI / 2, ...this.t2(player.pos.x, player.pos.y));

            this.mapRect(player.pos.x - 4, player.pos.y + player.radius + .5, player.fuel * .8, 1.5);
            this.fill(this.rgb(...this.settings.player.fuel.fill));

            let left = player.pos.x - 4;
            let top = player.pos.y + player.radius + .5;

            if (player.fuelChange < 0) {
                this.mapRectCoord(
                    left + Math.max(player.fuel, 0) * .8, top,
                    left + Math.max(player.fuel - player.fuelChange, 0) * .8, top + 1.5
                );
                this.fill(this.rgb(...this.settings.player.fuel.usage));
            } else if (player.fuelChange > 0) {
                this.mapRectCoord(
                    left + Math.min(player.fuel, 10) * .8, top,
                    left + Math.min(player.fuel - player.fuelChange, 10) * .8, top + 1.5
                );
                this.fill(this.rgb(...this.settings.player.fuel.replenish));
            }

            this.mapRect(player.pos.x - 4, player.pos.y + player.radius + .5, 8, 1.5);
            this.stroke(this.rgb(...this.settings.player.fuel.stroke));
            this.ctx.restore();
        }
        // #endregion

        // #region Block1 DONE
        this.ctx.save();
        this.ctx.globalAlpha = this.settings.block0.opacity;
        for (let block of map.objects.block1) {
            this.mapRect(block.pos.x, block.pos.y, block.size.x, block.size.y);
            this.fill(this.rgba(...block.color, block.opacity));
        }
        this.ctx.restore();
        // #endregion

        // #region Box DONE
        this.batchRectObjs(map.objects.box);

        this.fillBatch(this.rgba(...this.settings.box.color));
        // #endregion

        // #region Reward
        this.batchRectObjs(map.objects.reward);

        this.fillBatch("#ff00ff");
        // #endregion

        // #region Hatreward
        this.batchRectObjs(map.objects.hatReward);

        this.fillBatch("#ff00ff");
        // #endregion

        // #region Text DONE
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillStyle = this.rgb(...this.settings.text.fill);
        this.ctx.strokeStyle = this.rgb(...this.settings.text.stroke);

        this.ctx.lineWidth = this.t(this.settings.text.strokeWidth);
        this.ctx.font = `${this.t(this.settings.text.fontSize)}px ${this.settings.text.font}`;

        for (let text of map.objects.text) {
            this.ctx.strokeText(text.text, ...this.t2(text.pos.x, text.pos.y));
        }
        for (let text of map.objects.text) {
            this.ctx.fillText(text.text, ...this.t2(text.pos.x, text.pos.y));
        }
        // #endregion

        // #region Outlines
        if (this.settings.outline.render) {
            this.mapOutlines.forEach(({ types, color, shape }) => {
                shape ??= "rect";
                this.outlineShapeMap[shape](types.map(t => map.objects[t]).flat());
                this.strokeBatch(this.rgba(...color), this.settings.outline.width);
            });
        }
        // #endregion    

        this.ctx.restore();
    }

    // #region Batching
    /**
     * @param {Style} fillStyle 
     */
    fillBatch(fillStyle, preserve = false) {
        this.ctx.beginPath();

        // #region Rect
        for (let [x, y, w, h] of this.batch.rects) {
            this.moveTo(x, y);
            this.lineTo(x + w, y);
            this.lineTo(x + w, y + h);
            this.lineTo(x, y + h);
            this.lineTo(x, y);
        }
        for (let [x, y, w, h] of this.batch.rects.toReversed()) {
            this.moveTo(x, y);
        }
        // #endregion

        // #region Rotated Rect
        for (let [cx, cy, w, h, c, s] of this.batch.rotatedRects) {
            this.moveTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
            this.lineTo(cx + +w * c - -h * s, cy + +w * s + -h * c);
            this.lineTo(cx + +w * c - +h * s, cy + +w * s + +h * c);
            this.lineTo(cx + -w * c - +h * s, cy + -w * s + +h * c);
            this.lineTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
        }
        for (let [cx, cy, w, h, c, s] of this.batch.rotatedRects.toReversed()) {
            this.moveTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
        }
        // #endregion

        // #region Polygon
        for (let points of this.batch.polygons) {
            let first = points.shift();

            this.moveTo(...first);
            for (let point of points) this.lineTo(...point);
            this.lineTo(...first);

            points.unshift(first);
        }
        for (let points of this.batch.polygons.toReversed()) {
            this.moveTo(...points[0]);
        }
        // #endregion

        // #region Circle
        for (let [x, y, r] of this.batch.circles) {
            this.moveTo(x + r, y);
            this.ctx.arc(...this.t2(x, y), this.t(r), 0, 2 * Math.PI);
        }
        for (let [x, y, r] of this.batch.circles.toReversed()) {
            this.moveTo(x + r, y);
        }
        // #endregion

        this.fill(fillStyle);

        if (preserve) return;
        this.batch.rects = [];
        this.batch.rotatedRects = [];
        this.batch.polygons = [];
        this.batch.circles = [];
    }
    /**
     * @param {Style} strokeStyle 
     * @param {number} strokeWidth
     */
    strokeBatch(strokeStyle, strokeWidth, preserve = false) {
        this.ctx.beginPath();
        for (let [x, y, w, h] of this.batch.rects) {
            this.moveTo(x, y);
            this.lineTo(x + w, y);
            this.lineTo(x + w, y + h);
            this.lineTo(x, y + h);
            this.lineTo(x, y);
        }
        for (let [cx, cy, w, h, c, s] of this.batch.rotatedRects) {
            this.moveTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
            this.lineTo(cx + +w * c - -h * s, cy + +w * s + -h * c);
            this.lineTo(cx + +w * c - +h * s, cy + +w * s + +h * c);
            this.lineTo(cx + -w * c - +h * s, cy + -w * s + +h * c);
            this.lineTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
        }
        for (let points of this.batch.polygons) {
            let first = points.shift();

            this.moveTo(...first);
            for (let point of points) this.lineTo(...point);
            this.lineTo(...first);

            points.unshift(first);
        }
        for (let [x, y, r] of this.batch.circles) {
            this.moveTo(x + r, y);
            this.ctx.arc(...this.t2(x, y), this.t(r), 0, 2 * Math.PI);
        }
        this.stroke(strokeStyle, strokeWidth);

        if (preserve) return;
        this.batch.rects = [];
        this.batch.rotatedRects = [];
        this.batch.polygons = [];
        this.batch.circles = [];
    }
    /**
     * @param {Style} strokeStyle 
     * @param {number} strokeWidth
     */
    strokeInsetBatch(strokeStyle, strokeWidth = 2, preserve = false) {
        strokeWidth -= 1 / this.camera.actualScale;
        const s = strokeWidth / 2;
        const s2 = strokeWidth;
        strokeWidth += 1 / this.camera.actualScale;
        this.ctx.beginPath();
        for (let [x, y, w, h] of this.batch.rects) {
            x += s;
            y += s;
            w -= s2;
            h -= s2;
            this.moveTo(x, y);
            this.lineTo(x + w, y);
            this.lineTo(x + w, y + h);
            this.lineTo(x, y + h);
            this.lineTo(x, y);
        }
        for (let [cx, cy, w, h, c, s] of this.batch.rotatedRects) {
            cx += s;
            cy += s;
            w -= s2;
            h -= s2;
            this.moveTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
            this.lineTo(cx + +w * c - -h * s, cy + +w * s + -h * c);
            this.lineTo(cx + +w * c - +h * s, cy + +w * s + +h * c);
            this.lineTo(cx + -w * c - +h * s, cy + -w * s + +h * c);
            this.lineTo(cx + -w * c - -h * s, cy + -w * s + -h * c);
        }
        for (let points of this.batch.polygons) {
            let first = points.shift();

            this.moveTo(...first);
            for (let point of points) this.lineTo(...point);
            this.lineTo(...first);

            points.unshift(first);
        }
        for (let [x, y, r] of this.batch.circles) {
            r -= s;
            this.moveTo(x + r, y);
            this.ctx.arc(...this.t2(x, y), this.t(r), 0, 2 * Math.PI);
        }
        this.stroke(strokeStyle, this.t(strokeWidth));

        if (preserve) return;
        this.batch.rects = [];
        this.batch.rotatedRects = [];
        this.batch.polygons = [];
        this.batch.circles = [];
    }
    // #region Rect
    /**
     * @param {[number, number, number, number][]} rects 
     */
    batchRects(rects) {
        this.batch.rects.push(...rects);
    }
    /** @param {import("./Game.js").SkapMapObject[]} objs */
    batchRectObjs(objs) {
        this.batchRects(objs.map(obj => [obj.pos.x, obj.pos.y, obj.size.x, obj.size.y]));
    }
    // #endregion

    // #region Circle
    /**
     * @param {[number, number, number][]} circles 
     */
    batchCircles(circles) {
        this.batch.circles.push(...circles);
    }
    /** @param {import("./Map.js").SkapMapObject[]} objs */
    batchCircleObjs(objs) {
        this.batchCircles(objs.map(obj => [obj.pos.x + obj.radius, obj.pos.y + obj.radius, obj.radius]));
    }
    // #endregion

    // #region Polygon
    /**
     * @param {[number, number][][]} polygons 
    */
    batchPolygons(polygons) {
        this.batch.polygons.push(...polygons);
    }
    // #endregion

    // #region Rotated Rect
    /**
     * @param {[number, number, number, number, number, number][]} rotatedRects [cx, cy, w/2, h/2, cos θ, sin θ][]
     */
    batchRotatedRects(rotatedRects) {
        this.batch.rotatedRects.push(...rotatedRects);
    }
    /** @param {import("./Game.js").RotatingLava[]} objs */
    batchRotatedRectObjs(objs) {
        this.batchRotatedRects(objs.map(obj => [obj.center.x, obj.center.y, obj.size.x / 2, obj.size.y / 2, Math.cos(obj.angle), Math.sin(obj.angle)]))
    }
    // #endregion

    // #endregion

    // #region Map-anchored drawing
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    mapRect(x, y, w, h) {
        this.mapRectCoord(x, y, x + w, y + h);
    }
    /**
     * @param {number} left 
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     */
    mapRectCoord(left, top, right, bottom) {
        this.ctx.beginPath();
        this.moveTo(left, top);
        this.lineTo(right, top);
        this.lineTo(right, bottom);
        this.lineTo(left, bottom);
        this.lineTo(left, top);
    }
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     */
    mapCircle(x, y, r) {
        this.ctx.beginPath();
        this.ctx.arc(...this.t2(x, y), this.t(r), 0, 2 * Math.PI);
    }
    /**
     * ctx.moveTo wrapper
     * @param {number} x 
     * @param {number} y 
     */
    moveTo(x, y) {
        this.ctx.moveTo(...this.t2(x, y));
    }
    /**
     * ctx.lineTo wrapper
     * @param {number} x 
     * @param {number} y 
     */
    lineTo(x, y) {
        this.ctx.lineTo(...this.t2(x, y));
    }
    // #endregion

    // #region Object-specific methods

    // #region Teleporter
    /**
     * @param {import("./Game.js").Teleporter} teleporter 
     */
    createTeleporterGradient(teleporter, color0, color1) {
        let gradient;
        switch (teleporter.dir) {
            case 0:
                gradient = this.ctx.createLinearGradient(
                    ...this.t2(teleporter.pos.x, teleporter.pos.y),
                    ...this.t2(teleporter.pos.x, teleporter.pos.y + teleporter.size.y),
                );
                break;
            case 1:
                gradient = this.ctx.createLinearGradient(
                    ...this.t2(teleporter.pos.x + teleporter.size.x, teleporter.pos.y),
                    ...this.t2(teleporter.pos.x, teleporter.pos.y),
                );
                break;
            case 2:
                gradient = this.ctx.createLinearGradient(
                    ...this.t2(teleporter.pos.x, teleporter.pos.y + teleporter.size.y),
                    ...this.t2(teleporter.pos.x, teleporter.pos.y),
                );
                break;
            case 3:
                gradient = this.ctx.createLinearGradient(
                    ...this.t2(teleporter.pos.x, teleporter.pos.y),
                    ...this.t2(teleporter.pos.x + teleporter.size.x, teleporter.pos.y),
                );
                break;
        }
        for (let t = 0; t <= 1; t += .0625) {
            gradient.addColorStop(t, this.rgb(...this.blendRGB(color0, color1, this.easeGradient(t))));
        }
        return gradient;
    }
    easeGradient(t) {
        return 3 * t * t - 2 * t * t * t;
        // return t;
    }
    // #endregion

    // #region Button, Switch
    /**
     * @param {import("./Map.js").Button} button 
     */
    createButtonPolygon({ pos: { x, y }, size: { x: w, y: h }, dir }) {
        const f = this.settings.door.buttonShapeFactor;
        switch (dir) {
            case 0: // Up
                return [[x + f * w, y], [x + w - f * w, y], [x + w, y + h], [x, y + h]];
            case 1: // Right
                return [[x, y], [x + w, y + f * h], [x + w, y + h - f * h], [x, y + h]];
            case 2: // Down
                return [[x, y], [x + w, y], [x + w - f * w, y + h], [x + f * w, y + h]];
            case 3: // Left
                return [[x, y + f * h], [x + w, y], [x + w, y + h], [x, y + h - f * h]];
            default:
                return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
        }
    }
    /**
     * @param {import("./Map.js").Switch} switch 
     */
    createSwitchPolygon({ pos: { x, y }, size: { x: w, y: h }, dir, switch: s }) {
        const f = this.settings.door.switchShapeFactor * (1 - +!!s * 2);
        switch (dir) {
            case 0: // Up
                return [[x, y + f * h], [x + w, y - f * h], [x + w, y + h], [x, y + h]];
            case 1: // Right
                return [[x, y], [x + w - f * w, y], [x + w + f * w, y + h], [x, y + h]];
            case 2: // Down
                return [[x, y], [x + w, y], [x + w, y + h - f * h], [x, y + h + f * h]];
            case 3: // Left
                return [[x - f * w, y], [x + w, y], [x + w, y + h], [x + f * w, y + h]];
            default:
                return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
        }
    }
    // #endregion

    // #region Player
    /**
     * @param {import("./Game.js").Player} player
     */
    playerBody(player) {
        if (player.name in this.settings.skins) {

            const skin = this.settings.skins[player.name].textures.get(
                player.states.includes("Died"),
                player.states.includes("Freeze")
            ) ?? player.color;

            this.ctx.drawImage(skin,
                ...this.t2(player.pos.x - player.radius, player.pos.y - player.radius),
                this.t(2 * player.radius), this.t(2 * player.radius),
            );
            return;
        }

        const colorRGB = this.settings.player.colors.get(
            player.states.includes("Died"),
            player.states.includes("Freeze")
        ) ?? player.color;

        this.mapCircle(player.pos.x, player.pos.y, player.radius);
        this.fill(this.rgb(...colorRGB));
        this.mapCircle(player.pos.x, player.pos.y, player.radius - this.settings.player.strokeWidth / 2);
        this.stroke(this.rgb(...colorRGB.map(n => n * .75)), this.t(this.settings.player.strokeWidth));
    }
    // #endregion

    // #endregion

    // #region Funnies
    doABarrelRoll() {
        if (this.settings.easterEggs.barrelRoll) return;
        this.settings.easterEggs.barrelRoll = Date.now();
    }
    // #endregion

    // #region Utils
    loadImage(url) {
        let img = new Image();
        img.src = url;
        Loader.image(img);

        return img;
    }
    /**
     * Scales a length to the camera
     * @param {number} d 
     */
    t(d) {
        return Math.round(d * this.camera.actualScale);
    }
    /**
     * Scales a length to the camera without rounding
     * @param {number} d 
     */
    tw(d) {
        return d * this.camera.actualScale;
    }
    /**
     * Transforms a point to the camera
     * @param {number} x 
     * @param {number} y 
     * @returns {[number, number]}
     */
    t2(x, y) {
        return [
            Math.round((x - this.camera.x) * this.camera.actualScale + this.width / 2),
            Math.round((y - this.camera.y) * this.camera.actualScale + this.height / 2)
        ];
    }
    /**
     * Transforms a point to the camera without rounding
     * @param {number} x 
     * @param {number} y 
     * @returns {[number, number]}
     */
    t2w(x, y) {
        return [
            (x - this.camera.x) * this.camera.actualScale + this.width / 2,
            (y - this.camera.y) * this.camera.actualScale + this.height / 2
        ];
    }
    // /**
    //  * Transforms a point to the camera
    //  * @param {{ x: number, y: number }} p
    //  * @returns {[number, number]}
    //  */
    // t2p(p) {
    //     return [
    //         Math.round((p.x - this.camera.x) * this.camera.pixelRatioScale + this.width / 2),
    //         Math.round((p.y - this.camera.y) * this.camera.pixelRatioScale + this.height / 2)
    //     ];
    // }
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    rgb(r, g, b) { return `rgb(${r},${g},${b})`; }
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     */
    rgba(r, g, b, a) { return `rgba(${r},${g},${b},${a})`; }
    /**=
     * @param {number[]} a 
     * @param {number[]} b 
     * @param {number} t ∈ [0, 1], 0 = a, 1 = b
     * @returns {number[]}
     */
    blendRGB(a, b, t) { return a.map((_, i) => a[i] * (1 - t) + b[i] * t); }

    /**
     * @param {Style?} fillStyle 
     */
    fill(fillStyle) {
        if (fillStyle) this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
    }
    /**
     * @param {Style?} strokeStyle 
     */
    stroke(strokeStyle, strokeWidth) {
        if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
        if (strokeWidth) this.ctx.lineWidth = strokeWidth;
        this.ctx.stroke();
    }
    /**
     * Rotate ctx around a point
     * @param {number} angle 
     * @param {number} x Pixel units
     * @param {number} y Pixel units
     */
    rotateAround(angle, x, y) {
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.translate(-x, -y);
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    // #endregion
}