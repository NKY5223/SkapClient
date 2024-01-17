import Validator from "./Validator.js";

/** Base Object
 * @template {string} T
 * @typedef {{ 
    * type: T, 
    * id: number, 
    * pos: { x: number, y: number },
    * size: { x: number, y: number }
    * }} BaseSkapMapObject
 */
/** Typedefs
 * @typedef { BaseSkapMapObject<"obstacle"> } Obstacle
 * @typedef { BaseSkapMapObject<"lava"> } Lava
 * @typedef { BaseSkapMapObject<"slime"> } Slime
 * @typedef { BaseSkapMapObject<"ice"> } Ice
 * @typedef { BaseSkapMapObject<"text"> & { text: string } } Text
 * @typedef { BaseSkapMapObject<"teleporter"> & { dir: 0 | 1 | 2 | 3 } } Teleporter
 * @typedef { BaseSkapMapObject<"block"> & { color: [number, number, number], opacity: number, layer: 0 } } Block0
 * @typedef { BaseSkapMapObject<"block"> & { color: [number, number, number], opacity: number, layer: 1 } } Block1
 * @typedef { Block0 | Block1 } Block
 * 
 * @typedef { BaseSkapMapObject<"turret"> & { dir: number } } Turret
 * 
 * @typedef { BaseSkapMapObject<"gravityZone"> & { dir: 0 } } Gravity0
 * @typedef { BaseSkapMapObject<"gravityZone"> & { dir: 1 } } Gravity1
 * @typedef { BaseSkapMapObject<"gravityZone"> & { dir: 2 } } Gravity2
 * @typedef { BaseSkapMapObject<"gravityZone"> & { dir: 3 } } Gravity3
 * @typedef { BaseSkapMapObject<"gravityZone"> & { dir: number } } GravityZone
 * 
 * @typedef { BaseSkapMapObject<"button"> & { pressed: false, linkId: number, dir: 0 | 1 | 2 | 3 } } ButtonUnpressed
 * @typedef { BaseSkapMapObject<"button"> & { pressed: true, linkId: number, dir: 0 | 1 | 2 | 3 } } ButtonPressed
 * @typedef { BaseSkapMapObject<"button"> & { pressed: boolean, linkId: number, dir: 0 | 1 | 2 | 3 } } Button
 * 
 * @typedef { BaseSkapMapObject<"rotatingLava"> & { center: { x: number, y: number }, angle?: number, axis?: { x: number, y: number } } } RotatingLava
 * 
 * @typedef { BaseSkapMapObject<"movingObstacle"> } MovingObstacle
 * @typedef { BaseSkapMapObject<"movingLava"> } MovingLava
 * @typedef { BaseSkapMapObject<"movingSlime"> } MovingSlime
 * @typedef { BaseSkapMapObject<"movingIce"> } MovingIce
 * 
 * @typedef { BaseSkapMapObject<"circularObstacle"> & { radius: number } } CircularObstacle
 * @typedef { BaseSkapMapObject<"circularLava"> & { radius: number } } CircularLava
 * @typedef { BaseSkapMapObject<"circularSlime"> & { radius: number } } CircularSlime
 * @typedef { BaseSkapMapObject<"circularIce"> & { radius: number } } CircularIce
 * 
 * @typedef { Obstacle | Lava | Slime | Ice | Text | Teleporter | Block | Turret | GravityZone | RotatingLava | MovingObstacle | MovingLava | MovingSlime | MovingIce | CircularObstacle | CircularLava | CircularSlime | CircularIce } SkapMapObject
 *
 * @typedef {{ 
            * all: SkapMapObject[],
            * unknown: SkapMapObject[],
            * obstacle: Obstacle[],
            * lava: Lava[],
            * slime: Slime[],
            * ice: Ice[],
            * teleporter: Teleporter[],
            * text: Text[],
            * block0: Block0[],
            * block1: Block1[],
            * turret: Turret[],
            * gravity0: Gravity0[],
            * gravity1: Gravity1[],
            * gravity2: Gravity2[],
            * gravity3: Gravity3[],
            * gravityZone: GravityZone[],
            * buttonUnpressed: ButtonUnpressed[],
            * buttonPressed: ButtonPressed[],
            * rotatingLava: RotatingLava[],
            * movingObstacle: MovingObstacle[],
            * movingLava: MovingLava[],
            * movingSlime: MovingSlime[],
            * movingIce: MovingIce[],
            * circularObstacle: CircularObstacle[],
            * circularLava: CircularLava[],
            * circularSlime: CircularSlime[],
            * circularIce: CircularIce[],
            * [type: string]: SkapMapObject[]
         * }} SkapMapObjects
 */

