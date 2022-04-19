import createElement from "../../createElement.js";
import Property from "../property.js";

/**
 * @typedef NumberPropertyOptions
 * @property {string | Node} [name]
 * @property {number} [value]
 * @property {number} [min]
 * @property {number} [max]
 * @property {(value: number) => void} [oninput]
 */
export default class NumberProperty extends Property {
    /** @param {NumberPropertyOptions} [options] */
    constructor(options) {
        super(options?.name ?? "number");
        
        this.elements.main.classList.add("number");

        const input = createElement("input", { attributes: { type: "number", value: options?.value ?? 0, min: options?.min ?? null, max: options?.max ?? null }});
        
        input.onwheel = () => {}; // fix for scroll
        this.elements.main.append(input);
        
        this.elements = { ...this.elements, input };
        
        if (options?.oninput) input.addEventListener("input", e => options.oninput(this.value));
    }
    get value() {
        return Number(this.elements.input.value);
    }
}