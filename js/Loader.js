const Loader = {
    /** @param {HTMLImageElement} img */
    image(img) {
        const promise = new Promise((resolve, reject) => {
            img.addEventListener("load", _ => {
                this.loaded++;
                resolve();
            });
            img.addEventListener("error", reject);
        });
        promise.then(
            _ => this.onimgload(img),
            _ => this.onimgerror(img)
        );
        
        this.promises.push(promise);

        return promise;
    },
    /** @param {WebSocket} ws */
    webSocket(ws) {
        const promise = new Promise((resolve, reject) => {
            ws.addEventListener("open", _ => {
                this.loaded++;
                resolve();
            });
            ws.addEventListener("error", reject);
        });

        promise.then(
            _ => this.onwsload(ws),
            _ => this.onwserror(ws)
        );
        
        this.promises.push(promise);

        return promise;
    },


    /** @type {Promise[]} */
    promises: [],
    loaded: 0,

    /**
     * Replace this with own function
     * @param {HTMLImageElement} img
     */
    onimgload(img) {
        console.log("Loaded", img.src);
    },
    /**
     * Replace this with own function
     * @param {HTMLImageElement} img
     * @param {ErrorEvent} event
     */
    onimgerror(img, event) {
        console.error("Error loading", img.src, event);
    },
    /**
     * Replace this with own function
     * @param {WebSocket} ws
     */
    onwsload(ws) {
        console.log("Connected to", ws.url);
    },
    /**
     * Replace this with own function
     * @param {WebSocket} ws
     * @param {ErrorEvent} event
     */
    onwserror(ws, event) {
        console.error("Error connecting to", ws.url, event);
    },

    /**
     * Returns promise that resolves when all things are loaded
     */
    start() {
        const all = Promise.all(this.promises);

        return all;
    }
};
export default Loader;