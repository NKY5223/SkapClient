import createElement from "../../createElement.js";
import Property from "../property.js";


/**
 * @typedef TextPropertyOptions
 * @property {string | Node} [name]
 * @property {string} [value]
 * @property {(value: string) => void} [oninput]
 */
export default class TextProperty extends Property {
    /** @param {TextPropertyOptions} [options] */
    constructor(options) {
        super(options?.name ?? "text");

        this.elements.main.classList.add("text");

        const input = createElement("input", { attributes: { type: "text", spellcheck: "false" } });
        this.elements.main.append(input);
        
        this.elements = { ...this.elements, input };
        
        if (!options) return;
        if (options.value) input.value = options.value;
        if (options.oninput) input.addEventListener("input", e => options.oninput(this.value));
    }
    get value() {
        return this.elements.input.value;
    }
}