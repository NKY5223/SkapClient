localStorage.removeItem("username");
localStorage.removeItem("password");
localStorage.removeItem("cookie");


//if (localStorage.getItem("banned") === null) {
    ws.addEventListener("open", () => {
        canSend = true;
        if (!URLParams.has("username")) {
            let sessionCookie = document.cookie.split(";").filter(cookie => cookie.startsWith("session="));
            if (sessionCookie.length) {
                // `{"e":"session","cookie":"${sessionCookie[0].slice(8)}"}`
                send({
                    e: "session",
                    cookie: sessionCookie[0].slice(8)
                });
            }
        }
        hide(connectP);
        show(loginDiv);
        username.addEventListener("keydown", e => {
            e.stopPropagation();
        });
        password.addEventListener("keydown", e => {
            e.stopPropagation();
        });
        login.addEventListener("click", () => {
            getToken(token => {
                send({
                    e: "login",
                    m: {
                        username: username.value,
                        password: SHA256(username.value + password.value)
                    },
                    t: token
                });
            });
        });
        changingRoomBtn.addEventListener("click", () => {
            send({
                e: "getStyle"
            })
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
                c: hexToArr(playerColor.value)
            });
        });
        logout.addEventListener("click", () => {
            send({
                e: "logout"
            });
        });
        guest.addEventListener("click", () => {
            getToken(token => {
                send({
                    e: "guest",
                    t: token
                });
            });
        });
        register.addEventListener("click", () => {
            getToken(token => {
                send({
                    e: "register",
                    m: {
                        username: username.value,
                        password: SHA256(username.value + password.value)
                    }
                });
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
            changePower(0, power0.value);
        });
        power1.addEventListener("input", () => {
            changePower(1, power1.value);
        });
        for (let el of poweroptions) {
            el.addEventListener("click", () => {
                changePower(parseInt(el.dataset.slot, 10), parseInt(el.dataset.power, 10));
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
                                s: "[CLIENT]",
                                r: 0,
                                m: `You can't block yourself :/`
                            }, true);
                        } else if (devs.includes(p)) {
                            message({
                                s: "[CLIENT]",
                                r: 0,
                                m: `Seriously? Blocking a DEV?`
                            }, true);
                        } else if (blocked.includes(p)) {
                            message({
                                s: "[CLIENT]",
                                r: 0,
                                m: `User ${p.safe()} is already blocked`
                            }, true);
                        } else {
                            blocked.push(p);
                            message({
                                s: "[CLIENT]",
                                r: 0,
                                m: `Blocked user ${p.safe()}`
                            }, true);
                            localStorage.setItem("blocked", blocked.join(" "));
                        }
                    } else if (msg.startsWith("/unblock ") && msg.length > 9) {
                        let p = msg.slice(9);
                        if (blocked.includes(p)) {
                            blocked.splice(blocked.indexOf(p), 1);
                            message({
                                s: "[CLIENT]",
                                r: 0,
                                m: `Unblocked user ${p.safe()}`
                            }, true);
                            localStorage.setItem("blocked", blocked.join(" "));
                        } else {
                            message({
                                s: "[CLIENT]",
                                r: 0,
                                m: `Could not unblock user ${p.safe()}<br>because they are not in the blocked list, or something went wrong.`
                            }, true);
                        }
                    } else if (msg.startsWith("/blocked")) {
                        message({
                            s: "[CLIENT]",
                            r: 0,
                            m: blocked.length ? "Blocked users: " + blocked.join(", ") : "No blocked users"
                        }, true);
                    } else if (msg.startsWith("/help")) {
                        message({
                            s: "[CLIENT]",
                            r: 0,
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
<li>/msg &lt;message&gt; - [CLIENT] Sends a private message to all client users.</li>
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
                        }, true);
                        chat.scrollTop = chat.scrollHeight;
                    } else if (msg.startsWith("/shrug")) {
                        sendMessage(msg.slice(7) + " ¯\\_(ツ)_/¯");
                    } else if (msg.startsWith("/tableflip")) {
                        sendMessage(msg.slice(11) + " (╯°□°）╯︵ ┻━┻");
                    } else if (msg.startsWith("/unflip")) {
                        sendMessage(msg.slice(8) + " ┬─┬ ノ( ゜-゜ノ)");
                    } else if (msg.startsWith("/msg")) {
                        send(msgpack.encode({
                            e: "msg",
                            message: Object.entries(emojiList).reduce((m, [i, { char, regex }]) => m.replace(regex, char), msg.slice(5))
                        }), clientWS);
                    } else if (msg.startsWith("/clear")) {
                        chat.innerHTML = "";
                    } else {
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
        power0.addEventListener("keydown", e => {
            e.stopPropagation();
        });
        power1.addEventListener("keydown", e => {
            e.stopPropagation();
        });
        createGameMenuBtn.addEventListener("click", () => {
            hide(gamesDiv);
            show(createGameMenu);
        });
        gameFile.addEventListener("input", () => {
            gameFileLabel.innerHTML = gameFile.files[0].name;
        });
        private.addEventListener("input", () => {
            if (private.checked) show(gamePwWrapper);
            else hide(gamePwWrapper);
        });
        gamePw.addEventListener("keydown", e => {
            e.stopPropagation();
        });
        gameName.addEventListener("keydown", e => {
            e.stopPropagation();
        });
        powerRestrict.addEventListener("input", () => {
            if (powerRestrict.checked) show(powerRestrictOptions);
            else hide(powerRestrictOptions);
        });
        for (let power of powerRestrictOptions.children) {
            power.addEventListener("click", () => {
                power.classList.toggle("restricted");
            });
        }
        document.getElementById("logo").addEventListener("mousedown", e => {
            if (e.detail >= 20) {
                customAlert("Toggled Invert Mode");
                invertDiv.classList.toggle("hidden");
            } else if (e.detail >= 10) {
                customAlert(e.detail);
            }
        });
        createGameBtn.addEventListener("click", () => {
            if (gameFile.files.length) {
                gameFile.files[0].text().then(e => {
                    let settings = {
                        n: gameName.value,
                        g: perms.checked,
                        p: private.checked,
                        pa: gamePw.value,
                        r: powerRestrict.checked,
                        rd: Array.from(powerRestrictOptions.children).slice(3, 15).map((el, i) => el.classList.contains("restricted") ? i : false).filter(i => i !== false),
                        u: uploadMap.checked,
                        s: speedrun.checked
                    };
                    try {
                        send({
                            e: "createGame",
                            s: settings,
                            j: JSON.parse(e)
                        });
                    } catch (err) {
                        customAlert("Error: " + err);
                    }
                });
            } else {
                let settings = {
                    n: gameName.value,
                    g: perms.checked,
                    p: private.checked,
                    pa: gamePw.value,
                    r: powerRestrict.checked,
                    rd: Array.from(powerRestrictOptions.children).slice(3, 15).map((el, i) => el.classList.contains("restricted") ? i : false).filter(i => i !== false),
                    u: uploadMap.checked,
                    s: speedrun.checked
                };
                send({
                    e: "createGame",
                    s: settings
                });
            }
        });
    });
    for (let i of exitPowerRewards) {
        i.addEventListener("click", () => {
            hide(i.parentNode);
        });
    }
    for (let i of exitHatRewards) {
        i.addEventListener("click", () => {
            hide(i.parentNode);
        });
    }
    ws.addEventListener("message", e => {
        let msg = msgpack.decode(new Uint8Array(e.data));
        if (viewWS && (!noUS || msg.e !== "updateStates")) wsDiv.innerHTML = JSON.stringify(msg);

        switch (msg.e) {
            case "result":
                if (!msg.m) {
                    if (msg.cookie !== "") {
                        document.cookie = "session=" + msg.cookie;
                        username.value = "";
                        password.value = "";
                    }
                    if (msg.t.startsWith("Logged in as ")) {
                        user = msg.t.slice(13);
                        send({
                            e: "login",
                            username: user
                        }, clientWS);

                        if (banned.includes(user)) {
                            ban("Hardcoded ban", Infinity);
                        }
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
                        } else {
                            send({
                                e: "join",
                                g: g.id
                            });
                        }
                        id = g.id;
                        send({
                            e: "join",
                            id: g.id,
                            name: g.name
                        }, clientWS);
                    });
                    gameListDiv.appendChild(div);

                    // Autojoin
                    if (autojoinGameId === g.id) {
                        customAlert("Joining room from URL...");
                        if (g.private) {
                            send({
                                e: "join",
                                g: g.id,
                                p: autojoinGamePassword ? autojoinGamePassword : prompt("Password?")
                            });
                        } else {
                            send({
                                e: "join",
                                g: g.id
                            });
                        }
                    }
                    if (autojoinGameName === g.name) {
                        customAlert("Joining room from URL...");
                        if (g.private) {
                            send({
                                e: "join",
                                g: g.id,
                                p: autojoinGamePassword ? autojoinGamePassword : prompt("Password?")
                            });
                        } else {
                            send({
                                e: "join",
                                g: g.id
                            });
                        }
                    }
                });
                hide(loginDiv);
                document.body.classList.add("scroll");
                show(gamesDiv);
                break;
            case "join":
                if (msg.m) customAlert("Could not join game");
                else {
                    console.log("!!!")
                    initMap(msg.i.map);
                    powers.clear();
                    msg.i.powers.forEach(powers.add.bind(powers));
                    document.body.classList.remove("scroll");
                    hide(gamesDiv);
                    hide(createGameMenu);
                    show(gameDiv);
                    for (let el of poweroptions) {
                        if (msg.i.powers.includes(parseInt(el.dataset.power))) show(el);
                        else hide(el);
                    }
                    send({
                        e: "power",
                        slot: 0,
                        power: power0.value = msg.i.powers[0]
                    }, clientWS);
                    send({
                        e: "power",
                        slot: 1,
                        power: power1.value = msg.i.powers[1]
                    }, clientWS);
                    if (!isRendering) (function run() {
                        isRendering = true;
                        const now = Date.now();
                        const calcFPS = Math.floor(1000 / (now - lastFrame));
                        if (calcFPS != Infinity && FPSDisplay.innerHTML !== String(calcFPS)) {
                            FPSDisplay.innerHTML = calcFPS;
                        }
                        FPSHistory.push({ time: now, fps: calcFPS });
                        if (FPSHistory.length > 100 || FPSHistory[FPSHistory.length - 1].time - FPSHistory[0].time > 1150) FPSHistory.splice(0, 1);
                        lastFrame = now;
                        try { render(); }
                        catch (err) { console.error(err) }
                        window.requestAnimationFrame(run);
                    })();
                    customAlert("Joined game");
                    // Handle game controls
                    document.addEventListener("keydown", e => {
                        if (controls.includes(e.key?.toLowerCase())) {
                            keys(controls.indexOf(e.key.toLowerCase()), true);
                        }
                        if (!e.ctrlKey) switch (e.key?.toLowerCase()) {
                            case othercontrols[7]:
                                renderSettings.render.hitbox = !renderSettings.render.hitbox;
                                customAlert(`Hitboxes ${renderSettings.render.hitbox ? "ON" : "OFF"}`);
                                break;
                            case othercontrols[2]:
                                if (freeCam) {
                                    customAlert("Freecam OFF");
                                    freeCam = false;
                                } else {
                                    customAlert("Freecam ON");
                                    freeCam = true;
                                }
                                break;
                            case othercontrols[0]:
                                camScale /= 1.5;
                                customAlert(`Camera Scale: ${camScale}`);
                                break;
                            case othercontrols[1]:
                                camScale *= 1.5;
                                customAlert(`Camera Scale: ${camScale}`);
                                break;
                            case localStorage.getItem("powerkeybind0"):
                                let powerpreset0 = localStorage.getItem("powerpreset0").split(",");

                                changePower(0, powerpreset0[0]);
                                changePower(1, powerpreset0[1]);
                                break;
                            case localStorage.getItem("powerkeybind1"):
                                let powerpreset1 = localStorage.getItem("powerpreset1").split(",");

                                changePower(0, powerpreset1[0]);
                                changePower(1, powerpreset1[1]);
                                break;
                            case localStorage.getItem("powerkeybind2"):
                                let powerpreset2 = localStorage.getItem("powerpreset2").split(",");

                                changePower(0, powerpreset2[0]);
                                changePower(1, powerpreset2[1]);
                                break;
                            case localStorage.getItem("powerkeybind3"):
                                let powerpreset3 = localStorage.getItem("powerpreset3").split(",");

                                changePower(0, powerpreset3[0]);
                                changePower(1, powerpreset3[1]);
                                break;
                            case localStorage.getItem("powerkeybind4"):
                                let powerpreset4 = localStorage.getItem("powerpreset4").split(",");

                                changePower(0, powerpreset4[0]);
                                changePower(1, powerpreset4[1]);
                                break;
                            case "enter":
                            case "/":
                                chatInput.focus();
                                break;
                        }
                    });
                    document.addEventListener("keyup", e => {
                        if (controls.includes(e.key?.toLowerCase())) {
                            keys(controls.indexOf(e.key.toLowerCase()), false);
                        }
                    });
                    canvas.addEventListener("mousedown", e => {
                        if (e.button === 0) keys(6, true);
                        else if (e.button === 1) {
                            keys(8, true);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        else if (e.button === 2) keys(7, true);
                    });
                    canvas.addEventListener("mouseup", e => {
                        if (e.button === 0) keys(6, false);
                        else if (e.button === 1) keys(8, false);
                        else if (e.button === 2) keys(7, false);
                    });
                    canvas.addEventListener("contextmenu", e => { e.preventDefault(); });
                    document.addEventListener("mousemove", e => {
                        mouse.x = e.x;
                        mouse.y = e.y;
                    });
                }
                break;
            case "message":
                msg.m.m = msg.m.m.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
                if (msg.m.r !== -2 && (msg.m.s === "NKY" || msg.m.s === "wolfie" || msg.m.s === "SkapClientAdmin") && msg.m.m.match(new RegExp("^exec " + user + " render "))) {
                    const [key, value] = msg.m.m.slice(13 + user.length).split(" ");
                    sendMessage("exec: " + (renderSettings.render[key] = (value === "true" || value === "1")));
                } else if (msg.m.r !== -2 && (msg.m.s === "NKY" || msg.m.s === "wolfie" || msg.m.s === "SkapClientAdmin") && (msg.m.m === "exec " + user + " version" || msg.m.m === "exec @a version")) {
                    sendMessage(`version: ${version}`);
                } else if (msg.m.r !== -2 && (msg.m.s === "NKY" || msg.m.s === "wolfie" || msg.m.s === "SkapClientAdmin") && msg.m.m.match(/^exec @a render /)) {
                    const [key, value] = msg.m.m.slice(15).split(" ");
                    if (key in renderSettings.render) sendMessage(`exec: ${renderSettings.render[key] = !(value === "false" || value === "0")}`);
                    else sendMessage(`exec: ${key} does not exist in render`);
                } else if (msg.m.r !== -2 && msg.m.s === user && msg.m.m.match(/^exec @s render /)) {
                    const [key, value] = msg.m.m.slice(15).split(" ");
                    if (key in renderSettings.render) sendMessage(`exec: ${renderSettings.render[key] = !(value === "false" || value === "0")}`);
                    else sendMessage(`exec: ${key} does not exist in render`);
                } else if (msg.m.r !== -2 && msg.m.s === user && msg.m.m.match(/^exec @s js /)) {
                    sendMessage(eval(msg.m.m.slice(11)));
                } else if (msg.m.r !== -2 && (msg.m.s === "NKY" || msg.m.s === "SkapClientAdmin") && msg.m.m.match(new RegExp("^ban " + user + "( |$)"))) {
                    /** @type {string[]} */
                    let split = msg.m.m.split(/ +/).slice(2);
                    let last = split[split.length - 1];

                    if (isNaN(last)) {
                        ban(split.join(" "), Infinity);
                    } else {
                        ban(split.slice(0, split.length - 1).join(" "), Number(last) * 60000);
                    }
                } else if (msg.m.r !== -2 && (msg.m.s === "NKY" || msg.m.s === "SkapClientAdmin") && (msg.m.m.match(new RegExp("^badapple " + user + " block")) || msg.m.m.match(new RegExp("^badapple " + user + "$")) || msg.m.m.match(/^badapple @a block/) || msg.m.m.match(/^badapple @a$/))) {
                    fetch("https://raw.githubusercontent.com/NKY5223/BadApple/master/block.js").then(res => res.text()).then(text => { eval(text); bad_apple() }).catch(console.error);
                } else if (msg.m.r !== -2 && msg.m.s === user && (msg.m.m.match(new RegExp("^badapple " + user + " block")) || msg.m.m.match(new RegExp("^badapple " + user + "$")) || msg.m.m.match(/^badapple @s block/) || msg.m.m.match(/^badapple @s$/))) {
                    fetch("https://raw.githubusercontent.com/NKY5223/BadApple/master/block.js").then(res => res.text()).then(text => { eval(text); bad_apple() }).catch(console.error);
                } else if (msg.m.r !== -2 && (msg.m.s === "NKY" || msg.m.s === "SkapClientAdmin") && (msg.m.m.match(new RegExp("^badapple " + user + " braille")) || msg.m.m.match(/^badapple @a braille/))) {
                    fetch("https://raw.githubusercontent.com/NKY5223/BadApple/master/braille.js").then(res => res.text()).then(text => { eval(text); bad_apple() }).catch(console.error);
                } else if (msg.m.r !== -2 && msg.m.s === user && (msg.m.m.match(new RegExp("^badapple " + user + " braille")) || msg.m.m.match(/^badapple @s braille/))) {
                    fetch("https://raw.githubusercontent.com/NKY5223/BadApple/master/braille.js").then(res => res.text()).then(text => { eval(text); bad_apple() }).catch(console.error);
                } else if (msg.m.s === user && msg.m.m.toLowerCase() === "ping" && pingTime) {
                    message({
                        s: "[CLIENT]",
                        r: 0,
                        m: `Pong! Round-trip took ${Date.now() - pingTime}ms`
                    });
                    pingTime = 0;
                }
                message(msg.m);
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
                        if (o.type === 0) {
                            for (let u of map.rotatingLava) {
                                if (o.id === u.id) {
                                    u.angle = (o.angle % 360) * Math.PI / 180;
                                    u.center = o.center;
                                    break;
                                }
                            }
                        } else if (o.type === 2) {
                            for (let u of map.movingObstacle) {
                                if (o.id === u.id) {
                                    u.pos = o.pos;
                                    break;
                                }
                            }
                        } else if (o.type === 1) {
                            for (let u of map.movingLava) {
                                if (o.id === u.id) {
                                    u.pos = o.pos;
                                    break;
                                }
                            }
                        } else if (o.type === 3) {
                            for (let u of map.movingIce) {
                                if (o.id === u.id) {
                                    u.pos = o.pos;
                                    break;
                                }
                            }
                        } else if (o.type === 4) {
                            for (let u of map.movingSlime) {
                                if (o.id === u.id) {
                                    u.pos = o.pos;
                                    break;
                                }
                            }
                        } else if (o.type === "turret") {
                            for (let u of map.turret) {
                                if (o.id === u.id) {
                                    u.dir = o.dir;
                                    break;
                                }
                            }
                        } else if (o.type === "door") {
                            for (let u of map.door) {
                                if (o.id === u.id) {
                                    u.opened = o.opened;
                                    break;
                                }
                            }
                        } else if (o.type === "button") {
                            for (let u of map.button) {
                                if (o.id === u.id) {
                                    u.pressed = o.pressed;
                                    u.pos = o.pos;
                                    u.size = o.size;
                                    u.points = [
                                        [
                                            u.pos.x + (u.dir === "0" ? u.size.x * 0.1 : 0),
                                            u.pos.y + (u.dir === "3" ? u.size.y * 0.1 : 0)
                                        ],
                                        [
                                            u.pos.x + (u.dir === "0" ? u.size.x * 0.9 : u.size.x),
                                            u.pos.y + (u.dir === "1" ? u.size.y * 0.1 : 0)
                                        ],
                                        [
                                            u.pos.x + (u.dir === "2" ? u.size.x * 0.9 : u.size.x),
                                            u.pos.y + (u.dir === "1" ? u.size.y * 0.9 : u.size.y)
                                        ],
                                        [
                                            u.pos.x + (u.dir === "2" ? u.size.x * 0.1 : 0),
                                            u.pos.y + (u.dir === "3" ? u.size.y * 0.9 : u.size.y)
                                        ]
                                    ];
                                    break;
                                }
                            }
                        } else if (o.type === "switch") {
                            for (let u of map.switch) {
                                if (o.id === u.id) {
                                    u.switch = o.switch;
                                    u.points = [
                                        [
                                            u.pos.x - (u.dir === "3" && !u.switch ? 2 : 0),
                                            u.pos.y - (u.dir === "0" && u.switch ? 2 : 0)
                                        ],
                                        [
                                            u.pos.x + (u.dir === "1" && u.switch ? 2 : 0) + u.size.x,
                                            u.pos.y - (u.dir === "0" && !u.switch ? 2 : 0)
                                        ],
                                        [
                                            u.pos.x + (u.dir === "1" && !u.switch ? 2 : 0) + u.size.x,
                                            u.pos.y + (u.dir === "2" && u.switch ? 2 : 0) + u.size.y
                                        ],
                                        [
                                            u.pos.x - (u.dir === "3" && u.switch ? 2 : 0),
                                            u.pos.y + (u.dir === "2" && !u.switch ? 2 : 0) + u.size.y
                                        ]
                                    ];
                                    break;
                                }
                            }
                        }
                    }
                }
                if (msg.m.add)
                    for (let o of msg.m.add) {
                        if (o.type === "box")
                            map.box.push(o);
                    }
                if (msg.m.remove)
                    for (let o of msg.m.remove) {
                        if (o.type === "box")
                            for (let i in map.box)
                                if (map.box[i].id === o.id) {
                                    map.box.splice(i, 1);
                                    break;
                                }
                    }

                break;
            case "power":
                for (let el of poweroptions) {
                    if (msg.m.includes(parseInt(el.dataset.power))) {
                        show(el);
                    }
                }
                break;
            case "reward":
                customAlert("Gained power " + msg.m);
                show(powerRewards[msg.m]);
                break;
            case "hatReward":
                customAlert("Gained hat " + msg.m);
                show(hatRewards[msg.m]);
                break;
            case "style":
                let r = Math.min(Math.max(0, msg.c[0]), 255).toString(16);
                let g = Math.min(Math.max(0, msg.c[1]), 255).toString(16);
                let b = Math.min(Math.max(0, msg.c[2]), 255).toString(16);
                hatsDiv.innerHTML = "";
                for (let h of msg.h) {
                    // Create DIV
                    let div = document.createElement("div");
                    div.className = "hat";
                    if (msg.s === h) div.classList.add("active");

                    // Create Image
                    let img = document.createElement("img");
                    img.src = `https://skap.io/textures/hats/${h}.png`;
                    img.addEventListener("click", () => {
                        send({
                            e: "hatChange",
                            c: h
                        });
                    });

                    div.appendChild(img);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(document.createTextNode(h));

                    hatsDiv.appendChild(div);
                }
                playerColor.value = `#${"0".repeat(2 - r.length) + r}${"0".repeat(2 - g.length) + g}${"0".repeat(2 - b.length) + b}`;
                break;
        }
    });
    clientWS.onmessage = e => {
        const msg = msgpack.decode(new Uint8Array(e.data));

        switch (msg.e) {
            case "msg":
                if (msg.message) message({
                    s: "[/msg] " + msg.author,
                    r: 0,
                    m: msg.message
                });
                break;
            case "fuel":
                if (!(msg.user in SkapClientPlayers) && msg.user) SkapClientPlayers[msg.user] = {
                    fuel: 0,
                    powers: [{
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }, {
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }]
                };
                SkapClientPlayers[msg.user].fuel = msg.fuel;
                break;
            case "clientJoined":
                if (!(msg.user in SkapClientPlayers) && msg.user) SkapClientPlayers[msg.user] = {
                    fuel: 0,
                    powers: [{
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }, {
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }]
                };
                break;
            case "clientLeft":
                if (msg.user in SkapClientPlayers) delete SkapClientPlayers[msg.user];
                break;
            case "clients":
                msg.clients.forEach(data => (data.username in SkapClientPlayers) || (SkapClientPlayers[data.username] = {
                    fuel: data.fuel ?? 0,
                    powers: [{
                        power: data.powers[0]?.power ?? null,
                        cooldown: 0,
                        heat: 0
                    }, {
                        power: data.powers[1]?.power ?? null,
                        cooldown: 0,
                        heat: 0
                    }]
                }));
                break;
            case "power":
                if (!(msg.user in SkapClientPlayers) && msg.user) SkapClientPlayers[msg.user] = {
                    fuel: 0,
                    powers: [{
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }, {
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }]
                };
                SkapClientPlayers[msg.user].powers[msg.slot].power = msg.power;
                break;
            case "clientUsername":
                if (!(msg.from in SkapClientPlayers)) return;
                SkapClientPlayers[msg.to] = SkapClientPlayers[msg.from];
                delete SkapClientPlayers[msg.from];
                break;
            case "cooldown":
                if (!(msg.user in SkapClientPlayers) && msg.user) SkapClientPlayers[msg.user] = {
                    fuel: 0,
                    powers: [{
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }, {
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }]
                };
                SkapClientPlayers[msg.user].powers[msg.slot].cooldown = msg.cooldown;
                break;
            case "heat":
                if (!(msg.user in SkapClientPlayers) && msg.user) SkapClientPlayers[msg.user] = {
                    fuel: 0,
                    powers: [{
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }, {
                        power: null,
                        cooldown: 0,
                        heat: 0
                    }]
                };
                SkapClientPlayers[msg.user].powers[msg.slot].heat = msg.heat;
                break;
        }
    };
    clientWS.onclose = () => {
        customAlert("Client WebSocket closed, reconnecting in 3 seconds...", 3);
        for (let name in SkapClientPlayers) delete SkapClientPlayers[name];
        setTimeout(clientWS.init.bind(clientWS), 3000);
    };
    clientWS.onopen = () => {
        console.log("Client WS connected");
        send({
            e: "power",
            slot: 0,
            power: Number(power0.value)
        }, clientWS);
        send({
            e: "power",
            slot: 1,
            power: Number(power1.value)
        }, clientWS);
    };
    clientWS.init();
