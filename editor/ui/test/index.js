import Folder from "../property/folder/folder.js";
import PositionProperty from "../property/util/pos.js";
import NumberProperty from "../property/base/number.js";
import TextProperty from "../property/base/text.js";

const menu = document.getElementById("menu");

const number = new NumberProperty({
    value: 69420,
    oninput: console.log
});
const text = new TextProperty({
    value: "sussy",
    oninput: console.log
});
const pos = new PositionProperty({
    value: { x: 10, y: 10 },
    x: {
        min: 0
    },
    y: {
        min: 0
    },
    oninput: console.log
});

const folder = new Folder("folder", [number, text, pos]);

window.globalThings = { folder };

menu.append(folder.elements.main);