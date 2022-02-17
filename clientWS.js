class ClientWS {
    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(url);
        this.onmessage = () => {};
        this.onclose = () => {};
    }
    init() {
        this.ws = new WebSocket(url);
        this.ws.binaryType = "arraybuffer";
        this.ws.addEventListener("message", this.onmessage.bind(this))
        this.ws.addEventListener("close", this.onclose.bind(this));
    }
    send(x) {
        this.ws.send(x);
    }
}