import Folder from "../property/folder.js";
import PositionProperty from "../property/util/pos.js";
import NumberProperty from "../property/base/number.js";
import TextProperty from "../property/base/text.js";
import ColorProperty from "../property/base/color.js";
import CardinalProperty from "../property/base/cardinal.js";
import SelectProperty from "../property/base/select.js";
import DirectionProperty from "../property/base/direction.js";

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
const color = new ColorProperty({
    value: "#2080ff",
    oninput: console.log
});
const cardinal = new CardinalProperty({
    value: CardinalProperty.UP,
    oninput: console.log
});
const select = new SelectProperty({
    value: "two",
    options: ["one", "two", "three"],
    oninput: console.log
});
const direction = new DirectionProperty({
    value: 69,
    oninput: console.log
});

const folder = new Folder("folder", [number, text, pos, color, cardinal, select, direction]);

window.globalThings = { folder };

menu.append(folder.elements.main);