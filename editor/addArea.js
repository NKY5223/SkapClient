function addArea(name = "New Area") {
    const area = createArea(name, [0, 10, 87], 0.8, [230, 230, 230], 100, 100);
    if (currentArea) hide(currentArea.element);
    currentArea = area;
    if (selectedObject) hide(selectedObject.element);
    selectedObject = null;
    map.areas.push(area);
    areamenu.appendChild(area.element);

    area.button = document.createElement("button");
    area.button.innerHTML = htmlspecialchars(area.name);
    area.button.addEventListener("click", () => {
        if (currentArea) hide(currentArea.element);
        currentArea = area;
        if (selectedObject) hide(selectedObject.element);
        selectedObject = null;

        document.documentElement.style.setProperty("--obstacle", `rgba(${area.colorArr[0]}, ${area.colorArr[1]}, ${area.colorArr[2]}, ${area.opacity}`);
        show(currentArea.element);
    });
    area.inputs.name.addEventListener("input", () => {
        area.button.innerHTML = htmlspecialchars(area.name);
    });

    areaList.appendChild(area.button);
}