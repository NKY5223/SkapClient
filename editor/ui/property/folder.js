import createElement from "../createElement.js";
import Property from "./property.js";

export default class Folder {
    /** 
     * @param {string | Node} name
     * @param {(Property | Folder)[]} properties 
     */
    constructor(name = "folder", properties) {
        const main = createElement("li", { class: "folder" });
        const list = createElement("ul", { class: "indent" });
        const title = createElement("li", { class: "title" });

        title.addEventListener("click", () => main.classList.toggle("closed"));

        title.append(name);
        main.append(title, list);
        list.append(...properties.map(p => p.elements.main));

        this.elements = { main, title, list };
        this.properties = properties;
    }
}