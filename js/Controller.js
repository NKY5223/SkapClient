/**
 * @typedef {(event: MouseEvent | KeyboardEvent | null) => void} Listener
 * @typedef {(name: string, event: MouseEvent | KeyboardEvent | null) => void} AnyListener
 * @typedef {{ trigger: string, ctrl: -1 | 0 | 1, alt: -1 | 0 | 1, shift: -1 | 0 | 1 }} Trigger
 */

const BtnToNameMap = ["LMB", "MMB", "RMB", "XMB1", "XMB2"];

/** @type {{ [btn: string]: number }} */
const NameToBtnMap = Object.fromEntries(BtnToNameMap.map((s, i) => [s, i]));

export default class Controller {
    /**
     * @param { HTMLElement } element
     * @param {{ [name: string]: string[] }} controls 
     */
    constructor(element, controls) {
        this.enabled = false;

        this.element = element;

        /** @type {{ [name: string]: Listener[] }} */
        this.downListeners = {};
        /** @type {{ [name: string]: Listener[] }} */
        this.upListeners = {};
        /** @type { AnyListener[] } */
        this.anyDownListeners = [];
        /** @type { AnyListener[] } */
        this.anyUpListeners = [];

        /** @type { ((trigger: string) => void)[] } */
        this.triggerListeners = [];

        /** @type {{ [name: string]: Trigger[] }} */
        this.controls = controls ?? {};

        /** @type {Set<string>} */
        this.currentDown = new Set();

        this.onAnyDown((name, event) => {
            this.currentDown.add(name);
        });
        this.onAnyUp((name, event) => {
            this.currentDown.delete(name);
        });

        // #region Listeners
        // Keyboard
        this.element.addEventListener("keydown", e => {
            if (!this.enabled) return;
            if (e.repeat) return;

            for (let name in this.controls) {
                if (this.log) console.log(name);
                for (let { trigger, ctrl, alt, shift } of this.controls[name]) {
                    if (NameToBtnMap.hasOwnProperty(trigger)) continue;

                    if (e.code.toLowerCase() !== trigger.toLowerCase()) continue;

                    if (ctrl && ctrl !== e.ctrlKey * 2 - 1) continue;
                    if (alt && alt !== e.altKey * 2 - 1) continue;
                    if (shift && shift !== e.shiftKey * 2 - 1) continue;

                    this.emitDown(name, e);
                }
            }

            this.triggerListeners.forEach(f => f(e.code));
        });
        this.element.addEventListener("keyup", e => {
            if (!this.enabled) return;

            for (let name in this.controls) {
                for (let { trigger, ctrl, alt, shift } of this.controls[name]) {

                    if (NameToBtnMap.hasOwnProperty(trigger)) continue;

                    if (e.code.toLowerCase() !== trigger.toLowerCase()) continue;

                    if (ctrl && ctrl !== e.ctrlKey * 2 - 1) continue;
                    if (alt && alt !== e.altKey * 2 - 1) continue;
                    if (shift && shift !== e.shiftKey * 2 - 1) continue;

                    this.emitUp(name, e);
                }
            }
        });
        // Mouse
        this.element.addEventListener("mousedown", e => {
            if (!this.enabled) return;

            for (let name in this.controls) {
                for (let { trigger, ctrl, alt, shift } of this.controls[name]) {
                    if (!NameToBtnMap.hasOwnProperty(trigger)) continue;

                    if (e.button !== NameToBtnMap[trigger]) continue;

                    if (ctrl && ctrl !== e.ctrlKey * 2 - 1) continue;
                    if (alt && alt !== e.altKey * 2 - 1) continue;
                    if (shift && shift !== e.shiftKey * 2 - 1) continue;

                    this.emitDown(name, e);
                }
            }

            this.triggerListeners.forEach(f => f(BtnToNameMap[e.button]));
        });
        this.element.addEventListener("mouseup", e => {
            if (!this.enabled) return;

            for (let name in this.controls) {
                for (let { trigger, ctrl, alt, shift } of this.controls[name]) {

                    if (!NameToBtnMap.hasOwnProperty(trigger)) continue;

                    if (e.button !== NameToBtnMap[trigger]) continue;

                    if (ctrl && ctrl !== e.ctrlKey * 2 - 1) continue;
                    if (alt && alt !== e.altKey * 2 - 1) continue;
                    if (shift && shift !== e.shiftKey * 2 - 1) continue;

                    this.emitUp(name, e);
                }

            }
        });
        // #endregion
    }

    // #region Controls
    /**
     * @param {string} name 
     * @param {Trigger[]} triggers 
    */
    addControl(name, triggers) {
        this.controls[name] = triggers;
    }
    /**
     * @param {string} name 
     * @param {Trigger[]} triggers 
    */
    changeControl(name, triggers) {
        this.controls[name] = triggers;
    }
    /**
     * @param {string} name 
    */
    deleteControl(name) {
        delete this.controls[name];
        delete this.upListeners[name];
        delete this.downListeners[name];
        delete this.triggerListeners[name];
    }
    // #endregion

    // #region Listeners
    // #region Emit
    /**
     * @param {string} name 
     * @param {MouseEvent | KeyboardEvent | null} event 
     */
    emitDown(name, event) {
        this.anyDownListeners.forEach(f => f(name, event));
        if (!this.downListeners.hasOwnProperty(name)) return;
        this.downListeners[name].forEach(f => f(event));
    }
    /**
     * @param {string} name 
     * @param {MouseEvent | KeyboardEvent | null} event 
     */
    emitUp(name, event) {
        this.anyUpListeners.forEach(f => f(name, event));
        if (!this.upListeners.hasOwnProperty(name)) return;
        this.upListeners[name].forEach(f => f(event));
    }
    allUp() {
        this.currentDown.forEach(name => this.emitUp(name, null));
    }
    // #endregion
    // #region Listen
    /**
     * @param {string} name 
     * @param {Listener} listener 
     */
    onDown(name, listener) {
        if (!this.downListeners.hasOwnProperty(name)) this.downListeners[name] = [];
        this.downListeners[name].push(listener);
    }
    /**
     * @param {string} name 
     * @param {Listener} listener 
     */
    onUp(name, listener) {
        if (!this.upListeners.hasOwnProperty(name)) this.upListeners[name] = [];
        this.upListeners[name].push(listener);
    }
    // #endregion
    // #region Listen Any
    /**
     * @param {string} name 
     * @param {AnyListener} listener 
     */
    onAnyDown(listener) {
        this.anyDownListeners.push(listener);
    }
    /**
     * @param {string} name 
     * @param {AnyListener} listener 
     */
    onAnyUp(listener) {
        this.anyUpListeners.push(listener);
    }
    // #endregion
    // #endregion

    // #region Enable/Disable
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    // #endregion
}