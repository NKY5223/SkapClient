import SkapMap from "./Map.js";
import SHA256 from "./SHA256.js";
import Socket from "./Socket.js";
import State from "./State.js";
import Validator from "./Validator.js";

/** Custom Game
 * 
 * @typedef {{ name: string, players: number, capacity: number, mapName: string, creator: string, private: null | string, id: string }} CustomGame
 */
/** Message Types
 * @typedef { ResultMessageFail | ResultMessageSuccess } ResultMessage 
 * @typedef {{ e: "result", m: 0, t: string, cookie: string }} ResultMessageSuccess
 * @typedef {{ e: "result", m: 1, t: string }} ResultMessageFail
 * 
 * @typedef {{ e: "logout" }} LogoutMessage
 * 
 * @typedef { "none" | "militaryHat" | "santa" | "crown" | "cowboy" | "taria" | "kite" | "onigiri" | "devil" | "horns" | "sakura" } Hat
 * @typedef {{ e: "style", c: [number, number, number], s: Hat, h: Hat[] }} StyleMessage
 */

/**
 * This class is for interfacing with the server, not handling everything
 */
export default class Game {
    /**
     * @param {string} wsserver 
     * @param {boolean} logWS Log all websocket messages in console 
    */
    constructor(wsserver = "wss://skap.io", logWS = false) {
        // #region Socket
        this.socket = new Socket(wsserver);
        this.logWS = logWS;

        this.socket.onOpen(_ => {
            if (this.logWS) console.log("%cWebSocket Ready", "color:#00ff00;");
            this.emit("wsOpen");
        });
        this.socket.onClose(_ => {
            if (this.logWS) console.log("%cWebSocket Closed", "color:#ff0000");
            this.emit("wsClose");
        });
        this.socket.onSend(data => {
            if (this.logWS) console.log("%cServerbound >>>%o", "color:#2080ff;", data);
            this.emit("wsSend", data);
        });
        this.socket.on("*", message => {
            if (this.logWS) console.log("%cClientbound <<<%o", "color:#ff00ff", message);
            this.emit("wsReceive", message);
        });

        this.socket.on("initMap", msg => this.initMap(msg.m));
        this.socket.on("updateMap", msg => this.updateMap(msg.m));
        this.socket.on("join", msg => {
            this.initMap(msg.i.map);
            this.updateState(msg.i.states);
            msg.i.powers.forEach(power => this.unlockPower(power));

            this.activePowers[0] = msg.i.powers[0];
            this.activePowers[1] = msg.i.powers[1];

            this.emit("join", msg);

            this.GAME ??= null;
        });
        this.socket.on("power", msg => msg.m.forEach(p => this.unlockPower(p)));
        this.socket.on("updateStates", msg => this.updateState(msg.m));
        this.socket.on("message", msg => this.emit("message", { author: msg.m.s, level: msg.m.r, content: msg.m.m, id: msg.m.i }));

        // #endregion

        // #region Listeners
        /** @type {{ [event: string]: function[] }} */
        this.listeners = {};
        /** @type {{ [event: string]: function[] }} */
        this.onceListeners = {};
        // #endregion

        this.map = new SkapMap();

        /** @type {State} */
        this.state = {};

        this.newState = new State();

        /** @type {number[]} */
        this.powers = [];

        this.activePowers = [null, null];

        this.aim = { x: 0, y: 0 };

        this.GAME = null;
        this.USERNAME = null;

        // #region Constants
        this.inputMap = Object.fromEntries(["up", "left", "down", "right", "halt", "sprint", "power1", "power2", "powercombo", "respawn"].map((s, i) => [s, i]));

        this.prevFuelLength = 15;
        // #endregion
    }