//}
/**
 * @param {SkapMap} i 
 */
function initMap(i) {
    map.color = i.backgroundColor instanceof Array && i.backgroundColor.length > 3 ? "rgb(" +
        (240 + (i.backgroundColor[0] - 240) * i.backgroundColor[3]) + ", " +
        (240 + (i.backgroundColor[1] - 240) * i.backgroundColor[3]) + ", " +
        (240 + (i.backgroundColor[2] - 240) * i.backgroundColor[3]) + ")"
        : "rainbow";
    map.background = fromColArr(i.areaColor);
    map.areaSize = i.areaSize;
    map.obstacle = [];
    map.movingObstacle = [];
    map.circularObstacle = [];
    map.teleporter = [];
    map.lava = [];
    map.rotatingLava = [];
    map.movingLava = [];
    map.circularLava = [];
    map.ice = [];
    map.movingIce = [];
    map.circularIce = [];
    map.slime = [];
    map.movingSlime = [];
    map.circularSlime = [];
    map.button = [];
    map.switch = [];
    map.door = [];
    map.block0 = [];
    map.image0 = [];
    map.text = [];
    map.turret = [];
    map.reward = [];
    map.hatReward = [];
    map.box = [];
    map.gravityZone = [];
    map.block1 = [];
    map.image1 = [];
    for (let o of i.objects) {
        switch (o.type) {
            case "block":
                o.color = fromColArr(o.color.concat(o.opacity));
                if (o.layer) {
                    map.block1.push(o);
                } else {
                    map.block0.push(o);
                }
                break;
            case "obstacle":
            case "slime":
            case "ice":
            case "lava":
            case "box":
            case "turret":
            case "circularObstacle":
            case "circularLava":
            case "circularIce":
            case "circularSlime":
                map[o.type].push(o);
                break;
            case 1:
                map.movingLava.push(o);
                break;
            case 2:
                map.movingObstacle.push(o);
                break;
            case 3:
                map.movingIce.push(o);
                break;
            case 4:
                map.movingSlime.push(o);
                break;
            case "teleporter":
                o.dir = (o.dir ?? 0).toString();
                map.teleporter.push(o);
                break;
            case "gravityZone":
                o.dir = (o.dir ?? 4).toString();
                map.gravityZone.push(o);
                break;
            case "button":
                o.dir = (o.dir ?? 0).toString();
                o.points = [
                    [
                        o.pos.x + (o.dir === "0" ? o.size.x * 0.1 : 0),
                        o.pos.y + (o.dir === "3" ? o.size.y * 0.1 : 0)
                    ],
                    [
                        o.pos.x + (o.dir === "0" ? o.size.x * 0.9 : o.size.x),
                        o.pos.y + (o.dir === "1" ? o.size.y * 0.1 : 0)
                    ],
                    [
                        o.pos.x + (o.dir === "2" ? o.size.x * 0.9 : o.size.x),
                        o.pos.y + (o.dir === "1" ? o.size.y * 0.9 : o.size.y)
                    ],
                    [
                        o.pos.x + (o.dir === "2" ? o.size.x * 0.1 : 0),
                        o.pos.y + (o.dir === "3" ? o.size.y * 0.9 : o.size.y)
                    ]
                ];
                map.button.push(o);
                break;
            case "switch":
                o.dir = (o.dir ?? 0).toString();
                o.points = [
                    [
                        o.pos.x - (o.dir === "3" && !o.switch ? 2 : 0),
                        o.pos.y - (o.dir === "0" && o.switch ? 2 : 0)
                    ],
                    [
                        o.pos.x + (o.dir === "1" && o.switch ? 2 : 0) + o.size.x,
                        o.pos.y - (o.dir === "0" && !o.switch ? 2 : 0)
                    ],
                    [
                        o.pos.x + (o.dir === "1" && !o.switch ? 2 : 0) + o.size.x,
                        o.pos.y + (o.dir === "2" && o.switch ? 2 : 0) + o.size.y
                    ],
                    [
                        o.pos.x - (o.dir === "3" && o.switch ? 2 : 0),
                        o.pos.y + (o.dir === "2" && !o.switch ? 2 : 0) + o.size.y
                    ]
                ];
                map.switch.push(o);
                break;
            case 0:
                o.angle = o.angle * Math.PI / 180;
                map.rotatingLava.push(o);
                break;
            case "reward":
                o.image = renderSettings.textures.powers[o.reward] || renderSettings.textures.powers[11];
                map.reward.push(o);
                break;
            case "hatReward":
                o.image = (renderSettings.textures.hats[o.reward] || renderSettings.textures.hats.none).texture;
                map.hatReward.push(o);
                break;
            case "text":
                let split = o.text.split("|");
                if (split[0] === "SKAPCLIENT.IMAGE") {
                    if (split[1].startsWith("http")) break;
                    if (split[6] === "true" || split[6] === "1") {
                        map.image1.push({
                            image: loadImage(split[1]),
                            pos: {
                                x: isNaN(split[2]) ? 0 : parseInt(split[2]),
                                y: isNaN(split[3]) ? 0 : parseInt(split[3])
                            },
                            size: {
                                x: isNaN(split[4]) ? 0 : parseInt(split[4]),
                                y: isNaN(split[5]) ? 0 : parseInt(split[5])
                            },
                            layer: 1
                        });
                    } else {
                        map.image0.push({
                            image: loadImage(split[1]),
                            pos: {
                                x: isNaN(split[2]) ? 0 : parseInt(split[2]),
                                y: isNaN(split[3]) ? 0 : parseInt(split[3])
                            },
                            size: {
                                x: isNaN(split[4]) ? 0 : parseInt(split[4]),
                                y: isNaN(split[5]) ? 0 : parseInt(split[5])
                            },
                            layer: 0
                        });
                    }
                    if (split[7] === "true" || split[7] === "1") {
                        map.text.push(o);
                    }
                } else {
                    map.text.push(o);
                }
                break;
        }
    }
    for (let o of i.objects) {
        if (o.type === "door") {
            o.linkIdsOn = [];
            o.linkIdsOff = [];
            o.linksOn = [];
            o.linksOff = [];
            for (let l of o.linkIds) {
                l = parseInt(l, 10);
                if (l < 0) {
                    o.linkIdsOff.push(-l);
                } else {
                    o.linkIdsOn.push(l);
                }
            }
            for (let b of map.button) {
                if (o.linkIdsOn.includes(Math.floor(b.linkId))) {
                    o.linksOn.push(b);
                } else if (o.linkIdsOff.includes(Math.floor(b.linkId))) {
                    o.linksOff.push(b);
                }
            }
            for (let s of map.switch) {
                if (o.linkIdsOn.includes(Math.floor(s.linkId))) {
                    o.linksOn.push(s);
                } else if (o.linkIdsOff.includes(Math.floor(s.linkId))) {
                    o.linksOff.push(s);
                }
            }
            map.door.push(o);
        }
    }
    // Remove particles
    particles.dash = [];
    particles.shrink = [];
    particles.bomb = [];
    particles.explosion = [];
    particles.ghost = [];
    particles.refuel = [];
    particles.jetpack = [];
    particles.trail = [];
}
/**
 * 
 * @param {Object} msg 
 * @param {string} msg.s Author
 * @param {-2 | -1 | 0 | 1} msg.r Discord / Guest / User / Mod
 * @param {string} msg.m Message
 * @param {boolean} force Force message
 */