export default class SkapMap {
    constructor() {
        // #region Constants
        this.objTypes = [
            "obstacle", "movingObstacle", "circularObstacle",
            "teleporter",
            "lava", "rotatingLava", "movingLava", "circularLava",
            "ice", "movingIce", "circularIce",
            "slime", "movingSlime", "circularSlime",
            "buttonPressed", "buttonUnpressed", "switchPressed", "switchUnpressed", 
            "doorOpened", "doorClosed",
            "block0", "block1",
            "text",
            "turret",
            "gravity0", "gravity1", "gravity2", "gravity3", "gravityZone",
            "reward", "hatReward",
            "box"
        ];

        this.objTypeMap = {
            0: "rotatingLava",
            1: "movingLava",
            2: "movingObstacle",
            3: "movingIce",
            4: "movingSlime"
        };
        /** @type {{ [type: string]: (() => SkapMapObject[]) }} */
        this.updateObjTypes = {
            button: _ => [...this.objects.buttonUnpressed, ...this.objects.buttonPressed],
            switch: _ => [...this.objects.switchUnpressed, ...this.objects.switchPressed],
            door: _ => [...this.objects.doorOpened, ...this.objects.doorClosed],
        };

        /** @type {{ [type: string]: (obj: SkapMapObject) => boolean }} */
        this.objFilters = {
            block0: obj => obj.type === "block" && obj.layer === 0,
            block1: obj => obj.type === "block" && obj.layer === 1,

            gravity0: obj => obj.type === "gravityZone" && obj.dir === 0,
            gravity1: obj => obj.type === "gravityZone" && obj.dir === 1,
            gravity2: obj => obj.type === "gravityZone" && obj.dir === 2,
            gravity3: obj => obj.type === "gravityZone" && obj.dir === 3,
            gravityZone: obj => obj.type === "gravityZone" && ![0, 1, 2, 3].includes(obj.dir),

            buttonUnpressed: obj => obj.type === "button" && !obj.pressed,
            buttonPressed: obj => obj.type === "button" && obj.pressed,

            switchUnpressed: obj => obj.type === "switch" && !obj.switch,
            switchPressed: obj => obj.type === "switch" && obj.switch,

            doorClosed: obj => obj.type === "door" && !obj.opened,
            doorOpened: obj => obj.type === "door" && obj.opened,
        };

        /** @type {{ [type: string]: (update, obj: SkapMapObject) => void }} */
        this.updateObj = {
            rotatingLava: (update, obj) => {
                obj.center.x = update.center.x;
                obj.center.y = update.center.y;
                obj.angle = update.angle * Math.PI / 180;
            },
            movingObstacle: (update, obj) => {
                obj.pos.x = update.pos.x;
                obj.pos.y = update.pos.y;
            },
            movingLava: (update, obj) => {
                obj.pos.x = update.pos.x;
                obj.pos.y = update.pos.y;
            },
            movingSlime: (update, obj) => {
                obj.pos.x = update.pos.x;
                obj.pos.y = update.pos.y;
            },
            movingIce: (update, obj) => {
                obj.pos.x = update.pos.x;
                obj.pos.y = update.pos.y;
            },

            button: (update, obj) => {
                obj.pos.x = update.pos.x;
                obj.pos.y = update.pos.y;
                obj.size.x = update.size.x;
                obj.size.y = update.size.y;

                obj.pressed = update.pressed;
            },

            switch: (update, obj) => {
                obj.pos.x = update.pos.x;
                obj.pos.y = update.pos.y;
                obj.size.x = update.size.x;
                obj.size.y = update.size.y;

                obj.switch = update.switch;
            },
            door: (update, obj) => {
                obj.opened = update.opened;
            },

            turret: (update, obj) => {
                obj.dir = update.dir;
            },
        };
        // #endregion

        this.color = [0x00, 0x0a, 0x57, .8];
        this.background = [0xe6, 0xe6, 0xe6];
        this.areaSize = { x: 100, y: 100 };
        /** @type {SkapMapObjects} */
        this.objects = {
            all: [],
            unknown: [],
            ...Object.fromEntries(this.objTypes.map(type => [type, []]))
        };
    }
    init(rawMap) {
        this.areaSize.x = Validator.number(rawMap.areaSize.x, 0);
        this.areaSize.y = Validator.number(rawMap.areaSize.y, 0);

        this.background = Validator.rgb(rawMap.areaColor)
        this.color = Validator.rgba(rawMap.backgroundColor);

        let a = this.color[3];
        this.blendedColor = this.color.slice(0, 3).map(v => v * a + 240 * (1 - a));


        this.objects = {
            all: [],
            unknown: [],
            ...Object.fromEntries(this.objTypes.map(type => [type, []]))
        }

        for (let obj of rawMap.objects) {
            if (obj.type in this.objTypeMap) obj.type = this.objTypeMap[obj.type]
            if (obj.hasOwnProperty("dir")) obj.dir = +obj.dir;
            if (obj.hasOwnProperty("layer")) obj.layer = +!!+obj.layer;
            if (obj.hasOwnProperty("pressed")) obj.pressed = !!obj.pressed;

            this.addObj(obj);
        }
    }
    /** @param {{ update?: { type: string, id: number }[], add?: { type: string, id: number }[], remove?: { type: string, id: number }[] }} updates */
    update(updates) {
        if (updates.update) for (let update of updates.update) {
            if (update.type in this.objTypeMap) update.type = this.objTypeMap[update.type];

            if (update.type in this.updateObj) {
                let obj = (this.updateObjTypes.hasOwnProperty(update.type)
                    ? this.updateObjTypes[update.type]()
                    : this.objects[update.type]).find(obj => obj.id === update.id);
                if (obj) {
                    this.removeObj(obj);
                    this.updateObj[update.type](update, obj);
                    this.addObj(obj);
                }
            }
        }
        if (updates.add) for (let update of updates.add) {
            this.addObj(update);
        }
        if (updates.remove) for (let update of updates.remove) {
            if (update.type in this.objTypeMap) update.type = this.objTypeMap[update.type];

            let objType = this.objTypes.find(type =>
                (this.objFilters.hasOwnProperty(type) ? this.objFilters[type](update) : type === update.type)
            ) ?? "unknown";

            let obj = this.objects[objType].find(obj => obj.id === update.id);

            if (obj) this.removeObj(obj);
        }
    }
    /** @param {SkapMapObject} obj */
    addObj(obj) {
        if (this.objects.all.includes(obj)) return;

        this.objects.all.push(obj);

        let objType = this.objTypes.find(type =>
            (this.objFilters.hasOwnProperty(type) ? this.objFilters[type](obj) : type === obj.type)
        ) ?? "unknown";

        if (this.objects[objType].includes(obj)) return;

        this.objects[objType].push(obj);
    }
    /** @param {SkapMapObject} obj */
    removeObj(obj) {
        if (!this.objects.all.includes(obj)) return;

        this.objects.all.splice(this.objects.all.indexOf(obj), 1);

        let objType = this.objTypes.find(type =>
            (this.objFilters.hasOwnProperty(type) ? this.objFilters[type](obj) : type === obj.type)
        ) ?? "unknown";


        if (!this.objects[objType].includes(obj)) return;

        this.objects[objType].splice(this.objects[objType].indexOf(obj), 1);
    }
}