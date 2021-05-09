function createLI(_class = "", id = "") {
    let el = document.createElement("li");
    if (id) el.id = id;
    if (_class) el.className = _class;
    return el;
}
function createFolder(title = "Title", lis = []) {
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

function createProperty(name = "name", input = document.createElement("input"), type = "text", options = {}) {
    const li = createLI("property " + type);
    const span = document.createElement("span");
    span.classList.add("label");
    span.innerHTML = name;
    li.appendChild(span);
    if ("value" in options && input) input.value = options.value;
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

        input.checked = options.value;

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

        let active = [up, right, down, left][(Number(options.value ?? 0) % 4 + 4) % 4];
        active.classList.add("active");

        up.addEventListener("click", () => {
            if (active === up) return;
            active.classList.remove("active");
            up.classList.add("active");
            active = up;
            options.event(2);
        });
        right.addEventListener("click", () => {
            if (active === right) return;
            active.classList.remove("active");
            right.classList.add("active");
            active = right;
            options.event(3);
        });
        down.addEventListener("click", () => {
            if (active === down) return;
            active.classList.remove("active");
            down.classList.add("active");
            active = down;
            options.event(0);
        });
        left.addEventListener("click", () => {
            if (active === left) return;
            active.classList.remove("active");
            left.classList.add("active");
            active = left;
            options.event(1);
        });

        wrapper.appendChild(up);
        wrapper.appendChild(left);
        wrapper.appendChild(down);
        wrapper.appendChild(right);
        li.appendChild(wrapper);
    } else if (type === "cardinalCenter") {
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
        const center = document.createElement("button");
        center.classList.add("cardinalCenter");

        let active = [up, right, down, left, center][(Number(options.value ?? 0) % 5 + 5) % 5];
        active.classList.add("active");

        up.addEventListener("click", () => {
            if (active === up) return;
            active.classList.remove("active");
            up.classList.add("active");
            active = up;
            options.event(2);
        });
        right.addEventListener("click", () => {
            if (active === right) return;
            active.classList.remove("active");
            right.classList.add("active");
            active = right;
            options.event(3);
        });
        down.addEventListener("click", () => {
            if (active === down) return;
            active.classList.remove("active");
            down.classList.add("active");
            active = down;
            options.event(0);
        });
        left.addEventListener("click", () => {
            if (active === left) return;
            active.classList.remove("active");
            left.classList.add("active");
            active = left;
            options.event(1);
        });
        center.addEventListener("click", () => {
            if (active === center) return;
            active.classList.remove("active");
            center.classList.add("active");
            active = center;
            options.event(4);
        });

        wrapper.appendChild(up);
        wrapper.appendChild(left);
        wrapper.appendChild(down);
        wrapper.appendChild(right);
        wrapper.appendChild(center);
        li.classList.remove("cardinalCenter");
        li.classList.add("cardinal");
        li.appendChild(wrapper);
    } else if (type === "select") {
        const select = document.createElement("select");

        for (let i in options.selectOptions) {
            const option = document.createElement("option");

            option.innerHTML = options.selectOptions[i][0];
            option.value = i;
            select.appendChild(option);

            if (options.selectOptions[i][1] === options.value ?? 0) select.value = i;
        }

        select.addEventListener("change", () => {
            options.event(options.selectOptions[select.value][1]);
        });
        li.classList.add(options.selectType ?? "text");
        li.appendChild(select);
    } else if (type === "direction") {
        const circle = document.createElement("div");
        circle.classList.add("directionCircle");
        const lever = document.createElement("div");
        lever.classList.add("directionLever");
        const handle = document.createElement("div");
        handle.classList.add("directionHandle");

        let deg = options.value ?? 0;
        lever.style.transform = `rotate(${deg}deg)`;

        let changing = false;
        document.addEventListener("mousemove", e => {
            if (!changing) return;

            const bound = circle.getBoundingClientRect();

            deg = (Math.round(Math.atan2(e.pageY - bound.top - bound.height / 2, e.pageX - bound.left - bound.width / 2) * 180 / Math.PI) % 360 + 360) % 360;

            const snap = 30;
            const space = 7;

            if (deg % snap > snap - space) deg += snap - deg % snap;
            if (deg % snap < space) deg -= deg % snap;
            input.value = deg = (deg % 360 + 360) % 360;

            lever.style.transform = `rotate(${deg}deg)`;
            options.event(deg);
        });
        input.addEventListener("input", () => {
            input.value = Math.round(input.value * 10) / 10;
            input.value = deg = ((10 * input.value % 3600 + 3600) % 3600) / 10;

            lever.style.transform = `rotate(${deg}deg)`;
            options.event(deg);
        });
        handle.addEventListener("mousedown", () => changing = true);
        document.addEventListener("mouseup", () => changing = false);

        input.type = "number";
        input.value = options.value;

        lever.appendChild(handle);
        circle.appendChild(lever);
        circle.appendChild(input);
        li.appendChild(circle);
    } else {
        if (type === "text") {
            input.spellcheck = false;
        }
        li.appendChild(input);
        input.type = type;
    }
    return li;
}

function createNumberArrayProperty(name = "Name", array = [0], update = array => {}) {
    function values() {
        return Array.from(li.getElementsByTagName("input")).reduce((accumulator, input) => {
            accumulator.push(Number(input.value));
            return accumulator;
        }, []);
    }
    function create(value) {
        const input = document.createElement("input");
        input.value = value;
        input.addEventListener("input", () => {
            update(values());
        });

        const property = createProperty("", input, "number");
        const inside = document.createElement("div");
        const removeBtn = document.createElement("button");

        inside.appendChild(property.children[0]);
        inside.appendChild(property.children[0]);
        inside.classList.add("wrapper");

        removeBtn.addEventListener("click", () => {
            property.remove();
            update(values());
        });
        removeBtn.classList.add("remove");

        property.appendChild(inside);
        property.appendChild(removeBtn);
        return property;
    }

    const li = createFolder(name, array.reduce((accumulator, value) => {
        accumulator.push(create(value));
        return accumulator;
    }, []));
    const ul = li.children[1];

    const addBtn = document.createElement("button");
    addBtn.classList.add("add");
    addBtn.addEventListener("click", () => {
        ul.insertBefore(create(0), addBtn);
        update(values());
    });

    li.classList.add("array");
    li.children[1].appendChild(addBtn);

    return li;
}

let currentId = 0;
function generateId() {
    return "generated" + currentId++;
}