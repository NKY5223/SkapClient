import createElement from "../../createElement.js";
import Property from "../property.js";

/**
 * @typedef SelectPropertyOptions
 * @property {string | Node} [name]
 * @property {string} [value]
 * @property {string[]} [options]
 * @property {(value: string) => void} [oninput]
 */
export default class SelectProperty extends Property {
    /** @param {SelectPropertyOptions} options */
    constructor(options) {
        super(options?.name ?? "select");

        this.elements.main.classList.add("select");
        this.elements.main.classList.add("text");

        const select = createElement("select");
        if (options?.options instanceof Array) select.append(...options.options.map(option => createElement("option", {
            content: option,
            attributes: {
                value: option,
                ...(option === options?.value ? { selected: "" } : {})
            }
        })));
        if (options?.oninput) select.addEventListener("change", e => options.oninput(select.value));

        this.elements.main.append(select);

        this.elements = { ...this.elements, select };
    }
    get value() {
        return this.elements.select.value;
    }
}