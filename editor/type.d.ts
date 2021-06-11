declare function createLI(_class?: string, id?: string): HTMLLIElement;
declare function createFolder(title?: string, lis?: HTMLLIElement[]): HTMLLIElement;

type PropertyOptions<Type> = {
    value?: Type;
    event(value: Type): void;
};
type SelectOptions<Type> = {
    value?: Type;
    event(value: Type): void;
    selectType: string;
    selectOptions: [string, Type][];
}
declare function createProperty(name: string, input: HTMLInputElement, type: "number", options: null): HTMLLIElement;
declare function createProperty(name: string, input: HTMLInputElement, type: "text", options: null): HTMLLIElement;
declare function createProperty(name: string, input: HTMLInputElement, type: "direction", options: PropertyOptions<number>): HTMLLIElement;
declare function createProperty(name: string, input: null, type: "cardinal", options: PropertyOptions<Direction>): HTMLLIElement;
declare function createProperty(name: string, input: null, type: "cardinalCenter", options: PropertyOptions<Direction | 4>): HTMLLIElement;
declare function createProperty(name: string, input: null, type: "select", options: SelectOptions<any>): HTMLLIElement;
declare function createProperty(name: string, input: HTMLInputElement, type: "switch", options: null): HTMLLIElement;
declare function createProperty(name: string, input: HTMLInputElement, type: string, options: PropertyOptions<any>): HTMLLIElement;


type VectorLike = {
    x: number;
    y: number;
};
type ColorArr = [number, number, number];
type Direction = 0 | 1 | 2 | 3;

type BaseSkapObject = {
    pos: VectorLike;
    size: VectorLike;
    type: string;
    inputs: {
        [name: string]: HTMLInputElement;
    };
    element: HTMLLIElement;
};
type Obstacle = BaseSkapObject & {
    type: "obstacle";
};
type Lava = BaseSkapObject & {
    type: "lava";
};
type Slime = BaseSkapObject & {
    type: "slime";
};
type Ice = BaseSkapObject & {
    type: "ice";
};
type Block = BaseSkapObject & {
    colorArr: ColorArr;
    color: string;
    opacity: number;
    collide: boolean;
    layer: boolean;
    type: "block";
};
type Teleporter = BaseSkapObject & {
    dir: 0 | 1 | 2 | 3;
    id: number;
    targetArea: string;
    targetID: number;
    type: "teleporter";
};
type SkapText = BaseSkapObject & {
    text: string;
    size: {
        x: 5;
        y: 5;
    };
    type: "text";
};
type Spawner = BaseSkapObject & {
    enemyType: string;
    number: number;
    speed: number;
    radius: number;
    type: "spawner"
};
type GravZone = BaseSkapObject & {
    dir: 0 | 1 | 2 | 3;
    type: "gravZone";
};
type RotLavaPoint = VectorLike & {
    type: "rotLavaPoint";
    rotLava: RotatingLava;
}
type RotatingLava = BaseSkapObject & {
    point: RotLavaPoint;
    startAngle: number;
    speed: number;
    type: "rotatingLava"
};
type CircularObject = BaseSkapObject & {
    radius: number;
    objectType: "obstacle" | "lava" | "slime" | "ice";
    type: "circularObject";
};
type Door = BaseSkapObject & {
    linkIds: number[];
    type: "door";
};
type Switch = BaseSkapObject & {
    id: number;
    dir: Direction;
    type: "switch";
};
type Button = BaseSkapObject & {
    id: number;
    dir: Direction;
    type: "button";
};
type TurretRegion = {
    pos: VectorLike;
    size: VectorLike;
    type: "turretRegion";
};
type Turret = BaseSkapObject & {
    size: {
        x: 6;
        y: 6;
    };
    region: TurretRegion;
    radius: number;
    speed: number;
    shootingSpeed: number;
    overHeat: number;
    coolDownTime: number;
    type: "turret";
};
type MovObjPoint = VectorLike & {
    vel: number;
    element: HTMLLIElement;
    inputs: {
        x: HTMLInputElement;
        y: HTMLInputElement;
        vel: HTMLInputElement;
    };
};
type MovingObject = BaseSkapObject & {
    points: MovObjPoint[];
    objectType: "obstacle" | "lava" | "slime" | "ice";
}