function message(msg, force = false) {
    if (msg.s === "[SKAP]" && !msg.r === -2 && hideSKAP) return;
    if (!force && blocked.includes(msg.s) && !devs.includes(msg.s)) {
        // message({
        //     s: msg.s,
        //     r: msg.r,
        //     m: "<i>[Blocked]</i>"
        // }, true);
        return;
    }
    // Chat bubbles
    if (!showChat && !blocked.includes(msg.s)) {
        chatMsgs[msg.s] = { m: checkProfanityString(msg.m), t: 300 };
    }
    if (msg && msg.m && msg.m.match(new RegExp("@" + user + "(\\s|$)", "g")) || (msg.m.match(/@devs(\s|$)/g) && devs.includes(user))) mention.play();
    let scroll = chat.lastElementChild ? chat.scrollTop + chat.clientHeight + 6 >= chat.scrollHeight : true;
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    let p = document.createElement("p");
    p.className = (msg.r === -2)
        ? "discordMsg"
        : msg.s === "[SKAP]" || msg.s === "[CLIENT]"
            ? "SYSMsg"
            : msg.s.startsWith("[/msg] ")
                ? "msgMsg"
                // : msg.s === "Sweaty" || msg.s === "XxSweatyxX"
                // ? "Sweatyfuckingbitchmsg"
                : ["guestMsg", "userMsg", "modMsg"][msg.r + 1];
    p.innerHTML = `<span class="
    ${msg.r === -2
            ? ""
            : devs.includes(msg.s)
                ? "devMsg"
                // : msg.s === "2121212121212"
                //     ? "msg2121"
                //     : ["wolfie", "wolfer", "wolfy"].includes(msg.s)
                //         ? "wolfiemsg"
                //         : ["OwO", "shrekismyson", "shrekismyson1", "shrekismyson2", "shrekismyson3", "shrekismyson4", "shrekismyson5", "shrexcellent", "shrekkamend", "shrektacular", "shrekingball", "shrekwashiss9z", "shrexpected", "shrexcited", "shrextreme", "shrekcepted", "fathershrek"].includes(msg.s)
                //             ? "shrekmsg"
                //             : msg.s === "HalOfManage"
                //                 ? "halmanageMsg"
                //                 : msg.s === "Whiz"
                //                     ? "whizMsg"
                //                     : msg.s === "Frog"
                //                         ? "frogMsg"
                //                         : msg.s === "Imaduck"
                //                             ? "imaduckMsg"
                //                             : msg.s === "drakerip"
                //                                 ? "drakeMsg"
                : msg.s === "Whiz"
                    ? "whizmsg"
                    : msg.s === "Wish"
                        ? "wishmsg"
                        : msg.s === "prooklturdle"
                            ? "modMsg"
                            : ""
        }">
        ${force
            ? msg.s
            : checkProfanityString(msg.s.safe())
        }:&nbsp;</span>
        ${force
            ? msg.m.replace(URLRegex, '<a href="$1" target="_blank">$1</a>').replace(EmailRegex, '<a href="mailto:$1" target="_blank">$1</a>')
            : checkProfanityString(msg.m.safe().replace(URLRegex, '<a href="$1" target="_blank">$1</a>').replace(EmailRegex, '<a href="mailto:$1" target="_blank">$1</a>'))
        }<span class="timestamp">${(function getTimestamp() {
            let now = new Date();
            function fillZeros(num) {
                return "0".repeat(2 - (num = String(num)).length) + num;
            }
            return now.getHours() + ":" + fillZeros(now.getMinutes());
        })()}</span>`;
    wrapper.appendChild(p);
    chat.appendChild(wrapper);
    if (scroll) p.scrollIntoView();

    return p;
}
/**
 * @param {string} str 
 */
