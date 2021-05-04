declare function createLI(_class?: string, id?: string): HTMLLIElement;
declare function createFolder(title?: string, lis?: HTMLLIElement[]): HTMLLIElement;

type PropertyOptions<Type> = {
    value?: Type;
    event(value: Type): void;
    selectType: "number" | "string";
    selectOptions: [string, Type][];
};
declare function createProperty(name?: string, input?: HTMLInputElement, type?: string, options?: PropertyOptions<any>): HTMLLIElement;


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

type SkapObject = Obstacle | Lava | Slime | Ice | Block | Teleporter | SkapText | Spawner | GravZone;

declare function createObstacle(x?: number, y?: number, w?: number, h?: number): Obstacle;
declare function createLava(x?: number, y?: number, w?: number, h?: number): Lava;
declare function createSlime(x?: number, y?: number, w?: number, h?: number): Slime;
declare function createIce(x?: number, y?: number, w?: number, h?: number): Ice;
declare function createBlock(x?: number, y?: number, w?: number, h?: number, color?: ColorArr, opacity?: number): Block;
declare function createTeleporter(x?: number, y?: number, w?: number, h?: number, dir?: Direction, id?: number, targetArea?: string, targetId?: number): Teleporter;
declare function createSpawner(x?: number, y?: number, w?: number, h?: number, enemyType?: string, number?: number, speed?: number, radius?: number): Spawner;
declare function createText(x?: number, y?: number, content?: string): SkapText;
declare function createGravZone(x?: number, y?: number, w?: number, h?: number, dir?: Direction): GravZone;

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
    };
    element: HTMLLIElement;
    button: HTMLButtonElement;
    inputs: {
        [name: string]: HTMLInputElement;
    }
};

declare function createArea(name?: string, color?: ColorArr, opacity?: number, background?: ColorArr, w?: number, h?: number): Area;

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
}
declare const map: SkapMap;

declare let currentArea: Area;
declare let selectedObject: SkapObject | null