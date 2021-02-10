if (localStorage.getItem("username")) username.value = localStorage.getItem("username");
if (localStorage.getItem("username")) password.value = localStorage.getItem("password");

ws.addEventListener("open", () => {
    hide(connectP);
    show(loginDiv);
    if (localStorage.getItem("cookie")) {
        send({
            e: "session",
            cookie: localStorage.getItem("cookie")
        });
    }
    username.addEventListener("keydown", e => {
        e.stopPropagation();
    });
    password.addEventListener("keydown", e => {
        e.stopPropagation();
    });
    login.addEventListener("click", () => {
        send({
            e: "login",
            m: {
                username: username.value,
                password: SHA256(username.value + password.value)
            }
        });
    });
    changingRoomBtn.addEventListener("click", () => {
        send({ e: "getStyle" });
        hide(logoutDiv);
        show(changingRoom);
    });
    backtoLoginFromChangingRoom.addEventListener("click", () => {
        hide(changingRoom);
        show(logoutDiv);
    });
    playerColor.addEventListener("input", () => {
        send({
            e: "colorChange",
            c: [
                parseInt(playerColor.value.slice(1, 3), 16),
                parseInt(playerColor.value.slice(3, 5), 16),
                parseInt(playerColor.value.slice(5, 7), 16)
            ]
        });
    });
    logout.addEventListener("click", () => {
        send({
            e: "logout"
        });
    });
    guest.addEventListener("click", () => {
        send({
            e: "guest"
        });
    });
    register.addEventListener("click", () => {
        send({
            e: "register",
            m: {
                username: username.value,
                password: SHA256(username.value + password.value)
            }
        });
    });
    play.addEventListener("click", () => {
        send({
            e: "games"
        });
    });
    backtoLogin.addEventListener("click", () => {
        hide(gamesDiv);
        show(loginDiv);
    });
    refresh.addEventListener("click", () => {
        send({
            e: "games"
        });
    });
    power0.addEventListener("input", () => {
        send({ e: "powerChange", m: 0, i: power0.value = clamp(0, power0.value, 10) });
    });
    power1.addEventListener("input", () => {
        send({ e: "powerChange", m: 1, i: power1.value = clamp(0, power1.value, 10) });
    });
    for (let el of document.getElementsByClassName("poweroption")) {
        el.addEventListener("click", () => {
            send({
                e: "powerChange",
                m: Number(el.dataset.slot),
                i: Number(el.dataset.power)
            });
        });
    }

    chatInput.addEventListener("keydown", e => {
        e.stopPropagation();
        if (e.key === "Escape") {
            chatInput.value = "";
            chatInput.blur();
            return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
            if (chatInput.value !== "") {
                /**
                 * @type {string}
                 */
                let msg = chatInput.value;
                if (msg.startsWith("/block ") && msg.length > 7) {
                    let p = msg.slice(7);
                    if (user === p) {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `You can't block yourself :/`
                            }
                        }, true);
                    } else if (devs.includes(p)) {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `Seriously? Blocking a DEV?`
                            }
                        }, true);
                    } else if (blocked.includes(p)) {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `User ${p.safe()} is already blocked`
                            }
                        }, true);
                    } else {
                        blocked.push(p);
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `Blocked user ${p.safe()}`
                            }
                        }, true);
                        localStorage.setItem("blocked", blocked.join(" "));
                    }
                } else if (msg.startsWith("/unblock ") && msg.length > 9) {
                    let p = msg.slice(9);
                    if (blocked.includes(p)) {
                        blocked.splice(blocked.indexOf(p));
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `Unblocked user ${p.safe()}`
                            }
                        }, true);
                        localStorage.setItem("blocked", blocked.join(" "));
                    } else {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `Could not unblock user ${p.safe()}<br>because they are not in the blocked list, or something went wrong.`
                            }
                        }, true);
                    }
                } else if (msg.startsWith("/blocked")) {
                    message({
                        m: {
                            s: "[CLIENT]",
                            r: 1,
                            m: blocked.length ? "Blocked users: " + blocked.join(", ") : "No blocked users"
                        }
                    }, true);
                } else if (msg.startsWith("/help")) {
                    message({
                        m: {
                            s: "[CLIENT]",
                            r: 1,
                            m: `
Commands:<br>
Without perms:<ul>
<li>/list - Tells you who has perms</li>
<li>/respawn - Respawns you to Home</li>
<li>/banned - Check bans</li>
<li>/help - [CLIENT] Displays this message</li>
<li>/block &lt;username&gt; - [CLIENT] Blocks a user</li>
<li>/unblock &lt;username&gt; - [CLIENT] Unblocks a user</li>
<li>/shrug &lt;message&gt; - [CLIENT] Appends ¯\\_(ツ)_/¯ to the end of the message.</li>
<li>/tableflip &lt;message&gt; - [CLIENT] Appends (╯°□°）╯︵ ┻━┻ to the end of the message.</li>
<li>/unflip &lt;message&gt; - [CLIENT] Appends ┬─┬ ノ( ゜-゜ノ) to the end of the message.</li>
<li>/killbot &lt;username&gt; - [CLIENT] Removes a bot (use if the bot is lagging behind)</li>
</ul>
With perms:<ul>
<li>/res - Rescues yourself</li>
<li>/god - Turns on godmode</li>
<li>/tp &lt;areaname&gt; - Teleports to an area</li>
<li>/kick &lt;username&gt; - Kicks someone</li>
<li>/ban &lt;username&gt; - Bring the BANHAMMER down on someone</li>
<li>/unban &lt;username&gt; - Remove the ban from someone</li>
</ul>
Owner:<ul>
<li>/add &lt;username&gt; - Gives someone perms</li>
<li>/remove &lt;username&gt; - Removes ones' perms</li>
</ul>
                            `
                        }
                    }, true);
                    chat.scrollTop = chat.scrollHeight;
                } else if (msg.startsWith("/shrug")) {
                    sendMessage(msg.slice(7) + " ¯\\_(ツ)_/¯");
                } else if (msg.startsWith("/tableflip")) {
                    sendMessage(msg.slice(11) + " (╯°□°）╯︵ ┻━┻");
                } else if (msg.startsWith("/unflip")) {
                    sendMessage(msg.slice(8) + " ┬─┬ ノ( ゜-゜ノ)");
                } else if (msg.startsWith("/killbot ")) {
                    let n = msg.slice(9);
                    let found = false;
                    for (let b in bots) {
                        if (bots[b].name === n) {
                            bots[b].close();
                            bots.splice(b, 1);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: "Successfully killed bot " + n
                            }
                        }, true);
                    } else {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: "Could not kill bot " + n
                            }
                        }, true);
                    }
                } else {
                    if (chatInput.value === "/respawn") {
                        for (let b of bots) {
                            b.send(`{"e":"message","message":"/respawn"}`);
                        }
                    }
                    sendMessage(msg);
                }
                chatInput.value = "";
            }
            chatInput.blur();
        }
    });
    chatInput.addEventListener("focus", () => {
        chatFocus = true;
    });
    chatInput.addEventListener("blur", () => {
        chatFocus = false;
    });
    changelogBtn.addEventListener("click", () => {
        show(changelog);
    });
    closeChangelog.addEventListener("click", () => {
        hide(changelog);
    });
});
ws.addEventListener("message", e => {
    let msg = JSON.parse(e.data);
    if (viewWS && (!noUS || msg.e !== "updateStates")) wsDiv.innerHTML = e.data;
    switch (msg.e) {
        case "result":
            if (!msg.m) {
                if (msg.cookie !== "") {
                    localStorage.setItem("cookie", msg.cookie);
                    localStorage.setItem("username", username.value);
                    localStorage.setItem("password", password.value);
                }
                if (msg.t.startsWith("Logged in as ")) {
                    user = msg.t.slice(13);
                }
                customAlert(msg.t.safe());
                hide(loginData);
                show(logoutDiv);
            } else {
                customAlert(msg.t);
            }
            break;
        case "logout":
            show(loginDiv);
            hide(logoutDiv);
            show(loginData);
            hide(gamesDiv);
            customAlert("Logout");
            break;
        case "games":
            gameListDiv.innerHTML = "";
            msg.g.forEach(g => {
                let div = document.createElement("div");
                div.className = "gameDisplay";
                if (g.private) div.classList.add("private");
                div.innerHTML = `<h2>${g.name}<br>${g.players} players</h2><h5>${g.id}</h5><p>${String(g.mapName).safe()} by ${String(g.creator).safe()}</p>`;
                div.addEventListener("click", () => {
                    if (g.private) {
                        send({
                            e: "join",
                            g: g.id,
                            p: prompt("Password?")
                        });
                    } else send({
                        e: "join",
                        g: g.id
                    });
                    id = g.id;
                    console.log(g.id);
                });
                gameListDiv.appendChild(div);
            });
            hide(loginDiv);
            show(gamesDiv);
            break;
        case "join":
            if (msg.m) customAlert("Could not join game");
            else {
                initMap(msg.i.map);
                hide(gamesDiv);
                show(gameDiv);
                for (let i of msg.i.powers) {
                    powers.add(i);
                }
                power0.value = msg.i.powers[0];
                power1.value = msg.i.powers[1];
                (function run(now = 0) {
                    const calcFPS = Math.floor(1000 / (now - lastFrame));
                    if (calcFPS != Infinity && FPSDisplay.innerHTML !== String(calcFPS)) {
                        FPSDisplay.innerHTML = calcFPS;
                    }
                    lastFrame = now;
                    render(data);
                    requestAnimationFrame(run);
                })();
                customAlert("Joined game");
                // Handle game controls
                document.addEventListener("keydown", e => {
                    if (keys.includes(e.key.toLowerCase())) {
                        send({
                            e: "input",
                            input: {
                                keys: keys.indexOf(e.key.toLowerCase()),
                                value: true
                            }
                        });
                        for (let b of bots) {
                            b.send(JSON.stringify({
                                e: "input",
                                input: {
                                    keys: keys.indexOf(e.key.toLowerCase()),
                                    value: true
                                }
                            }));
                        }
                    }
                    switch (e.key.toLowerCase()) {
                        case "o":
                            renderSettings.renderHitboxes = !renderSettings.renderHitboxes;
                            customAlert(`Hitboxes ${renderSettings.renderHitboxes ? "ON" : "OFF"}`);
                            break;
                        case "f":
                            if (freeCam) {
                                customAlert("Freecam OFF");
                                freeCam = false;
                            } else {
                                customAlert("Freecam ON");
                                freeCam = true;
                            }
                            break;
                        case "u":
                            camScale /= 1.5;
                            customAlert(`Camera Scale: ${camScale}`);
                            break;
                        case "i":
                            camScale *= 1.5;
                            customAlert(`Camera Scale: ${camScale}`);
                            break;
                        case "+":
                        case "=":
                            let bot = new WebSocket("wss://skap.io");
                            bot.addEventListener("open", () => {
                                bot.send(`{"e": "guest"}`);
                            });
                            bot.addEventListener("message", e => {
                                let msg = JSON.parse(e.data);
                                switch (msg.e) {
                                    case "result":
                                        if (msg.m) message({
                                            m: {
                                                s: "[CLIENT]",
                                                r: 1,
                                                m: "Bot failed to login as guest"
                                            }
                                        }, true);
                                        else {
                                            bot.name = msg.t.slice(13)
                                            message({
                                                m: {
                                                    s: "[CLIENT]",
                                                    r: 1,
                                                    m: `Bot ${bot.name} logged in`
                                                }
                                            }, true);
                                            bot.send(`{"e":"join", "g":"${id}"}`)
                                        }
                                        break;
                                    case "join":
                                        if (!msg.m) {
                                            message({
                                                m: {
                                                    s: "[CLIENT]",
                                                    r: 1,
                                                    m: `Bot ${bot.name} joined`
                                                }
                                            }, true);
                                            bots.push(bot);
                                        }
                                        break;
                                }
                            });
                            break;
                        case "-":
                        case "_":
                            if (bots.length) bots.pop().close();
                            break;
                        case "enter":
                        case "/":
                            chatInput.focus();
                            break;
                    }
                });
                document.addEventListener("keyup", e => {
                    if (keys.includes(e.key.toLowerCase())) {
                        send({
                            e: "input",
                            input: {
                                keys: keys.indexOf(e.key.toLowerCase()),
                                value: false
                            }
                        });
                        for (let b of bots) {
                            b.send(JSON.stringify({
                                e: "input",
                                input: {
                                    keys: keys.indexOf(e.key.toLowerCase()),
                                    value: false
                                }
                            }));
                        }
                    }
                });
                canvas.addEventListener("mousedown", e => {
                    let x;
                    if (e.button === 0) x = 5;
                    else if (e.button === 2) x = 6;
                    send({
                        e: "input",
                        input: {
                            keys: x,
                            value: true
                        }
                    });
                });
                canvas.addEventListener("mouseup", e => {
                    let x;
                    if (e.button === 0) x = 5;
                    else if (e.button === 2) x = 6;
                    send({
                        e: "input",
                        input: {
                            keys: x,
                            value: false
                        }
                    });
                });
                canvas.addEventListener("contextmenu", e => { e.preventDefault(); });
                document.addEventListener("mousemove", e => {
                    mouse.x = e.x;
                    mouse.y = e.y;
                });
            }
            break;
        case "message":
            if (msg.m.m.match(new RegExp("@" + user + "(\\s|$)", "g")) || msg.m.m.match(/@everyone(\s|$)/g)) ping.play();
            message(msg);
            break;
        case "updateStates":
            updateStates(msg.m);
            break;
        case "initMap":
            initMap(msg.m);
            break;
        case "updateMap":
            if (msg.m.update) {
                for (let o of msg.m.update) {
                    if (o.type === "rotatingLava") {
                        for (let u of parsedMap.rotatingLava) {
                            if (o.id === u.id) {
                                u.angle = (o.angle % 360) * Math.PI / 180;
                                u.center = o.center;
                                break;
                            }
                        }
                    } else if (o.type === "turret") {
                        for (let u of parsedMap.turret) {
                            if (o.id === u.id) {
                                u.dir = o.dir;
                                break;
                            }
                        }
                    } else if (o.type === "door") {
                        for (let u of parsedMap.door) {
                            if (o.id === u.id) {
                                u.opened = o.opened;
                                break;
                            }
                        }
                    } else if (o.type === "button") {
                        for (let u of parsedMap.button) {
                            if (o.id === u.id) {
                                u.pressed = o.pressed;
                                u.pos = o.pos;
                                u.size = o.size;
                                break;
                            }
                        }
                    } else if (o.type === "switch") {
                        for (let u of parsedMap.switch) {
                            if (o.id === u.id) {
                                u.switch = o.switch;
                                break;
                            }
                        }
                    }
                    for (let u in map) {
                        if (map[u].id === o.id) {
                            map[u] = o;
                        }
                    }
                }
            }
            if (msg.m.add)
                for (let o of msg.m.add) {
                    if (o.type === "box")
                        parsedMap.box.push(o);
                    map.objects.push(o);
                }
            if (msg.m.remove)
                for (let o of msg.m.remove) {
                    if (o.type === "box")
                        for (let i in parsedMap.box)
                            if (parsedMap.box[i].id === o.id) {
                                parsedMap.box.splice(i, 1);
                                break;
                            }
                    for (let i in map.objects) {
                        if (map.objects[i].id === o.id) {
                            map.objects.splice(i, 1);
                            break;
                        }
                    }
                }

            break;
        case "power":
            for (let i of msg.m) {
                powers.add(i);
            }
            customAlert("Gained power(s) " + msg.m.join(", "));
            break;
        case "style":
            playerColor.value = `#${msg.c[0].toString(16)}${msg.c[1].toString(16)}${msg.c[2].toString(16)}`;
            break;
    }
});
/**
 * @param {SkapMap} i 
 */
