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
    login.addEventListener("click", () => {
        send({
            e: "login",
            m: {
                username: username.value,
                password: SHA256(username.value + password.value)
            }
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
        send({e: "powerChange", m: 0, i: power0.value = clamp(0, power0.value, 9)});
    });
    power1.addEventListener("input", () => {
        send({e: "powerChange", m: 1, i: power1.value = clamp(0, power1.value, 9)});
    });
    chatInput.addEventListener("keydown", e => {
        e.cancelBubble = true;
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
                                m: `User ${p} is already blocked`
                            }
                        }, true);
                    } else {
                        blocked.push(p);
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `Blocked user ${p}`
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
                                m: `Unblocked user ${p}`
                            }
                        }, true);
                        localStorage.setItem("blocked", blocked.join(" "));
                    } else {
                        message({
                            m: {
                                s: "[CLIENT]",
                                r: 1,
                                m: `Could not unblock user ${p}<br>because they are not in the blocked list, or something went wrong.`
                            }
                        });
                    }
                } else if (msg.startsWith("/blocked")) {
                    message({
                        m: {
                            s: "[CLIENT]",
                            r: 1,
                            m: blocked.length ? "Blocked users: " + blocked.join(", ") : "No blocked users"
                        }
                    });
                } else if (msg.startsWith("/help")) {
                    message({
                        m: {
                            s: "[CLIENT]",
                            r: 1,
                            m: `
Commands:<br>
Without perms:<ul>
<li>/help - [CLIENT] Displays this message</li>
<li>/block &lt;username&gt; - [CLIENT] Blocks a user</li>
<li>/unblock &lt;username&gt; - [CLIENT] Unblocks a user</li>
<li>/list - Tells you who has perms</li>
<li>/respawn - Respawns you to Home</li>
<li>/banned - Check bans</li>
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
                    }, true).scrollIntoView();
                } else {
                    // Test for n-words and stuff
                    for (let i of seriousProfanCheck) {
                        if (msg.toLowerCase().match(new RegExp("(^|\\s)" + i, "gi"))) {
                            if (window.location.href.endsWith("index.html"))
                                window.location.replace(window.location.pathname.slice(0, window.location.pathname.length - 10) + "bad.html");
                            else window.location.pathname = "bad.html";
                        }
                    }
                    // Bypass the profan
                    if (bypassProfan) {
                        for (let i of profanCheck) {
                            let match = msg.match(new RegExp(i, "gi"));
                            if (match) {
                                for (let m of match) {
                                    msg = msg.replace(m, m[0] + "\u200C" + m.slice(1));
                                }
                            }
                        }
                    }
                    send({
                        e: "message",
                        message: msg
                    });
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
                    if (!chatFocus) {
                        if (keys.includes(e.key.toLowerCase())) {
                            send({
                                e: "input",
                                input: {
                                    keys: keys.indexOf(e.key.toLowerCase()),
                                    value: true
                                }
                            });
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
                            case "enter":
                                if (!chatFocus) {
                                    chatInput.focus();
                                }
                                break;
                        }
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
            message(msg);
            break;
        case "updateStates":
            updateStates(msg.m);
            break;
        case "initMap":
            initMap(msg.m);
            break;
        case "updateMap":
            if (msg.m.update)
                for (let u of msg.m.update)
                    for (let o in map.objects)
                        if (map.objects[o].id === u.id) {
                            map.objects[o] = u;
                            break;
                        }
            if (msg.m.add)
                map.objects = map.objects.concat(msg.m.add);
            if (msg.m.remove)
                for (let r of msg.m.remove)
                    for (let o in map.objects)
                        if (map.objects[o].id === r.id)
                            map.objects.splice(o);
            break;
        case "power":
            for (let i of msg.m) {
                powers.add(i);
            }
            break;
    }
});
/**
 * @param {SkapMap} i 
 */
function initMap(i) {
    map = i;
    parsedMap.background = fromColArr(i.areaColor);
    parsedMap.obstacle = i.objects.filter(obj => obj.type === "obstacle");
    parsedMap.slime = i.objects.filter(obj => obj.type === "slime");
    parsedMap.ice = i.objects.filter(obj => obj.type === "ice");
    parsedMap.lava = i.objects.filter(obj => obj.type === "lava");
    parsedMap.teleporter = i.objects.filter(obj => obj.type === "teleporter");
    renderSettings.colors.obstacle = "rgb(" +
        (240 + (i.backgroundColor[0] - 240) * i.backgroundColor[3]) + ", " +
        (240 + (i.backgroundColor[1] - 240) * i.backgroundColor[3]) + ", " +
        (240 + (i.backgroundColor[2] - 240) * i.backgroundColor[3]) + ")";
}
/**
 * 
 * @param {Object} msg 
 * @param {Object} msg.m
 * @param {string} msg.m.s Author
 * @param {-1 | 0 | 1} msg.m.r Guest / User / Mod
 * @param {string} msg.m.m Message
 * @param {boolean} force Force message
 */
function message(msg, force = false) {
    if (!force && blocked.includes(msg.m.s) && !devs.includes(msg.m.s)) {
        return;
    }
    let scroll = chat.lastElementChild ? chat.scrollTop + chat.clientHeight + 6 >= chat.scrollHeight : true;
    let p = document.createElement("p");
    p.className = msg.m.s === "[SKAP]" || msg.m.s === "[CLIENT]" ? "SYSMsg" : devs.includes(msg.m.s) ? "devMsg" : ["guestMsg", "userMsg", "modMsg"][msg.m.r + 1];
    p.innerHTML = (force ? msg.m.s : msg.m.s.safe()) + ":&nbsp;" + (force ? msg.m.m : msg.m.m.safe());
    chat.appendChild(p);
    if (scroll) p.scrollIntoView();
    return p;
}
ws.addEventListener("close", () => {
    hide(gameDiv);
    document.title = "Disconnected";
    customAlert("The WebSocket closed for unknown reasons.<br>Please reload the client. If that doesn't work, try again later.<br>Skap may have been taken down for maintenence", 100);
});
document.addEventListener("keydown", e => {
    if (!e.repeat && !chatFocus && e.key.toLowerCase() === "p") {
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