    // #region Events
    emit(event, data) {
        let result = true;
        if (this.listeners.hasOwnProperty(event)) this.listeners[event].forEach(f => result &&= (f(data) ?? true));
        if (this.onceListeners.hasOwnProperty(event)) {
            this.onceListeners[event].forEach(f => result &&= (f(data) ?? true));
            this.onceListeners[event] = [];
        }
        return result;
    }
    on(event, listener) {
        if (!this.listeners.hasOwnProperty(event)) this.listeners[event] = [];
        this.listeners[event].push(listener);
    }
    once(event, listener) {
        if (!this.onceListeners.hasOwnProperty(event)) this.onceListeners[event] = [];
        this.onceListeners[event].push(listener);
    }
    // #endregion

    // #region Session, Login, Register, Guest, Logout
    /**
     * Resumes session with cookie
     * @param {string} cookie 
     * 
     * @returns {Promise<ResultMessage>}
     */
    session(cookie) {
        if (this.socket.ws.readyState === this.socket.ws.OPEN) {
            this.socket.send({
                e: "session",
                cookie
            });
            this.emit("session", cookie);
        } else {
            this.socket.onOpen(_ => {
                this.socket.send({
                    e: "session",
                    cookie
                });
            });
            this.emit("session", cookie);
        }
        return new Promise(resolve => {
            this.socket.once("result", msg => {
                this.USERNAME = msg.t.slice("Logged in as ".length);
                resolve(msg);

                this.emit("login");
            });
        });
    }
    /**
     * Login
     * @param {string} username 
     * @param {string} password 
     * @param {string} token grecaptcha token
     * 
     * @returns {Promise<ResultMessage>}
    */
    login(username, password, token) {
        this.socket.send({
            e: "login",
            m: {
                username,
                password: SHA256(username + password),
            },
            t: token
        });
        return new Promise((resolve, reject) => {
            this.socket.once("result", msg => {
                if (msg.m) reject(msg);
                else {
                    this.USERNAME = msg.t.slice("Logged in as ".length);
                    this.emit("login");
                    resolve(msg);
                }
            });
        });
    }
    /**
     * Register
     * @param {string} username 
     * @param {string} password 
     * 
     * @returns {Promise<ResultMessage>}
    */
    register(username, password) {
        this.socket.send({
            e: "register",
            m: {
                username,
                password: SHA256(username + password),
            }
        });
        return new Promise((resolve, reject) => {
            this.socket.once("result", msg => {
                if (msg.m) reject(msg);
                else {
                    this.USERNAME = msg.t.slice("Logged in as ".length);
                    this.emit("login");
                    resolve(msg);
                }
            });
        });
    }
    /**
     * Send guest request
     * @param {string} token 
     * 
     * @returns {Promise<ResultMessage>}
    */
    guest(token) {
        this.socket.send({
            e: "guest",
            t: token
        });
        return new Promise((resolve, reject) => {
            this.socket.once("result", msg => {
                if (msg.m) reject(msg);
                else {
                    this.USERNAME = msg.t.slice("Logged in as ".length);
                    this.emit("login");
                    resolve(msg);
                }
            });
        });
    }
    /**
     * @returns {Promise<LogoutMessage>}
     */
    logout() {
        this.socket.send({
            e: "logout"
        });
        return new Promise(resolve => {
            this.socket.once("logout", resolve);
        });
    }
    // #endregion

    // #region Changing Room
    /**
     * @returns {Promise<StyleMessage>}
     */
    getStyle() {
        this.socket.send({ e: "getStyle" });
        return new Promise(resolve => {
            this.socket.once("style", resolve);
        });
    }
    /** @param {Hat} hat */
    changeHat(hat) {
        const result = this.emit("changeHat", hat);
        if (!result) return;
        this.socket.send({
            e: "hatChange",
            c: hat
        });
    }
    /** @param { [number, number, number] } color  */
    changeColor(color) {
        this.socket.send({
            e: "colorChange",
            c: color
        });
    }
    // #endregion