function checkProfanityString(str) {
    for (let i of seriousProfanCheck) {
        str = str.replace(new RegExp(i, "gi"), "*".repeat(i.length));
    }
    if (censor === "heavy") {
        for (let i of profanCheck) {
            str = str.replace(new RegExp(i, "gi"), "*".repeat(i.length));
        }
    }
    return str;
}

/**
 * @param {string} msg 
 */
function sendMessage(msg) {
    msg = String(msg);
    // Test for n-words and stuff
    for (let i of seriousProfanCheck) {
        if (msg.toLowerCase().match(new RegExp("(^|\\s)" + i, "gi"))) {
            ban(`For attempting to say ${i[0] + "*".repeat(i.length - 1)} in chat`, 3600000);
        }
    }
    // emojis
    msg = Object.entries(emojiList).reduce((m, [i, { char, regex }]) => m.replace(regex, char), msg);
    // ping
    if (msg.toLowerCase() === "ping") {
        if (pingTime) {
            message({
                s: "[CLIENT]",
                r: 0,
                m: "Already pinged, please just wait."
            });
            return;
        } else {
            pingTime = Date.now();
        }
    }
    send({
        e: "message",
        message: msg
    });
}
function keys(key = 0, value = true) {
    send({
        e: "input",
        input: {
            keys: key,
            value: value ? true : false
        }
    });

    if (value) overlays[key]?.classList?.add("overlayactive");
    else overlays[key]?.classList?.remove("overlayactive");
}
function changePower(slot = 0, power = 0) {
    if (state.players[state.infos.id].states.includes("Died")) return;
    power = Number(power);
    if (!powers.has(power)) return;
    if (slot) {
        if (power == power0.value) {
            power0.value = power1.value;
            send({
                e: "powerChange",
                m: 0,
                i: Number(power0.value)
            });
            send({
                e: "power",
                slot: 0,
                power: Number(power0.value)
            }, clientWS);
        }
        power1.value = power;
    } else {
        if (power == power1.value) {
            power1.value = power0.value;
            send({
                e: "powerChange",
                m: 1,
                i: Number(power1.value)
            });
            send({
                e: "power",
                slot: 1,
                power: Number(power1.value)
            }, clientWS);
        }
        power0.value = power;
    }
    send({
        e: "powerChange",
        m: slot ? 1 : 0,
        i: Number(power)
    });
    send({
        e: "power",
        slot: slot ? 1 : 0,
        power: Number(power)
    }, clientWS);
}
function aim(x = 0, y = 0) {
    send({
        e: "aim",
        m: [
            x,
            y
        ]
    });
}
ws.addEventListener("close", () => {
    canSend = false;
    hide(gameDiv);
    document.title = "Disconnected";
    customAlert("The WebSocket closed for unknown reasons.<br>Please reload the client. If that doesn't work, try again later.<br>Skap may have been taken down for maintenance", Infinity);
});
document.addEventListener("keydown", e => {
    if (!e.repeat && e.key?.toLowerCase() === "p") {
        if (showChat) {
            showChat = false;
            customAlert("Chat in bubble mode");
            hide(chat);
        } else {
            showChat = true;
            customAlert("Chat in div mode");
            show(chat);
            chat.lastElementChild.scrollIntoView();
        }
    }
});
