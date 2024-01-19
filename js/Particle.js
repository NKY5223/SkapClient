import Loader from "./Loader.js";
import Renderer from "./Renderer.js";
import lerp from "./lerp.js";

/** @typedef {{ x: number, y: number }} Vector2 */
/** @returns {Vector2} */
export function vec(x = 0, y = 0) {
    return { x, y };
}
export function add(vec1, vec2) {
    return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
}
export function scale(vec, scalar) {
    return { x: vec.x * scalar, y: vec.y * scalar };
}
export function vecPol(r = 1, θ = 0) {
    return vec(r * Math.cos(θ), r * Math.sin(θ));
}
export function rand(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

/** @typedef {ConstructorParameters<typeof Particle>[0]} ParticleInputs */
export class Particle {
    /** @param {{ pos: Vector2, vel: Vector2, accel: Vector2, lifetime: number, color: [number, number, number, number] }} inputs */
    constructor({ pos, vel, accel, lifetime, color }) {
        this.pos = pos;
        this.vel = vel;
        this.accel = accel;
        this.lifetime = lifetime;
        this.dead = false;
        this.color = color;
    }
    update(dt = 0.016) {
        this.vel.x += this.accel.x * dt;
        this.vel.y += this.accel.y * dt;

        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        this.lifetime -= dt;
        this.dead = this.lifetime <= 0;
    }
    /**  @param {Renderer} renderer  */
    render(renderer) {

    }
}

export class RectParticle extends Particle {
    /** @param {{ pos: Vector2, vel: Vector2, accel: Vector2, lifetime: number, size: Vector2, vsize: Vector2 }} inputs */
    constructor({ pos, vel, accel, lifetime, size, vsize }) {
        super({ pos, vel, accel, lifetime });
        this.size = size;
        this.vsize = vsize;
    }
    update(dt = 0.016) {
        super.update(dt);
        this.size.x += this.vsize.x;
        this.size.y += this.vsize.y;
    }
    /**  @param {Renderer} renderer  */
    render(renderer) {
        super.render(renderer);
        renderer.mapRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}
export class CircularParticle extends Particle {
    /** @param {ParticleInputs & { r: number, vr: number }} inputs */
    constructor({ pos, vel, accel, lifetime, color, r, vr }) {
        super({ pos, vel, accel, lifetime, color });
        this.r = r;
        this.vr = vr;
    }
    update(dt = 0.016) {
        super.update(dt);
        this.r += this.vr * dt;
    }
    /**  @param {Renderer} renderer  */
    render(renderer) {
        super.render(renderer);

        renderer.ctx.save();

        renderer.ctx.fillStyle = renderer.rgba(...this.color);
        renderer.mapCircle(this.pos.x, this.pos.y, this.r);
        renderer.ctx.fill();

        renderer.ctx.restore();
    }
}
export class ImageParticle extends Particle {
    /** @param {ParticleInputs & { size: Vector2, vsize: Vector2, image: CanvasImageSource, opacity: number }} inputs */
    constructor({ pos, vel, accel, lifetime, size, vsize, image, opacity }) {
        super({ pos, vel, accel, lifetime });
        this.size = size;
        this.vsize = vsize;
        this.image = image;
        this.opacity = opacity;
    }
    update(dt = 0.016) {
        super.update(dt);
        this.size.x += this.vsize.x;
        this.size.y += this.vsize.y;
    }
    /**  @param {Renderer} renderer  */
    render(renderer) {
        super.render(renderer);
        renderer.ctx.save();
        renderer.ctx.globalAlpha = this.opacity;
        renderer.ctx.drawImage(
            this.image, 
            ...renderer.t2w(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2), 
            renderer.tw(this.size.x), renderer.tw(this.size.y)
        );
        renderer.ctx.restore();
    }
}

export class ExplosionParticle extends CircularParticle {
    /** @param {{ pos: Vector2 }} inputs */
    constructor({ pos }) {
        super({
            pos, vel: vec(0, 0), accel: vec(0, 0),
            r: 0, vr: 200,
            lifetime: 0.25,
            color: [128, 128, 128, 0.1]
        });
    }
    update(dt = 0) {
        super.update(dt);
        this.color[3] -= 0.4 * dt;
    }
}
export class ShrinkingParticle extends CircularParticle {
    /** @param {{ pos: Vector2 }} inputs */
    constructor({ pos }) {
        const vel = vecPol(rand(20, 40), rand(0, 2 * Math.PI));
        super({
            pos, vel, accel: vec(0, 0),
            r: 1, vr: -3,
            lifetime: 0.25,
            color: [160, 0, 255, 1]
        });
    }
    update(dt = 0) {
        super.update(dt);
    }
}
export class DashParticle extends CircularParticle {
    /** @param {{ pos: Vector2, dir: number }} inputs */
    constructor({ pos, dir }) {
        const vel = vecPol(-40, dir);
        super({
            pos, vel, accel: vec(0, 0),
            r: 6, vr: 24,
            lifetime: 0.25,
            color: [82, 235, 194, 0.5]
        });
    }
    update(dt = 0) {
        super.update(dt);
        this.color[3] -= 2 * dt;
    }
}
export class JetpackParticle extends CircularParticle {
    /** @param {{ pos: Vector2, vel: Vector2 }} inputs */
    constructor({ pos, vel }) {
        const spread = 3;
        const newVel = add(
            scale(vel, -0.25),
            vecPol(rand(20, 40), rand(Math.PI / 2 - spread / 2, Math.PI / 2 + spread / 2))
        );
        super({
            pos, vel: newVel, accel: vec(0, 0),
            lifetime: 1,
            color: [128, 128, 128, 0.5],
            r: 1, vr: 1
        });
    }
    update(dt) {
        super.update(dt);
        const e = 5 * dt;
        this.color[3] = lerp(this.color[3], 0, e);
    }
}
export class FeatherParticle extends ImageParticle {
    static image = Renderer.prototype.loadImage("https://skap.io/textures/powers/feather.svg");

    /** @param {{ pos: Vector2 }} inputs */
    constructor({ pos }) {
        const vel = vecPol(rand(5, 10), rand(0, 2 * Math.PI));
        super({
            pos, vel, accel: vec(0, 5),
            size: vec(3, 3), vsize: vec(0, 0),
            lifetime: 2,
            image: FeatherParticle.image, opacity: 0.75
        });
    }
    update(dt = 0) {
        super.update(dt);
        const e = dt * 0.5;
        this.opacity = lerp(this.opacity, 0, e);
    }
}

export class ParticleManager {
    constructor() {
        /** @type {Particle[]} */
        this.particles = [];
    }
    /**
     * @param {Particle} particle
     */
    addParticle(particle) {
        this.particles.push(particle);
    }
    clearParticles() {
        this.particles.splice(0);
    }
    update(dt) {
        this.particles.forEach(particle => particle.update(dt));
        this.particles = this.particles.filter(particle => !particle.dead);
    }
    render(renderer) {
        this.particles.forEach(particle => particle.render(renderer));
    }
}