function initMap(i) {
    map = i;
    renderSettings.colors.obstacle = "rgb(" +


        (240 + (i.backgroundColor[0] - 240) * i.backgroundColor[3]) + ", " +
        (240 + (i.backgroundColor[1] - 240) * i.backgroundColor[3]) + ", " +
        (240 + (i.backgroundColor[2] - 240) * i.backgroundColor[3]) + ")";
    parsedMap.background = fromColArr(i.areaColor);
    parsedMap.obstacle = [];
    parsedMap.teleporter = [];
    parsedMap.lava = [];
    parsedMap.rotatingLava = [];
    parsedMap.ice = [];
    parsedMap.slime = [];
    parsedMap.button = [];
    parsedMap.switch = [];
    parsedMap.door = [];
    parsedMap.block0 = [];
    parsedMap.text = [];
    parsedMap.turret = [];
    parsedMap.box = [];
    parsedMap.block1 = [];
    for (let o of i.objects) {
        switch (o.type) {
            case "block":
                o.color = fromColArr(o.color.concat(o.opacity));
                parsedMap["block" + o.layer].push(o);
                break;
            case "obstacle":
            case "slime":
            case "ice":
            case "lava":
            case "text":
            case "box":
            case "turret":
                parsedMap[o.type].push(o);
                break;
            case "teleporter":
            case "button":
            case "switch":
                o.dir = o.dir.toString();
                parsedMap[o.type].push(o);
                break;
            case "rotatingLava":
                o.angle = o.angle * Math.PI / 180;
                parsedMap.rotatingLava.push(o);
                break;
        }
    }
    for (let o of i.objects) {
        if (o.type === "door") {
            for (let l in o.linkIds) {
                o.linkIds[l] = parseInt(o.linkIds[l])
            }
            o.links = [];
            for (let b of parsedMap.button) {
                if (o.linkIds.includes(Math.floor(Math.abs(b.linkId)))) {
                    o.links.push(b);
                }
            }
            for (let s of parsedMap.switch) {
                if (o.linkIds.includes(Math.floor(Math.abs(s.linkId)))) {
                    o.links.push(s);
                }
            }
            parsedMap.door.push(o);
        }
    }
}
/**
 * 
 * @param {Object} msg 
 * @param {Object} msg.m
 * @param {string} msg.m.s Author
 * @param {-2 | -1 | 0 | 1} msg.m.r Discord / Guest / User / Mod
 * @param {string} msg.m.m Message
 * @param {boolean} force Force message
 */
