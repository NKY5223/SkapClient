function createBR() {
    return document.createElement("br");
}
function createSpan(str = "", _class = "", id = "") {
    let el = document.createElement("span");
    if (id) el.id = id;
    if (_class) el.className = _class;
    el.innerHTML = str;
    return el;
}
function createLI(_class = "", id = "") {
    let el = document.createElement("li");
    if (id) el.id = id;
    if (_class) el.className = _class;
    return el;
}
/**
 * @param {string} title
 * @param {HTMLLIElement[]} lis 
 */
function createFolder(title, lis) {
    const folder = createLI("folder");
    let ul = document.createElement("ul");
    ul.classList.add("indent");

    let titleLI = createLI("title");
    titleLI.innerHTML = title;
    titleLI.addEventListener("click", () => {
        folder.classList.toggle("closed");
    });

    folder.appendChild(titleLI);
    for (let li of lis) {
        ul.appendChild(li);
    }
    folder.appendChild(ul);
    return folder;
}
/**
 * @param {string} name 
 * @param {HTMLInputElement} input 
 * @param {string} type 
 * @param {{cardinal?: {event: function(0 | 1 | 2 | 3): void, value: 0 | 1 | 2 | 3}, select?: {type: "text" | "number", options: [string, *][], event: function(*)}}} options
 */
function createProperty(name, input, type = "text", options = {}) {
    const li = createLI("property " + type);
    li.appendChild(createSpan(name, "label"));
    if (type === "color") {
        const label = document.createElement("label");
        const text = document.createTextNode(input.value);
        input.type = "color";

        text.nodeValue = input.value;
        label.appendChild(text);
        input.id = generateId();
        label.htmlFor = input.id;
        label.appendChild(input);
        label.style.background = input.value;
        li.style.borderLeftColor = input.value;

        if (luma(hexToArr(input.value)) > 128) li.classList.add("light");
        input.addEventListener("input", () => {
            text.nodeValue = input.value;
            label.style.background = input.value;
            li.style.borderLeftColor = input.value;

            if (luma(hexToArr(input.value)) > 128) li.classList.add("light");
            else li.classList.remove("light");
        });

        li.appendChild(label);
    } else if (type === "switch") {
        const label = document.createElement("label");
        const switchSpan = document.createElement("span");

        input.type = "checkbox";
        input.id = generateId();
        label.htmlFor = input.id;
        label.classList.add("switchLabel")
        switchSpan.classList.add("switchSpan");
        label.appendChild(input);
        label.appendChild(switchSpan);
        li.appendChild(label);
    } else if (type === "cardinal") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("cardinalWrapper");
        const up = document.createElement("button");
        up.classList.add("cardinalUp");
        const left = document.createElement("button");
        left.classList.add("cardinalLeft");
        const down = document.createElement("button");
        down.classList.add("cardinalDown");
        const right = document.createElement("button");
        right.classList.add("cardinalRight");

        let active = [up, right, down, left][options.cardinal.value];
        active.classList.add("active");

        up.addEventListener("click", () => {
            if (active === up) return;
            active.classList.remove("active");
            up.classList.add("active");
            active = up;
            options.cardinal.event(2);
        });
        right.addEventListener("click", () => {
            if (active === right) return;
            active.classList.remove("active");
            right.classList.add("active");
            active = right;
            options.cardinal.event(3);
        });
        down.addEventListener("click", () => {
            if (active === down) return;
            active.classList.remove("active");
            down.classList.add("active");
            active = down;
            options.cardinal.event(0);
        });
        left.addEventListener("click", () => {
            if (active === left) return;
            active.classList.remove("active");
            left.classList.add("active");
            active = left;
            options.cardinal.event(1);
        });

        wrapper.appendChild(up);
        wrapper.appendChild(left);
        wrapper.appendChild(down);
        wrapper.appendChild(right);
        li.appendChild(wrapper);
    } else if (type === "select") {
        const select = document.createElement("select");
        
        for (let i in options.select.options) {
            const option = document.createElement("option");

            option.innerHTML = options.select.options[i][0];
            option.value = i;
            select.appendChild(option);
        }

        select.addEventListener("change", () => {
            options.select.event(options.select.options[select.value][1]);
        });
        li.classList.add(options.select.type);
        li.appendChild(select);
    } else {
        if (type === "text") {
            input.spellcheck = false;
        }
        li.appendChild(input);
        input.type = type;
    }
    return li;
}
let currentId = 0;
function generateId() {
    return "generated" + currentId++;
}