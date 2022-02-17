class ClientWS {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.onmessage = () => {};
        this.onclose = () => {};
        this.onopen = () => {};
    }
    init() {
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer";
        this.ws.addEventListener("message", this.onmessage.bind(this))
        this.ws.addEventListener("close", this.onclose.bind(this));
        this.ws.addEventListener("open", this.onopen.bind(this));
    }
    send(x) {
        if (this.ws.readyState === this.ws.OPEN) this.ws.send(x);
    }
}