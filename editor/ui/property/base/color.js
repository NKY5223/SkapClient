import createElement from "../../createElement.js";
import Property from "../property.js";

/**
 * @typedef ColorPropertyOptions
 * @property {string | Node} [name]
 * @property {string} [value] Value in the form of #rrggbb
 * @property {(value: string) => void} [oninput]
 */

export default class ColorProperty extends Property {
    /** @param {ColorPropertyOptions} [options] */
    constructor(options) {
        super(options?.name ?? "color");
        const main = this.elements.main;

        main.classList.add("color");

        const input = createElement("input", { id: generateId(), attributes: { type: "color" } });
        const wrapper = createElement("label", { attributes: { for: input.id } });

        input.value = options?.value;
        wrapper.append(input.value);
        const label = wrapper.firstChild;
        wrapper.append(input);
        main.append(wrapper);
        
        function update() {
            label.nodeValue = input.value;
            main.style.borderLeftColor = wrapper.style.backgroundColor = input.value;

            if (luma(hexToArr(input.value)) > 127) main.classList.add("light");
            else main.classList.remove("light");
        }

        update();
        input.addEventListener("input", e => {
            update();
            if (options.oninput) options.oninput(input.value);
        });
    }
}
let id = 0;
function generateId() { return "generated" + id++; }

/** @param {[number, number, number]} color */
function luma([r, g, b]) { return 0.2126 * r + 0.7152 * g + 0.0722 * b; }

const validHex = /^#[0-9a-f]{6}$/i;
/** 
 * @param {string} color A hex color in the form of #rrggbb
 * @returns {[number, number, number]} [r, g, b]
 */
function hexToArr(color) { return validHex.test(color) ? color.slice(1).match(/[0-9a-f]{2}/g).map(s => Number.parseInt(s, 16)) : null; }