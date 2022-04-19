import createElement from "../../createElement.js";
import Property from "../property.js";

/**
 * @typedef DirectionPropertyOptions
 * @property {string | Node} [name]
 * @property {number} [value]
 * @property {(value: number) => void} [oninput]
 */
export default class DirectionProperty extends Property {
    /** @param {DirectionPropertyOptions} [options] */
    constructor(options) {
        super(options?.name ?? "direction");

        this.elements.main.classList.add("direction");

        this._value = options?.value ?? 0;
        const input = createElement("input", { attributes: { type: "number", value: this._value } });
        const circle = createElement("div", { class: "directionCircle" });
        const lever = createElement("div", { class: "directionLever" });
        const handle = createElement("div", { class: "directionHandle" });

        lever.style.transform = `rotate(${this._value}deg)`;

        let held = false;
        document.addEventListener("mousemove", e => {
            if (!held) return;

            const { left, top, width, height } = circle.getBoundingClientRect();
            lever.style.transform = `rotate(${input.value = this._value = Math.round(((Math.atan2(e.pageY - top - height / 2, e.pageX - left - width / 2) * 180 / Math.PI) % 360 + 360) % 360)}deg)`;
            if ((this._value + DirectionProperty.SPACE) % DirectionProperty.SNAP <= 2 * DirectionProperty.SPACE) {
                lever.style.transform = `rotate(${input.value = this._value = Math.round(this._value / DirectionProperty.SNAP) * DirectionProperty.SNAP}deg)`;
            }
            if (options?.oninput) options.oninput(this._value);
        });
        input.addEventListener("input", e => {
            lever.style.transform = `rotate(${this._value = Number(input.value)}deg)`;
            if (options?.oninput) options.oninput(this._value);
        });
        input.addEventListener("change", e => {
            lever.style.transform = `rotate(${this._value = input.value = ((Number(input.value) || 0) % 360 + 360) % 360}deg)`;
            if (options?.oninput) options.oninput(this._value);
        });
        handle.addEventListener("mousedown", () => (held = true, handle.classList.add("active")));
        document.addEventListener("mouseup", () => (held = false, handle.classList.remove("active")));

        input.onwheel = () => { }; // fix for scroll
        lever.append(handle);
        circle.append(lever, input);
        this.elements.main.append(circle);

        this.elements = { ...this.elements, input, circle, lever, handle };
    }
    get value() {
        return this._value;
    }
    static SNAP = 30;
    static SPACE = 3;
}