/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName 
 * @param {{ id?:string, class: string | string[], attributes: { [attr: string]: string } }} [options]
 */
export default function createElement(tagName, options) {
    const el = document.createElement(tagName);
    if (!options) return el;
    if (options.id) el.id = options.id;
    if (options.class) {
        if (typeof options.class === "string") el.classList.add(options.class);
        else if (options.class instanceof Array) el.classList.add(...options.class);
    }
    if (options.attributes) Object.entries(options.attributes).forEach(([attr, value]) => el.setAttribute(attr, value));
    return el;
}