function message(msg, force = false) {
    if (!force && blocked.includes(msg.m.s) && !devs.includes(msg.m.s)) {
        return;
    }
    let scroll = chat.lastElementChild ? chat.scrollTop + chat.clientHeight + 6 >= chat.scrollHeight : true;
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    let p = document.createElement("p");
    p.className =
        (msg.m.s === "[SKAP]" || msg.m.s === "[CLIENT]")
            ? "SYSMsg"
            : devs.includes(msg.m.s) && msg.m.r !== -2
                ? "devMsg"
                : ["discordMsg", "guestMsg", "userMsg", "modMsg"][msg.m.r + 2];
    p.innerHTML =
        (force ? msg.m.s : msg.m.s.safe()) + ":&nbsp;" +
        (force
            ? msg.m.m.replace(URLRegex, '<a href="$1" target="_blank">$1</a>')
            : msg.m.m.safe().replace(URLRegex, '<a href="$1" target="_blank">$1</a>')
        );
    wrapper.appendChild(p);
    chat.appendChild(wrapper);
    if (scroll) p.scrollIntoView();
    return p;
}
ws.addEventListener("close", () => {
    hide(gameDiv);
    document.title = "Disconnected";
    customAlert("The WebSocket closed for unknown reasons.<br>Please reload the client. If that doesn't work, try again later.<br>Skap may have been taken down for maintenence", 100);
});
document.addEventListener("keydown", e => {
    if (!e.repeat && e.key.toLowerCase() === "p") {
        if (viewWS) {
            viewWS = false;
            customAlert("WS messages HIDDEN");
            hide(wsDiv);
        } else {
            viewWS = true;
            customAlert("WS messages SHOWN<br><small>Note: Is spammy</small>");
            show(wsDiv);
        }
        localStorage.setItem("viewWS", viewWS ? "on" : "");
    }
});