    // #region Games 
    /**
     * Request custom game list
     * @returns {Promise<CustomGame[]>}
     */
    requestGames() {
        this.socket.send({
            e: "games"
        });
        return new Promise(resolve => {
            this.socket.once("games", msg => {
                resolve(msg.g);
                this.emit("games", msg.g);
            });
        });
    }
    /**
     * @param {string} id UUID of the game
     * @param {string} password Password of the game
     */
    joinGame(id, password = null) {
        if (password !== null) this.socket.send({
            e: "join",
            g: id,
            p: password
        });
        else this.socket.send({
            e: "join",
            g: id
        });
        return new Promise(resolve => {
            this.once("join", msg => {
                this.GAME = id;
                resolve(id);
            });
        });
    }
    /**
     * @param {Object | null} map
     * @param {{ name: string, perms: boolean, private: boolean, password: string, restrictPowers: boolean, powersList: number[], uploadMap: boolean, speedrun: boolean }} settings
     */
    createGame(map, settings) {
        let { name: n, perms: g, private: p, password: pa, restrictPowers: r, powersList: rd, uploadMap: u, speedrun: s } = settings;
        settings = { n, g, p, pa, r, rd, u, s };
        if (map) {
            this.socket.send({
                e: "createGame",
                s: settings,
                j: map
            });
        } else {
            this.socket.send({
                e: "createGame",
                s: settings
            });
        }
        return new Promise(resolve => {
            this.once("join", msg => {
                this.GAME = "UNKNOWN_UUID";
                resolve();
            });
        });
    }
    // #endregion

    // #region Map, State
    initMap(rawMap) {
        this.map.init(rawMap);

        this.emit("initMap", this.map);
    }
    /** @param {{ update?: { type: string, id: number }[] }} updates */
    updateMap(updates) {
        this.map.update(updates);
        this.emit("updateMap", updates);
    }
    /**
     * @param {State} state 
     */
    updateState(state) {
        for (let id in state.players) {
            let player = state.players[id];

            player.color = Validator.rgb(player.color, [0x00, 0xff, 0x00]);
            let x = Validator.number(player.pos.x, -Infinity, Infinity, null);
            let y = Validator.number(player.pos.y, -Infinity, Infinity, null);

            player.normal = !(x === null || y === null);

            if (this.state?.players?.hasOwnProperty(id)) {
                player.prevFuel = [...this.state.players[id].prevFuel ?? [], player.fuel].slice(-this.prevFuelLength);

                player.fuelChange = (player.fuelChange || 0) * .2 + ((player.fuel - player.prevFuel[0]) / 1) * .8;
            }
        }
        state.me = state.players[state.infos.id];

        this.state = state;

        this.newState.update(state);
        this.emit("updateState", this.state);
    }

    unlockPower(power) {
        if (this.powers.includes(power)) return;
        this.powers.push(power);

        this.emit("unlockPower", power);
    }
    // #endregion

    // #region Controls
    input(key, state) {
        this.socket.send({
            e: "input",
            input: {
                keys: this.inputMap[key],
                value: !!state
            }
        });
        this.emit("input", { key, state });
    }
    aimAt(x, y) {
        if (this.aim.x === x && this.aim.y === y) return;

        this.aim.x = x;
        this.aim.y = y;

        this.socket.send({
            e: "aim",
            m: [x, y]
        });

        this.emit("aim", this.aim);
    }
    /**
     * @param {number} power 
     * @param {0 | 1} slot 
     */
    changePower(power, slot, ignoreSame = false, ignoreDead = false) {
        if (!this.powers.includes(power)) return false;
        if (!(ignoreDead || (this.state.me && !this.state.me.states.includes("Died")))) return false;

        this.socket.send({
            e: "powerChange",
            i: power,
            m: slot
        });
        if (!ignoreSame && this.activePowers[1 - slot] === power) {
            this.activePowers[1 - slot] = this.activePowers[slot];
            this.emit("changePower", { power: this.activePowers[slot], slot: 1 - slot });
        }

        this.activePowers[slot] = power;
        this.emit("changePower", { power, slot });

        return true;
    }
    // #endregion

    // #region Chat Message
    /**
     * @param {string} message 
     */
    sendChatMessage(message) {
        const abort = this.emit("sendMessage", message);

        if (!abort) return;
        
        this.socket.send({
            e: "message",
            message
        });
    }
    // #endregion
}