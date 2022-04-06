import createElement from "../createElement.js";

export default class Property {
    /** @param {string | Node} name */
    constructor(name = "property") {
        const main = createElement("li", { class: "property" });
        const label = createElement("span", { class: "label" });

        label.append(name);
        main.append(label);

        this.elements = { main, label };
    }
    get value() {
        return null;
    }
}