import NumberProperty from "../base/number.js";
import Folder from "../folder.js";

/**
 * @typedef {{ 
 *     name?: string | Node,
 *     value?: { x: number, y: number }, 
 *     x?: import("../base/number.js").NumberPropertyOptions, 
 *     y?: import("../base/number.js").NumberPropertyOptions, 
 *     oninput?: (value: { x: number, y: number }) => void 
 * }} PositionPropertyOptions
 */
export default class PositionProperty {
    /**
     * @param {PositionPropertyOptions} options
     */
    constructor(options) {
        const x = new NumberProperty({
            ...options?.x,
            name: options?.x?.name ?? "x",
            value: options?.value?.x ?? options?.x?.value ?? 0,
            oninput: x => {
                this.value.x = x;
                if (options?.oninput) options.oninput(this.value);
                if (options?.x?.oninput) options.x.oninput(x);
            }
        });
        const y = new NumberProperty({
            ...options?.y,
            name: options?.y?.name ?? "y", 
            value: options?.value?.y ?? options?.y?.value ?? 0,
            oninput: y => {
                this.value.y = y;
                if (options.oninput) options.oninput(this.value);
                if (options?.y?.oninput) options.y.oninput(y);
            }
        });
        const main = new Folder(options?.name ?? "position", [x, y]);

        this.elements = { main: main.elements.main, x: x.elements.main, y: y.elements.main };

        this.value = options?.value ?? { x: 0, y: 0 };
    }
}