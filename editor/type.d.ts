type VectorLike = {
    x: number,
    y: number
}
type ColorArr = [number, number, number]

type SkapObject = {
    pos: VectorLike,
    size: VectorLike,
    type: string
}
type Obstacle = SkapObject & {
    type: "obstacle"
}
type Lava = SkapObject & {
    type: "lava"
}
type Slime = SkapObject & {
    type: "slime"
}
type Ice = SkapObject & {
    type: "ice"
}
type Block = SkapObject & {
    color: ColorArr;
    layer: 0 | 1,
    type: "block"
}
declare function createObstacle(x?: number, y?: number, w?: number, h?: number): Obstacle
declare function createLava(x?: number, y?: number, w?: number, h?: number): Lava
declare function createSlime(x?: number, y?: number, w?: number, h?: number): Slime
declare function createIce(x?: number, y?: number, w?: number, h?: number): Ice