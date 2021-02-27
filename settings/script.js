const controls = (localStorage.getItem("keys") || "w a s d shift   r").split(" ");
const controlInputs = document.getElementsByClassName("control");

for (let i in controls) {
    controlInputs[i].value = controls[i];
    controlInputs[i].addEventListener("input", () => {
        controls[i] = controlInputs[i].value.toLowerCase();
        localStorage.setItem("keys", controls.join(" "));
    });
}