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
 * @param {function(0 | 1 | 2 | 3)} onselect
 */
function createProperty(name, input, type = "text", onselect = () => { }) {
    const li = createLI("property " + type);
    li.appendChild(createSpan(name, "label"));
    if (type === "color") {
        const label = document.createElement("label");
        const text = document.createTextNode(input.value);
        input.type = type;

        text.nodeValue = input.value;
        label.appendChild(text);
        input.id = generateId();
        label.htmlFor = input.id;
        label.appendChild(input);
        label.style.background = input.value;
        li.style.borderLeftColor = input.value;

        let luma = 0.2126 * parseInt(input.value.slice(1, 3), 16) + 0.7152 * parseInt(input.value.slice(3, 5), 16) + 0.0722 * parseInt(input.value.slice(5, 7), 16);
        if (luma > 128) li.classList.add("light");
        input.addEventListener("input", () => {
            text.nodeValue = input.value;
            label.style.background = input.value;
            li.style.borderLeftColor = input.value;

            let luma = 0.2126 * parseInt(input.value.slice(1, 3), 16) + 0.7152 * parseInt(input.value.slice(3, 5), 16) + 0.0722 * parseInt(input.value.slice(5, 7), 16);
            if (luma > 128) li.classList.add("light");
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
    } else if (type === "direction") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("directionWrapper");
        const up = document.createElement("button");
        up.classList.add("directionUp");
        const left = document.createElement("button");
        left.classList.add("directionLeft");
        const down = document.createElement("button");
        down.classList.add("directionDown");
        const right = document.createElement("button");
        right.classList.add("directionRight");

        up.classList.add("active");
        let active = up;

        up.addEventListener("click", () => {
            if (active === up) return;
            active.classList.remove("active");
            up.classList.add("active");
            active = up;
            onselect(2);
        });
        right.addEventListener("click", () => {
            if (active === right) return;
            active.classList.remove("active");
            right.classList.add("active");
            active = right;
            onselect(3);
        });
        down.addEventListener("click", () => {
            if (active === down) return;
            active.classList.remove("active");
            down.classList.add("active");
            active = down;
            onselect(0);
        });
        left.addEventListener("click", () => {
            if (active === left) return;
            active.classList.remove("active");
            left.classList.add("active");
            active = left;
            onselect(1);
        });

        wrapper.appendChild(up);
        wrapper.appendChild(left);
        wrapper.appendChild(down);
        wrapper.appendChild(right);
        li.appendChild(wrapper);
    } else {
        li.appendChild(input);
        input.type = type;
    }
    return li;
}
let currentId = 0;
function generateId() {
    return "generated" + currentId++;
}