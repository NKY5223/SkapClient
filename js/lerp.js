export default function lerp(a = 0, b = 1, t = 0) {
    return a * (1 - t) + b * t;
}