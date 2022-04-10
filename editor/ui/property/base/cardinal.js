import createElement from "../../createElement.js";
import Property from "../property.js";

/**
 * @typedef CardinalPropertyOptions
 * @property {string | Node} [name]
 * @property {booolean} [includeNone]
 * @property {0 | 1 | 2 | 3 | 4} [value]
 * @property {(value: 0 | 1 | 2 | 3 | 4) => void} [oninput]
 */
export default class CardinalProperty extends Property {
    /** @param {CardinalPropertyOptions} [options] */
    constructor(options) {
        super(options?.name ?? "cardinal");

        this.elements.main.classList.add("cardinal");

        const wrapper = createElement("div", { class: "cardinalWrapper" });
        const up = createElement("button", { class: "cardinalUp" });
        const right = createElement("button", { class: "cardinalRight" });
        const down = createElement("button", { class: "cardinalDown" });
        const left = createElement("button", { class: "cardinalLeft" });
        const none = createElement("button", { class: "cardinalNone" });

        let active = (typeof options?.value === "number")
            ? (options.value === CardinalProperty.UP) ? up
                : (options.value === CardinalProperty.RIGHT) ? right
                    : (options.value === CardinalProperty.DOWN) ? down
                        : (options.value === CardinalProperty.LEFT) ? left
                            : none : none;
        active.classList.add("active");

        [up, right, down, left, none].forEach((b, i) => b.addEventListener("click", e => {
            if (b === active) return;
            active.classList.remove("active");
            b.classList.add("active");

            active = b;
            if (options?.oninput) options.oninput(i);
        }));

        wrapper.append(up, right, down, left, none);
        this.elements.main.append(wrapper);
        this.elements = { ...this.elements, wrapper, buttons: { up, right, down, left, none } };
    }
    static UP = 0;
    static RIGHT = 1;
    static DOWN = 2;
    static LEFT = 3;
    static NONE = 4;
}