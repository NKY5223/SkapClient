export default class Socket {
    constructor(url = "wss://skap.io") {
        this.url = url;

        /**
         * @type {{ [type: string]: function[] } }}
         */
        this.messageListeners = { "*": [] };
        /**
         * @type { function[] }
         */
        this.openListeners = [];
        /**
         * @type { function[] }
         */
        this.closeListeners = [];
        /**
         * @type { function[] }
         */
        this.sendListeners = [];

        /**
         * @type {{ [type: string]: function[] } }}
         */
        this.messageOnceListeners = { "*": [] };

        this.connect();
    }
    /**
     * (Re)connect the websocket
     */
    connect() {
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer";
        
        this.ws.onmessage = e => {
            const message = msgpack.decode(new Uint8Array(e.data));
            if (this.messageListeners.hasOwnProperty(message.e)) this.messageListeners[message.e].forEach(f => {
                try {
                    f(message);
                } catch (err) {
                    console.error(err);
                };
            });
            this.messageListeners["*"].forEach(f => {
                try {
                    f(message);
                } catch (err) {
                    console.error(err);
                };
            });

            if (this.messageOnceListeners.hasOwnProperty(message.e)) this.messageOnceListeners[message.e].forEach(f => {
                try {
                    f(message);
                } catch (err) {
                    console.error(err);
                };
            });
            this.messageOnceListeners["*"].forEach(f => f(message));
            for (let type in this.messageOnceListeners) this.messageOnceListeners[type] = [];
        }
        this.ws.onopen = _ => {
            this.openListeners.forEach(f => f());
        }
        this.ws.onclose = _ => {
            this.closeListeners.forEach(f => f());
        }
    }
    /**
     * Sends data using msgpack
     * @param {*} data 
     */
    send(data) {
        if (this.ws.readyState !== this.ws.OPEN) return;
        this.ws.send(msgpack.encode(data));
        this.sendListeners.forEach(f => f(data));
    }
    /**
     * Listen for a message type
     * @param {string} type 
     * @param {function} listener 
     */
    on(type, listener) {
        if (this.messageListeners.hasOwnProperty(type)) this.messageListeners[type].push(listener);
        else this.messageListeners[type] = [listener];
    }
    /**
     * Listen for a message type
     * @param {string} type 
     * @param {function} listener 
     */
    once(type, listener) {
        if (this.messageOnceListeners.hasOwnProperty(type)) this.messageOnceListeners[type].push(listener);
        else this.messageOnceListeners[type] = [listener];
    }
    /**
     * @param {function} listener 
     */
    onOpen(listener) {
        this.openListeners.push(listener);
    }
    /**
     * @param {function} listener 
     */
    onClose(listener) {
        this.closeListeners.push(listener);
    }
    /**
     * @param {function} listener 
     */
    onSend(listener) {
        this.sendListeners.push(listener);
    }
}