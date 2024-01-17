

/** State
 * 
 * @typedef {{ 
* name: string, 
* color: [number, number, number], 
* hat: string, 
* fuel: number, prevFuel?: number[], fuelChange?: number,
* normal?: boolean,
* pos: { x: number, y: number }, 
* vel: { x: number, y: number}, 
* radius: number, 
* states: string[], 
* gravDir: number 
* }} Player
* @typedef {{ type: string, pos: { x: number, y: number }, radius: number, opacity?: number }} Entity
* @typedef {{ 
    * infos: { 
    * id: string, fuel: number, oneCooldown: number, twoCooldown: number, oneHeat: number, twoHeat: number}, 
    * players: { [id: string]: Player }, 
    * playerList: [string, string, boolean, boolean][], 
    * entities: Entity[], 
    * particles: [] }} E
    * 
    */
export default class State {
    constructor() {
        // #region Constants
        this.entityTypes = [
            "normal", "reverse", "rotating",
            "spike", "monster", "expander", "following", "wavy", "shooter",
            "immune", "stutter", "drainer", "turretBullet", "enemyBullet", 
            "snek",                                        
            "bouncer", "megaBouncer",
            "freezer", 
            "bomb", "contractor", "taker", "disabler", "harmless", "accelerator", "decelerator", 
            "gravityUp", "gravityDown", "gravityLeft", "gravityRight",

            "blueFrisbeeEntity", "redFrisbeeEntity", "restZone", "meteorBullet", "path", "frostEntity", "tail", "healingGhost"
        ];
        // #endregion
    
        this.ready = false;

        this.infos = null;
        this.me = null;

        /** @type {{ [id: string]: Player }} */
        this.players = {};

        /** @type {[string, string, boolean, boolean][]} [name, area, dead, frozen]*/
        this.playerList = [];

        /** @type {{ [type: string]: Entity[]}} */
        this.entities = { 
            all: [], 
            ...Object.fromEntries(this.entityTypes.map(t => [t, []])),
            unknown: [],
        };
        this.particles = [];
    }
    /** @param {E} state  */
    update(state) {
        this.infos = state.infos;
        this.players = state.players;
        this.playerList = state.playerList;

        this.me = this.players[this.infos.id] ?? null;

        this.entities = { 
            all: state.entities, 
            ...Object.fromEntries(this.entityTypes.map(t => [t, []])),
            unknown: [],
        };
        state.entities.forEach(entity => 
            this.entities[this.entityTypes.includes(entity.type) ? entity.type : "unknown"].push(entity)
        );

        this.ready = true;
    }
}