type SkapObject = Obstacle | Lava | Slime | Ice | Block | Teleporter | SkapText | Spawner | GravZone | RotatingLava | CircularObject | Door | Switch | Button | Turret | MovingObject;

declare function createObstacle(x?: number, y?: number, w?: number, h?: number): Obstacle;
declare function createLava(x?: number, y?: number, w?: number, h?: number): Lava;
declare function createSlime(x?: number, y?: number, w?: number, h?: number): Slime;
declare function createIce(x?: number, y?: number, w?: number, h?: number): Ice;
declare function createBlock(x?: number, y?: number, w?: number, h?: number, color?: ColorArr, opacity?: number, layer?: boolean): Block;
declare function createTeleporter(x?: number, y?: number, w?: number, h?: number, dir?: Direction, id?: number, targetArea?: string, targetId?: number): Teleporter;
declare function createSpawner(x?: number, y?: number, w?: number, h?: number, enemyType?: string, number?: number, speed?: number, radius?: number): Spawner;
declare function createText(x?: number, y?: number, content?: string): SkapText;
declare function createGravZone(x?: number, y?: number, w?: number, h?: number, dir?: Direction): GravZone;
declare function createRotatingLava(x?: number, y?: number, w?: number, h?: number, pointX?: number, pointY?: number, startAngle?: number, speed?: number): RotatingLava;
declare function createCircularObject(x?: number, y?: number, r?: number, type?: "obstacle" | "lava" | "slime" | "ice"): CircularObject;
declare function createDoor(x?: number, y?: number, w?: number, h?: number, linkIds?: number[]): Door;
declare function createSwitch(x?: number, y?: number, w?: number, h?: number, dir?: Direction, id?: number): Switch;
declare function createButton(x?: number, y?: number, w?: number, h?: number, dir?: Direction, id?: number, time?: number): Button;
declare function createTurret(x: number, y: number, regionX: number, regionY: number, regionW: number, regionH: number, radius: number, speed: number, shootingSpeed: number, overHeat: number, coolDownTime: number): Turret;
declare function createMovingObject(w?: number, h?: number, objectType?: "obstacle" | "lava" | "slime" | "ice", points?: { x: number, y: number, vel: number }[]);

declare function addObstacle(): void;
declare function addLava(): void;
declare function addSlime(): void;
declare function addIce(): void;
declare function addBlock(): void;
declare function addTeleporter(): void;
declare function addSpawner(): void;
declare function addText(): void;
declare function addGravZone(): void;
declare function addRotatingLava(): void;
declare function addCircularObject(): void;
declare function addDoor(): void;
declare function addSwitch(): void;
declare function addButton(): void;
declare function addTurret(): void;

type Area = {
    name: string;
    color: string;
    colorArr: ColorArr;
    background: string;
    backgroundArr: ColorArr;
    opacity: number;
    size: [number, number];
    objects: {
        [type: string]: SkapObject[];
        obstacle: Obstacle[];
        lava: Lava[];
        slime: Slime[];
        ice: Ice[];
        block: Block[];
        teleporter: Teleporter[];
        text: SkapText[];
        spawner: Spawner[];
        gravityZone: GravZone[];
        rotatingLava: RotatingLava[];
        circularObject: CircularObject[];
        door: Door[];
        switch: Switch[];
        button: Button[];
        turret: Turret[];
        movingObject: MovingObject[];
    };
    gravity: number;

    element: HTMLLIElement;
    button: HTMLButtonElement;
    inputs: {
        [name: string]: HTMLInputElement;
    }
};

declare function createArea(name?: string, color?: ColorArr, opacity?: number, background?: ColorArr, w?: number, h?: number): Area;
declare function addArea(name?: string): void;

type SkapMap = {
    settings: {
        name: string | null;
        creator: string | null;
        spawnArea: string;
        spawnPos: [number, number];
        version: number | null;
        skapclient_version: number | null;
    };
    areas: Area[];
    element: HTMLLIElement;
    inputs: {
        [name: string]: HTMLInputElement;
    }
}
declare const map: SkapMap;

declare let currentArea: Area;
declare let selectedObject: SkapObject | null;

declare const canvas: HTMLCanvasElement;
declare const ctx: CanvasRenderingContext2D;

declare const keysDown: Set<string>;