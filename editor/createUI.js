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
    let div = document.createElement("div");
    let ul = document.createElement("ul");
    ul.classList.add("indent");

    let titleLI = createLI("title");
    titleLI.innerHTML = title;
    titleLI.addEventListener("click", () => {
        ul.classList.toggle("closed");
    });

    div.appendChild(titleLI);
    for (let li of lis) {
        ul.appendChild(li);
    }
    div.appendChild(ul);
    folder.appendChild(div);
    return folder;
}
/**
 * @param {string} name 
 * @param {HTMLInputElement} input 
 * @param {string} type 
 */
function createProperty(name, input, type = "text") {
    const li = createLI("property " + type);
    li.appendChild(createSpan(name, "label"));
    input.type = type;
    li.appendChild(input);
    return li;
}