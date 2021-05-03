type VectorLike = {
    x: number;
    y: number;
}
type ColorArr = [number, number, number];

type SkapObject = {
    pos: VectorLike;
    size: VectorLike;
    type: string;
    inputs: {
        [name: string]: HTMLInputElement
    };
    element: HTMLLIElement;
}
type Obstacle = SkapObject & {
    type: "obstacle";
}
type Lava = SkapObject & {
    type: "lava";
}
type Slime = SkapObject & {
    type: "slime";
}
type Ice = SkapObject & {
    type: "ice";
}
type Block = SkapObject & {
    colorArr: ColorArr;
    color: string;
    opacity: number;
    collide: boolean;
    layer: boolean;
    type: "block";
}
declare function createObstacle(x?: number, y?: number, w?: number, h?: number): Obstacle
declare function createLava(x?: number, y?: number, w?: number, h?: number): Lava
declare function createSlime(x?: number, y?: number, w?: number, h?: number): Slime
declare function createIce(x?: number, y?: number, w?: number, h?: number): Ice