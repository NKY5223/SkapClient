const bots = [];
function createBot(un, pw) {
    let ws = new WebSocket("wss://skap.io");
    ws.onopen = () => {
        getToken(token => {
            un
                ? ws.send(`{
                    "e": "login",
                    "m": ${JSON.stringify({ username: un, password: SHA256(un + pw) })},
                    "t": "${token}"
                }`)
                : ws.send(`{
                    "e":"guest",
                    "t": "${token}"
                }`)
        });
    }
    ws.onmessage = e => {
        let msg = JSON.parse(e.data);
        switch (msg.e) {
            case "result":
                ws.send(`{"e":"join","g":"${id}"}`);
                bots.push(ws);
        }
    }
}

// Redefine keys on Client
function keys(key, value) {
    ws.send(`{
        "e": "input",
        "input": {
            "keys": ${key},
            "value": ${value}
        }
    }`);
    for (let bot of bots) {
        bot.send(`{
        "e": "input",
        "input": {
            "keys": ${key},
            "value": ${value}
        }
    }`);
    }
}